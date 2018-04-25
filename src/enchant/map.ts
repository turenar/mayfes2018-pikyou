import core from './core';
import MapChip from './mapchip';

export type DrawingCoordinate = number;
export type MapPoint = number;

export const mapchipSize = 32;

export class Map {
	private map: enchant.Map;
	private initialMapData: MapChip[][];
	private pos_x: MapPoint = 5;
	private pos_y: MapPoint = 8;

	public constructor(mapData: MapChip[][]) {
		const map = new enchant.Map(mapchipSize, mapchipSize);
		map.image = core.assets['img/mapchip.png'];
		map.loadData(mapData);
		this.initialMapData = mapData;
		this.map = map;
	}

	public addInto(scene: enchant.Scene) {
		scene.addChild(this.map);
	}

	public reset() {
		console.log(this.initialMapData, 'in reset');
		this.map.loadData(this.initialMapData);
	}

	public updateMap(x: MapPoint, y: MapPoint, mapchip: MapChip) {
		const newMapData = JSON.parse(JSON.stringify(this.initialMapData));
		newMapData[y - 1][x - 1] = mapchip;
		this.map.loadData(newMapData);
	}

	public checkTile(x: MapPoint, y: MapPoint) {
		return this.map.checkTile(Map.getCoordinateFromMapPoint(x), Map.getCoordinateFromMapPoint(y));
	}

	public canEnter(x: MapPoint, y: MapPoint): boolean {
		const tile = this.checkTile(x, y);
		if (tile === MapChip.Wall || (tile >= MapChip.WallMin && tile <= MapChip.WallMax)) {
			return false;
		} else {
			return true;
		}
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
