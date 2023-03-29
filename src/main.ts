import * as Phaser from 'phaser';
import { gameWidth, gameHeight } from './config';
import { Scenes } from './scenes';

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: gameWidth,
	height: gameHeight,
	parent: 'app',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
	},
	pixelArt: true,
	scene: Scenes,
};

class Game extends Phaser.Game {
	constructor(config: Phaser.Types.Core.GameConfig) {
		super(config);
	}
}

// new Phaser.Game(config);
new Game(config);
