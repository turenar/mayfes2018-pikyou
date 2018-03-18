import TopScene from '../scenes/top-scene'
import core from '../enchant/core'

export default class StartContinueButton extends enchant.Sprite {
	public constructor(width: number, height: number, scene: TopScene) {
		super(width, height);
		this.x = 20;
		this.y = 320;
		this.image = core.assets['img/startcontinue.png'];
	}
}
