import imgBoard from './assets/sprites/board.png';
import imgBoardEdge from './assets/sprites/board_edge.png';
import imgStones from './assets/sprites/stones.png';
import imgCursor from './assets/sprites/curusor.png';

export class ImgLoader {
	boards: { [key: string]: string };
	constructor() {
		this.boards = {
			board: imgBoard,
			board_edge: imgBoardEdge,
			stones: imgStones,
			cursor: imgCursor,
		};
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
	}
}
