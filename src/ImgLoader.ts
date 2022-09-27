import imgBoard from './assets/sprites/board.png';
import imgBoardEdge from './assets/sprites/board_edge.png';

export class ImgLoader {
	boards: { [key: string]: string };
	constructor() {
		this.boards = {
			board: imgBoard,
			board_edge: imgBoardEdge,
		};
	}

	loadAll(scene: Phaser.Scene) {
		this.loadBoard(scene);
	}

	loadBoard(scene: Phaser.Scene) {
		Object.keys(this.boards).forEach((key) => {
			scene.load.spritesheet(key, this.boards[key], {
				frameWidth: 64,
				frameHeight: 64,
			});
		});
	}
}
