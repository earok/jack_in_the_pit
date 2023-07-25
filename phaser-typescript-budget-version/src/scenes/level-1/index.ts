import { GameObjects, Scene, Tilemaps } from "phaser";

import { Player } from "../../classes/player";
import { Enemy } from "../../classes/enemy";

export class Level1 extends Scene {
  private player!: Player;
  private map!: Tilemaps.Tilemap;
  private tileset!: Tilemaps.Tileset | null;
  private wallsLayer!: Tilemaps.TilemapLayer | null;
  private groundLayer!: Tilemaps.TilemapLayer | null;
  private enemies!: Enemy[];

  constructor() {
    super("level-1-scene");
  }

  create(): void {
    this.initMap();
    const initX = Math.random() * 528 + 176;
    const initY = 1520;
    this.player = new Player(this, initX, initY);

    this.initBatEnemies();
    this.initCamera();

    if (this.wallsLayer) {
      this.physics.add.collider(this.player, this.wallsLayer);
    }
  }

  update(): void {
    this.player.update();
    this.enemies.forEach((enemy) => enemy.update());
  }

  private initMap(): void {
    this.map = this.make.tilemap({
      key: "dungeon",
      tileWidth: 16,
      tileHeight: 16,
    });
    this.tileset = this.map.addTilesetImage("dungeon", "tiles");
    if (!this.tileset) {
      return;
    }
    this.groundLayer = this.map.createLayer("Ground", this.tileset, 0, 0);

    this.wallsLayer = this.map.createLayer("Walls", this.tileset, 0, 0);
    if (this.wallsLayer) {
      this.wallsLayer.setCollisionByProperty({ collides: true });

      this.physics.world.setBounds(
        0,
        0,
        this.wallsLayer.width,
        this.wallsLayer.height
      );
    }
  }

  private initBatEnemies(): void {
    this.enemies = [];

    for (let i = 0; i < 100; i++) {
      const enemy = new Enemy(
        this,
        Phaser.Math.Between(176, 528),
        20,
        "bat",
        this.player
      )
        .setName(i.toString())
        .setScale(2.5);

      this.enemies.push(enemy);
    }

    this.enemies.forEach((enemy) => {
      enemy.move(
        Phaser.Math.Between(-200, 200),
        Phaser.Math.Between(-200, 200)
      );
    });

    if (!this.wallsLayer) {
      return;
    }

    this.physics.add.collider(
      this.player,
      this.enemies,
      (obj1, obj2) => {
        (obj1 as Player).getDamage(1);
      },
      undefined,
      this
    );
  }

  private initCamera(): void {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(2);
  }
}
