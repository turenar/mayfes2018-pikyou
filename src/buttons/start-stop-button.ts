import core from '../enchant/core';
import * as enchant from 'node-enchantjs';
import PlayingScene from '../scenes/playing-scene';
import Button from './button';
import { allBlocks } from '../blockly-main';
import stages from '../stages';
import { ScoreManager } from '../score-manager';
import { setTimeout } from 'timers';

export default class StartStopButton extends Button {
	private scene: PlayingScene;

	public constructor(scene: PlayingScene, x: number, y: number) {
		const width = 300;
		const height = 92;
		super(width, height, scene, 'img/start_button.png');
		this.x = x;
		this.y = y;
		this.scene = scene;

		this.initButton(scene);
	}

	public reloadButton(isRunning: boolean): boolean {
		if (isRunning) {
			console.log('stop game');
			this.image = core.assets['img/start_button.png'];
		} else {
			console.log('start game');
			this.image = core.assets['img/stop_button.png'];
		}
		this.updateWorkspace(isRunning);

		return !isRunning;
	}

	public reset() {
		console.log('stop game');
		this.image = core.assets['img/start_button.png'];
		this.updateWorkspace(true);
	}

	public onMouseEnter() {
		this.image = !this.scene.isRunning
			? core.assets['img/start_button_hover.png']
			: core.assets['img/stop_button_hover.png'];
	}

	public onMouseExit() {
		this.image = !this.scene.isRunning ? core.assets['img/start_button.png'] : core.assets['img/stop_button.png'];
	}

	private initButton(scene: PlayingScene) {
		this.addEventListener('touchend', () => {
			if (stages[scene.stageNum].clearPoint - ScoreManager.getBlockCostSum() >= 0) {
				this.scene.attentionLabel.opacity = 0;
				scene.isRunning = this.reloadButton(scene.isRunning);
				scene.resetWorld();
			} else {
				this.scene.attentionLabel.opacity = 100;
				setTimeout(() => {
					this.scene.attentionLabel.opacity = 0;
				}, 3000);
			}
		});

		this.addEventListener('enterframe', () => {
			const { x, y } = scene.manager.mouseController.getPoint();
			const isInside = x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height;
			if (!scene.isRunning) {
				if (isInside) {
					this.image = core.assets['img/start_button_hover.png'];
				} else {
					this.image = core.assets['img/start_button.png'];
				}
			} else {
				if (isInside) {
					this.image = core.assets['img/stop_button_hover.png'];
				} else {
					this.image = core.assets['img/stop_button.png'];
				}
			}
		});
	}

	private updateWorkspace(isRunning: boolean) {
		allBlocks.map(block => {
			block.setEditable(isRunning);
			block.setDeletable(isRunning);
			block.setMovable(isRunning);
		});
		(document.getElementsByClassName('blocklyFlyout')[0] as HTMLElement).style.display = isRunning ? '' : 'none';
		(document.getElementsByClassName(
			'blocklyScrollbarVertical blocklyFlyoutScrollbar'
		)[0] as HTMLElement).style.display = isRunning ? '' : 'none';
	}
}
