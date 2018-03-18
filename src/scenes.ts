import * as enchant from 'node-enchantjs';
import core from './enchant/core';
import EnchantMap from './enchant/map';
import stages from './stages';
import { Character } from './character';
import {
	StartStopButton,
	StartContinueButton,
	StartInitButton,
} from './button';
import { SceneManager } from './scene-manager';

export type SceneKind =
	| 'Top'
	| 'StageSelecting'
	| 'Playing'
	| 'GameOver'
	| 'Result';

export class Scene extends enchant.Scene {
	private manager: SceneManager;
	public kind: SceneKind;

	public constructor(kind: SceneKind, manager: SceneManager) {
		super();
		this.kind = kind;
		this.manager = manager;
	}

	public moveNextScene(nextkind: SceneKind) {
		this.manager.changeScene(nextkind);
	}
}

export class TopScene extends Scene {
	public startInitButton: StartInitButton;
	public startContinueButton: StartContinueButton;

	public constructor(manager: SceneManager) {
		super('Top', manager);

		this.startInitButton = new StartInitButton(320, 140, this);
		this.startContinueButton = new StartContinueButton(320, 140, this);
		this.initScene();
		core.pause();
	}

	private initScene() {
		this.startInitButton.addEventListener('touchstart', () => {
			console.log('StageSelecting');
			this.moveNextScene('StageSelecting');
		});

		this.addChild(this.startInitButton);
		this.addChild(this.startContinueButton);
	}
}

export class PlayingScene extends Scene {
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

export type Scenes = {
	Top: Scene;
	StageSelecting: Scene;
	Playing: Scene;
	GameOver: Scene;
	Result: Scene;
};
