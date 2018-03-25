import * as enchant from 'node-enchantjs';

enchant();
const core = new enchant.Core(320, 480);
core.scale = 1;
core.fps = 15;

export default core;
