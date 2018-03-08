import MapChip from './mapchip';
import core from './core';

export default class Map {
	map: enchant.Map;

	constructor(mapData: MapChip[][]) {
		const map = new enchant.Map(32, 32);
		map.image = core.assets['img/mapchip.png'];
		map.loadData(mapData);

		this.map = map;
	}

	addInto(scene: enchant.Scene) {
		scene.addChild(this.map);
	}
}
