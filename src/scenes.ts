import * as enchant from 'node-enchantjs';
import core from './enchant/core';
import EnchantMap from './enchant/map';
import stages from './stages';
import { Character } from './character';
import { StartStopButton } from './button';

export type SceneKind =
	| 'Top'
	| 'StageSelecting'
	| 'Playing'
	| 'GameOver'
	| 'Result';

export class Scene extends enchant.Scene {
	public kind: SceneKind;
	public isRunning: boolean;
	public character: Character;
	public button: StartStopButton;

	public constructor(
		kind: SceneKind,
		character?: Character,
		button?: StartStopButton
	) {
		super();
		this.kind = kind;
		this.isRunning = false;

		if (kind === 'Playing') {
			this.character = new Character(32, 32);
			this.button = new StartStopButton(320, 140, this);

			this.initPlayingScene();

			core.pause();
		}
	}

	public resetScene() {
		this.character.reset();
	}

	private initPlayingScene() {
		const map = new EnchantMap(stages[0].map);
		map.addInto(this);
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
