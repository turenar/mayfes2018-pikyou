import MapChip from './mapchip';
import core from './core';

export default class Map {
	private map: enchant.Map;

	public constructor(mapData: MapChip[][]) {
		const map = new enchant.Map(32, 32);
		map.image = core.assets['img/mapchip.png'];
		map.loadData(mapData);

		this.map = map;
	}

	public addInto(scene: enchant.Scene) {
		scene.addChild(this.map);
	}

	public canEnter(x: number, y: number) {
		if (this.map.checkTile(x, y) == MapChip.Wall) {
			return false;
		} else {
			return true;
		}
	}
}
