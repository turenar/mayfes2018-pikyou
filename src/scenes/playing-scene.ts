import core from '../enchant/core';
import EnchantMap from '../enchant/map';
import { Scene } from '../scenes';
import { SceneManager } from '../scene-manager';
import StartStopButton from '../buttons/start-stop-button';
import { Character } from '../character';
import stages from '../stages';

export default class PlayingScene extends Scene {
	public isRunning: boolean;
	public character: Character;
	public button: StartStopButton;
	public map: EnchantMap;

	public constructor(manager: SceneManager) {
		super('Playing', manager);
		this.isRunning = false;

		this.character = new Character(32, 32);
		this.button = new StartStopButton(320, 140, this);

		this.initScene();

		core.pause();
	}

	public resetScene() {
		this.character.reset();
	}

	private initScene() {
		this.map = new EnchantMap(stages[0].map);
		this.map.addInto(this);
		this.addChild(this.character);
		this.addChild(this.button);
	}
}