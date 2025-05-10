//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion

// ovdje pišete svoje klase

class Youku extends Sprite{
  #health;
  constructor(x,y, layer){
    super(x,y, 60, 60);
    this.frame_sets = {
      "up": [1],
      "walk-up": [1],
      "right": [1],
      "walk-right": [1, 2, 3, 4, 5, 6, 7, 8, 9],
      "down": [9],
      "walk-down": [13],
      "left": [12],
      "walk-left": [13, 14, 15, 16, 17, 18,19,20,21]
    };

    this.layer = layer;
    this.visible = true; //tek kad se postavi layer

    this.#health = 5;
    this.attack = false;
    this.isInvulnerable = false;
    this.lastHitTime = 0;
    this.puca = false;
  }

  get health(){
    return this.#health;
  }

  set health(value){
    if(!this.isInvulnerable){
      if (this.#health <= 0) {
        btnGame.dispatchEvent(gamerOverEvent);
      }
      this.#health = value;
    }
  }

  jump(){
    super.jump(40);
    if (SENSING.right.active){
      this.x += 10;
    }

    else if (SENSING.left.active) {
      this.x -= 10;
    }
  }

  diraDno(){
    this.health -= 1;
    this.start();
    GameSettings.output("Izgubljen zivot: " + this.health);
  }

  start(){
    this.x = 0;
    this.y = 0;
  }

  napad(sprite){
    if (sprite instanceof Zlocesti) {
      if (this.attack) {
        sprite.visible = false;
        Postavke.brojZlocestih -= 1;
        console.log("Dira i napada")
      }
      else{
        this.health -= 1;
        console.log("Izgubljen zivot");
      }
    }
  }

  collectPotion(potion){
    this.health += potion.value;
    potion.visible = false;
    console.log("Health: " + this.health);
  }
}

//klasa od koje cu nasljedivat za zloceste likove
//apstraktna klasa
class Zlocesti extends Sprite{
  constructor(x,y,layer){
    super(x,y,60,60);
    if (this.constructor == Zlocesti) {
      throw new Error("Nemoj instancirati ovu klasu");
    }
    
    this.frame_sets = {
      "up": [26]
    };

    this.layer = layer;
    this.visible = true;
    this.smjer = true;
  }

  getType(){
    throw new Error("Implementiraj");
  }

  postavi(x,y){
    let arg = arguments.length;
    switch (arg) {
      case 0:
        this.x = 0;
        this.y = 0;
        break;

      case 1:
        this.x = Postavke.random(0,24)*32;
        this.y = x;
        break;

      case 2:
        this.x = x*32;
        this.y = y*32;
    
      default:
        break;
    }
  }

  kretanje(lg, dg){ //lijeva i desna granica
    if (this.smjer) {
      this.moveLeft();
      if (this.x <= lg) {
        this.smjer = false;
      }
    }

    if (!this.smjer) {
      this.moveRight();
      if (this.x >= dg) {
        this.smjer = true;
      }
    }
  }
}

class Pcela extends Zlocesti{
  constructor(x,y, layer){
    super(x,y,layer);
    this.frame_sets={
      "up": [26],
      "walk-up": [26],
      "right": [26],
      "walk-right": [30, 31, 32],
      "down": [26],
      "walk-down": [26],
      "left": [26],
      "walk-left": [26, 27, 28]
    };
  }

  getType(){
    return "pcela";
  }
}

class Osa extends Zlocesti{
  constructor(x,y, layer){
    super(x,y,layer);
    this.frame_sets={
      "up": [1],
      "walk-up": [1],
      "right": [1],
      "walk-right": [1, 2, 3, 4],
      "down": [26],
      "walk-down": [26],
      "left": [26],
      "walk-left": [26, 27, 28, 29]
    };
  }

  getType(){
    return "osa";
  }
}

class Vepar extends Zlocesti {
  constructor(x, y, layer) {
    super(x,y,layer);
    this.frame_sets = {
        "up": [1],
        "walk-up": [1],
        "right": [26],
        "walk-right": [26, 27, 28, 29, 30, 31],
        "down": [1],
        "walk-down": [1],
        "left": [1],
        "walk-left": [1, 2, 3, 4, 5, 6]
    };
  }

  getType(){
    return "vepar";
  }
}

class CrveniDemon extends Zlocesti{
  constructor(x,layer){
    super(x,0,layer);
    this.frame_sets = {
        "up": [1],
        "walk-up": [1],
        "right": [1],
        "walk-right": [1, 2, 3, 4, 5, 6],
        "down": [1],
        "walk-down": [1],
        "left": [1],
        "walk-left": [1, 2, 3, 4, 5, 6]
    };
  }

  getType(){
    return "CrveniDemon";
  }

  start(){
    this.y = 0;
    this.x = 13*32;
  }

  kretanje(dg){ //donja granica
    if (this.y > dg) {
      this.start();
    }
  }
}


class Stit extends Item{
  constructor(layer){
    super(layer);
    this.visible = false;
  }

  aktiviraj(){
    this.visible = true;
    this.x = Postavke.youku.x;
    this.y = Postavke.youku.y - 25;
    Postavke.youku.isInvulnerable = true;
  }
  deaktiviraj(){
    this.visible = false;
    Postavke.youku.isInvulnerable = false;
  }
}

class Collectable extends Item {

  constructor(layer) {
    super(layer);

    if (this.constructor == Collectable) {
      throw new Error("Collectable se ne može instancirati");
    }
  }

  getType() {
    return this.constructor.name;
  }

}

class Potion extends Collectable {

  constructor(layer) {
    super(layer);
    this.visible = true;
    this.value = 10;
  }

  pozicioniraj(x,y) {
    if (arguments.length == 0) {
      this.x = Postavke.random(17, 24)*32;
      this.y = 9*32;
    }
    else if (arguments.length == 2) {
      this.x = x*32;
      this.y = y*32;
    }

  }

}