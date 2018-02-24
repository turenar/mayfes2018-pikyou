var core = new enchant.Core(320, 320);
core.preload('../node_modules/enchantjs/images/chara1.png');
core.onload = function() {
	var bear = new enchant.Sprite(32, 32);
	bear.image = core.assets['../node_modules/enchantjs/images/chara1.png'];
	bear.x = 0;
	bear.y = 0;
	core.rootScene.addChild(bear);
	console.log('hoge');
};
core.start();
