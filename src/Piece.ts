import * as Phaser from 'phaser';

export class Piece extends Phaser.GameObjects.Container {
	main: Phaser.GameObjects.Image;
	shadow: Phaser.GameObjects.Image;
	indexX: number;
	indexY: number;

	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x * 32 + 48, y * 32 + 48);

		this.indexX = x;
		this.indexY = y;
		let texture = 'stones';

		this.scene.add.existing(this);
		this.setDepth(4);
		this.setName(texture);
		this.setState(-1);

		this.main = this.scene.add.image(0, 0, texture, 2);
		this.shadow = this.scene.add.image(4, 4, texture, 2);
		this.shadow.tint = 0x000000;
		this.shadow.setAlpha(0.6);

		this.add([this.shadow, this.main]);
	}

	changePiece(frame: number) {
		this.setState(frame);
		this.main.setFrame(frame);
		this.shadow.setFrame(frame);
	}

	public flipPiece() {
		if (this.state == 0) {
			this.changePiece(1);
		} else if (this.state == 1) {
			this.changePiece(0);
		}
	}

	async flipAnimation() {
		let animTime = 0;
		let timer = setInterval(() => {
			if (animTime < 10)
				this.setScale(1, 1 - animTime / 10);

			if (animTime == 10) this.flipPiece();

			if (animTime > 10 && animTime < 20) {
				this.setScale(1, animTime / 10 - 1);
			}

			if (animTime >= 20) {
				this.setScale(1, 1);
				clearInterval(timer);
			}

			animTime ++;
		}, 20);
		await this.delay(500);
	}

	delay(ms: number) {
		return new Promise(resolve => {
			this.scene.time.delayedCall(ms, resolve, [], this);
		});
	}

	getPiece() {
		return this;
	}
}
