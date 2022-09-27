import * as Phaser from 'phaser';
import { gameWidth, gameHeight } from '../config';
import { ImgLoader } from '../ImgLoader';

export class DownloadScene extends Phaser.Scene {
	imgs: ImgLoader = new ImgLoader();
	constructor() {
		super('downloadScene');
	}

	preload() {
		const progressBar = this.add.graphics();
		const progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(gameWidth / 2 - 250, gameHeight / 2 - 30, 500, 60);

		let text = this.add.text(gameWidth / 2, (gameHeight / 5) * 3, 'load', {
			fontSize: '40px',
		});
		text.setOrigin(0.5, 0.5);

		//ロードが進行したときの処理
		this.load.on('progress', function (value: any) {
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(gameWidth / 2 - 250, gameHeight / 2 - 30, 500 * value, 60);
		});

		//ファイルのロードに入ったときの処理
		this.load.on('fileprogress', function (file: any) {
			text.text = file.key;
		});

		//すべてのロードが完了したときの処理
		this.load.on('complete', function () {
			text.text = 'complete';
		});

		this.imgs.loadAll(this);
	}

	create() {
		this.scene.start('gameScene');
	}
}
