import { Scene } from '../scenes/scenes';
import Button from './button';
import Hint from '../hint';

const imageDefaultPath = 'img/hint.png';
const imageHoverPath = 'img/hint_hover.png';
const imageOnPath = 'img/hint_on.png';

export default class HintButton extends Button {
	private showing: boolean;
	private hint: Hint;

	public constructor(x: number, y: number, scene: Scene, hint: Hint) {
		super(51, 64, scene, imageDefaultPath, imageHoverPath);
		this.x = x;
		this.y = y;
		this.hint = hint;
		this.showing = false;
	}

	public onClick() {
		this.showing = !this.showing;
		if (this.showing) {
			this.imagePath = imageOnPath;
			this.hint.show();
		} else {
			this.imagePath = imageDefaultPath;
			this.hint.hide();
		}
	}
}
