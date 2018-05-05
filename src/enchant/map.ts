import core from './core';
import MapChip from './map-chip';
import mapChipDefinitions, { MapChipDefinition } from './map-chip-definitions';
import { ActionParams, AnimationQueue, AnimationTarget } from '../animation-queue';

export type DrawingCoordinate = number;
export type MapPoint = number;

export const mapchipSize = 32;

/**
 * deep copy
 *
 * @param {Array<Array<MapChip>>} source clone source
 * @return {Array<Array<MapChip>>} cloned
 */
function cloneMapData(source: MapChip[][]) {
	return source.map(a => a.slice());
}

class MapActionConsumer implements AnimationTarget {
	private map: Map;

	public constructor(map: Map) {
		this.map = map;
	}

	public action(params: ActionParams) {
		params.onactionend();
	}

	public then(callback: () => void) {
		callback();
	}
}

export class Map {
	private readonly map: enchant.Map;
	private readonly tl: MapActionConsumer;
	private readonly queue: AnimationQueue;
	private rawMapData: MapChip[][];

	public constructor(queue: AnimationQueue, mapData: MapChip[][]) {
		const map = new enchant.Map(mapchipSize, mapchipSize);
		map.image = core.assets['img/mapchip.png'];

		this.map = map;
		this.tl = new MapActionConsumer(this);
		this.queue = queue;

		this.reset(mapData);
	}

	public addInto(scene: enchant.Scene) {
		scene.addChild(this.map);
	}

	public reset(mapData: MapChip[][]) {
		this.rawMapData = cloneMapData(mapData);

		this.map.loadData(this.rawMapData);
	}

	public setTile(x: number, y: number, tile: MapChip) {
		const newMapData = cloneMapData(this.rawMapData);
		newMapData[y - 1][x - 1] = tile;
		this.rawMapData = newMapData;
		this.queue.push({
			target: this.tl,
			time: 0,
			onactionend: () => {
				this.map.loadData(newMapData);
			},
		});
	}

	public checkTile(x: MapPoint, y: MapPoint) {
		// MapPoint: 1,2,3,...
		if (x < 1 || x > 12 || y < 1 || y > 12) {
			return MapChip.Wall;
		}
		return this.rawMapData[y - 1][x - 1];
	}

	public canEnter(x: MapPoint, y: MapPoint): boolean {
		const tile = this.checkTile(x, y);
		const def = mapChipDefinitions[tile];
		if (def) {
			return !def.obstacle;
		} else {
			console.warn({ warning: 'missing mapchip definition', tile });
			return false;
		}
	}

	public getMapChipDef(x: MapPoint, y: MapPoint): MapChipDefinition {
		const tile = this.checkTile(x, y);
		return mapChipDefinitions[tile];
	}

	/**
	 * マップ座標からピクセル座標を得る。
	 * @param {number} point - マップ座標(1~10)
	 * @returns {number} - ピクセル座標
	 */
	public static getCoordinateFromMapPoint(point: MapPoint): DrawingCoordinate {
		return (point - 1) * mapchipSize;
	}

	/**
	 * ピクセル座標からマップ座標を得る。
	 * @param {number} coordinate - ピクセル座標
	 * @returns {number} - マップ座標
	 */
	public static getMapPointFromCoordinate(coordinate: DrawingCoordinate): MapPoint {
		return Math.floor(coordinate / mapchipSize);
	}
}
