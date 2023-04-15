export class TextParticle extends Phaser.GameObjects.Text {
    constructor(scene: Phaser.Scene, x: number, y: number, text: string, style: {} = {}) {
        super(scene, x, y, text, style);

        this.scene.add.existing(this);
        this.setDepth(10);
        this.setName('TextParticle');
    }

    floatAnimation(dy: number) {
        let timer = 0;
        let animation = setInterval(() => {
            this.y += dy;
            timer ++;
            if (timer > 80) {
                clearInterval(animation);
                this.destroy();
            }
        }, 10);
    }

    deleteParticle(ms: number) {
        setTimeout(() => {
            this.destroy();
        }, ms);
    }

    update(...args: any) {
        super.update(...args);
    }


}