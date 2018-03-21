import MapChip from './mapchip';
import core from './core';

export const mapchipSize = 32;

export default class Map {
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

	public reset() {
		
	}

	public canEnter(x: number, y: number) {
		if (this.map.checkTile(x, y) == MapChip.Wall) {
			return false;
		} else {
			return true;
		}
	}
}

export function getCoordinateFromPoint(point: number): number {
	return (point - 1) * mapchipSize;
}

export function getPointFromCoordinate(coordinate: number): number {
	return Math.floor(coordinate / mapchipSize);
}