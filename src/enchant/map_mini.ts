import MapChip from './mapchip';
import core from './core';

export const mapchipSize = 32;

export default class MapMini {
	private map: enchant.Map;
	private mapData: MapChip[][];
	private map_scene: enchant.Scene;

	public constructor(mapData: MapChip[][], scale: number = 1.0) {
		this.map = new enchant.Map(mapchipSize, mapchipSize);
		this.map.image = core.assets['img/mapchip.png'];
		this.mapData = mapData;
		this.map.loadData(this.mapData);
		// this.map.offsetY = 0;

		this.map_scene = new enchant.Scene();
		this.map_scene.addChild(this.map);
		// 手動で頑張って微調整する
		// this.map_scene.originX = 0;
		this.map_scene.originY = 350;
		this.map_scene.x = 0;
		this.map_scene.y = -80;
		// this.map_scene.offsetX = 0;
		// this.map_scene.offsetY = 0;
		this.map_scene.scaleX = scale;
		this.map_scene.scaleY = scale;
	}

	public addInto(scene: enchant.Scene) {
		scene.addChild(this.map_scene);
	}

	public canEnter(x: number, y: number) {
		if (this.map.checkTile(x, y) == MapChip.Wall) {
			return false;
		} else {
			return true;
		}
	}
}
