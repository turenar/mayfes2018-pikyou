import core from './core';
import MapChip from './mapchip';

export const mapchipSize = 32;

export class Map {
	private map: enchant.Map;

	public constructor(mapData: MapChip[][]) {
		const map = new enchant.Map(mapchipSize, mapchipSize);
		map.image = core.assets['img/mapchip.png'];
		map.loadData(mapData);

		this.map = map;
	}

	public addInto(scene: enchant.Scene) {
		scene.addChild(this.map);
	}

	public reset() {}

	public canEnter(x: number, y: number) {
		if (this.map.checkTile(x, y) == MapChip.Wall) {
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
	public static getCoordinateFromMapPoint(point: number): number {
		return (point - 1) * mapchipSize;
	}

	/**
	 * ピクセル座標からマップ座標を得る。
	 * @param {number} coordinate - ピクセル座標
	 * @returns {number} - マップ座標
	 */
	public static getMapPointFromCoordinate(coordinate: number): number {
		return Math.floor(coordinate / mapchipSize);
	}
}
