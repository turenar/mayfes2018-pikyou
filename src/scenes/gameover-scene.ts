import core from '../enchant/core';
import { Scene } from './scenes';
import { SceneManager } from '../scene-manager';
import RetryButton from '../buttons/retry-button';
import BackToStageSelectingButton from '../buttons/back-to-stageselecting-button';

type Score = {
    blockNumber: number,
    gotJwellBox: boolean,
};

export default class GameOverScene extends Scene {
    private retryButton: RetryButton;
    private backToStageSelectingButton: BackToStageSelectingButton;
    private score: Score;

    public constructor(manager: SceneManager) {
        super('GameOver', manager);

        const offset_x = 40;
        const offset_y = 20;

        const background = new enchant.Sprite(240, 360);
        background.backgroundColor = 'red';
        background.x = offset_x;
        background.y = offset_y;

        this.retryButton = new RetryButton(offset_x, offset_y, this);

        this.backToStageSelectingButton = new BackToStageSelectingButton(offset_x, offset_y, this);

        const score = {blockNumber: 10, gotJwellBox: true};


        this.addChild(background);
        this.addChild(this.retryButton);
        this.addChild(this.backToStageSelectingButton);
    }
}