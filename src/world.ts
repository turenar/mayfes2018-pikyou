import core from './enchant/core';
import { Scenes, Scene, SceneKind } from './scenes';
import TopScene from './scenes/top-scene';
import PlayingScene from './scenes/playing-scene';
import { code } from './blockly-main';
import { Character } from './character';
import Map, { getCoordinateFromPoint } from './enchant/map';
import stages from './stages';

export class World {
    public scene: PlayingScene;
    public character: Character;
    public map: Map;

    public constructor(scene: PlayingScene, stageNumber: number) {
        this.scene = scene;
        this.character = new Character();
        this.map = new Map(stages[stageNumber].map);

        this.scene.addChild(this.character);
        this.map.addInto(this.scene);
    }

    public reset() {
        this.character.reset();
        this.map.reset();
    }

    public canMoveCharacterNext() {
        const pad = this.character.getPointAndDirection();
        let next_x;
        let next_y;

		if (pad.direction === 'north') next_y = getCoordinateFromPoint(pad.point_y - 1);
		if (pad.direction === 'east') next_x = getCoordinateFromPoint(pad.point_x + 1);
		if (pad.direction === 'south') next_y = getCoordinateFromPoint(pad.point_y + 1);
		if (pad.direction === 'west') next_x = getCoordinateFromPoint(pad.point_x - 1);

		return this.map.canEnter(next_x, next_y);
	}
}