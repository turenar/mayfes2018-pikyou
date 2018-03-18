import core from '../enchant/core'
import TopScene from '../scenes/top-scene'

export default class StartInitButton extends enchant.Sprite {
	public constructor(width: number, height: number, scene: TopScene) {
		super(width, height);
		this.x = 20;
		this.y = 130;
		this.image = core.assets['img/startinit.png'];
	}
}
