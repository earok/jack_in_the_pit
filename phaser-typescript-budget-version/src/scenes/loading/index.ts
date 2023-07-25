import { Scene } from 'phaser';

export class LoadingScene extends Scene {
  constructor() {
    super('loading-scene');
  }

  preload(): void {
    this.load.baseURL = 'assets/';

    this.load.image('char', 'sprites/char.png');
    this.load.image('bat', 'sprites/bat.png');
   
    this.load.image({
      key: 'tiles',
      url: 'tilemaps/tiles/tiles.png',
    });
    this.load.tilemapTiledJSON('dungeon', 'tilemaps/json/dungeon.json');
  }

  create(): void {
    this.scene.start('level-1-scene');
    this.scene.start('ui-scene');
  }
}
