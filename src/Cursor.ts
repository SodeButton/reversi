export class Cursor extends Phaser.GameObjects.Image {
	constructor(scene: Phaser.Scene) {
		super(scene, -32, -32, 'cursor', 0);

		this.scene.add.existing(this);
		this.setDepth(1);
		this.setOrigin(0);
		this.setName('Cursor');

		scene.input.on('pointerover', (pointer: Phaser.Input.Pointer) => {
			this.followCursor(pointer)
		});

	}

	 private followCursor(pointer: Phaser.Input.Pointer) {
		this.x = Math.floor(pointer.x / 32) * 32;
		this.y = Math.floor(pointer.y / 32) * 32;
	}
}
