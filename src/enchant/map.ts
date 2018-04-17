import core from './core';
import MapChip from './map-chip';
import mapChipDefinitions, { MapChipDefinitions } from './map-chip-definitions';

export type DrawingCoordinate = number;
export type MapPoint = number;

export const mapchipSize = 32;

export class Map {
	private rawMapData: MapChip[][];
	private readonly map: enchant.Map;

	public constructor(mapData: MapChip[][]) {
		const map = new enchant.Map(mapchipSize, mapchipSize);
		map.image = core.assets['img/mapchip.png'];

		this.map = map;
		this.reset(mapData);
	}

	public addInto(scene: enchant.Scene) {
		scene.addChild(this.map);
	}

	public reset(mapData: MapChip[][]) {
		// deep copy
		this.rawMapData = mapData.map(arr => arr.concat([]));

		this.map.loadData(this.rawMapData);
	}

	public setTile(x: number, y: number, tile: MapChip) {
		this.rawMapData[y][x] = tile;
		this.map.loadData(this.rawMapData);
	}

	public checkTile(x: MapPoint, y: MapPoint) {
		return this.rawMapData[y][x];
	}

	public canEnter(x: MapPoint, y: MapPoint): boolean {
		const tile = this.checkTile(x, y);
		const def = mapChipDefinitions[tile];
		if (def) {
			return def.obstacle;
		} else {
			return true;
		}
	}

	public getMapChipDef(x: MapPoint, y: MapPoint): MapChipDefinitions {
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
