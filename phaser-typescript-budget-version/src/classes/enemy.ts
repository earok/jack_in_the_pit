import { Math, Scene } from 'phaser';

import { Actor } from './actor';
import { Player } from './player';

export class Enemy extends Actor {
  constructor(
    scene: Scene,
    x: number,
    y: number,
    texture: string,
    target: Player,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.getBody().setSize(16, 16);
    this.getBody().setOffset(0, 0);
  }

  update(): void {
    if (this.getBody().velocity.x === 0) {
      this.getBody().velocity.x = Phaser.Math.Between(-200, 200);
    }
  }

  public move(velocityX: number, velocityY: number) {
    this.getBody().setVelocityX(velocityX);
    this.getBody().setVelocityY(velocityY);
  }
}
