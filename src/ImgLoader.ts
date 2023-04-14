import imgBoard from './assets/sprites/board.png';
import imgBoardEdge from './assets/sprites/board_edge.png';
import imgStones from './assets/sprites/stones.png';
import imgCursor from './assets/sprites/curusor.png';

import seClick from "./assets/sounds/click.wav";

export class ImgLoader {
	boards: { [key: string]: string };
	sounds: { [key: string]: string };
	constructor() {
		this.boards = {
			board: imgBoard,
			board_edge: imgBoardEdge,
			stones: imgStones,
			cursor: imgCursor,
		};
		this.sounds = {
			click_se: seClick,
		}
	}

	loadAll(scene: Phaser.Scene) {
		this.loadBoard(scene);
	}

	loadBoard(scene: Phaser.Scene) {
		Object.keys(this.boards).forEach((key) => {
			scene.load.spritesheet(key, this.boards[key], {
				frameWidth: 32,
				frameHeight: 32,
			});
		});

		Object.keys(this.sounds).forEach((key) => {
			scene.load.audio(key, this.sounds[key]);
		});

	}
}
