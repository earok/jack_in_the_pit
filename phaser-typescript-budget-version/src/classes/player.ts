import { Input, Scene } from 'phaser';

import { EVENTS_NAME, GameStatus } from '../consts';
import { Actor } from './actor';
import { Text } from './text';

export class Player extends Actor {
  private keyW: any; // Input.Keyboard.Key
  private keyA: any;
  private keyS: any;
  private keyD: any;

  private hpValue: any; // Text;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, 'char');

    if (!this.scene.input.keyboard) { return; }

    this.keyW = this.scene.input.keyboard.addKey('W');
    this.keyA = this.scene.input.keyboard.addKey('A');
    this.keyS = this.scene.input.keyboard.addKey('S');
    this.keyD = this.scene.input.keyboard.addKey('D');

    this.hpValue = new Text(this.scene, this.x, this.y - this.height, this.hp.toString())
      .setFontSize(12)
      .setOrigin(0.0, 0.0);

    this.getBody().setSize(16, 16);
    this.getBody().setOffset(0, 0);
  }

  update(): void {
    this.getBody().setVelocity(0);

    if (this.keyW?.isDown) {
      this.getBody().velocity.y = -110;
    }

    if (this.keyA?.isDown) {
      this.getBody().velocity.x = -110;
      this.checkFlip();
    }

    if (this.keyS?.isDown) {
      this.getBody().velocity.y = 110;
    }

    if (this.keyD?.isDown) {
      this.getBody().velocity.x = 110;
      this.checkFlip();
    }

    this.hpValue.setPosition(this.x, this.y - this.height);
    this.hpValue.setOrigin(0.8, 0.5);

    if (this.getBody().y === 0) {
      this.scene.game.events.emit(EVENTS_NAME.gameEnd, GameStatus.WIN);
    }
  }

  public getDamage(value?: number): void {
    super.getDamage(value);
    this.hpValue.setText(this.hp.toString());

    if (this.hp <= 0) {
      this.scene.game.events.emit(EVENTS_NAME.gameEnd, GameStatus.LOSE);
    }
  }
}
