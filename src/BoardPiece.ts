import * as Phaser from 'phaser';

export class BoardPiece extends Phaser.GameObjects.Image {
	canMovePoint: boolean;
	indexX: number;
	indexY: number;
	constructor(scene: Phaser.Scene, x: number, y: number) {
		super(scene, x * 64 + 96, y * 64 + 256, 'board', 0);

		this.indexX = x;
		this.indexY = y;

		this.scene.add.existing(this);
		this.setDepth(1);
		this.setName('BoardPiece');
		this.canMovePoint = false;

		this.on('pointerdown', () => {
			if (this.canMovePoint) {
				console.log('clicked!');
			}
		});
	}

	public changeMovePoint(flag: boolean) {
		this.canMovePoint = flag;
		if (flag) {
			this.setFrame(1);
			this.setInteractive();
		} else {
			this.setFrame(0);
			this.removeInteractive();
		}
	}

	public getPoint() {
		return this.canMovePoint;
	}
}
