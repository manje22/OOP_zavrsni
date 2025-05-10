//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion

/// <reference path="kod_01-likovi.js"/>
/// <reference path="kod_02-postavke.js"/>

/**
 * Promjena stanja likova - interakcije
 */
function update_main() {

  if (GAME.activeWorldMap.name == "v10")
    vjezbe10();

  GAME.update();

  if (GAME.activeWorldMap.name == "level1") {
    level1();
  }
  GAME.update();

  if (GAME.activeWorldMap.name == "level2") {
    level2();
  }
  GAME.update();

};


function level1(){
  //!kontrole
  if(SENSING.right.active){
    Postavke.youku.moveRight();
  }

  if(SENSING.left.active){
    Postavke.youku.moveLeft();
  }

  if(SENSING.up.active){
    Postavke.youku.jump();
  }

  if(SENSING.keyA.down){ //napad
    Postavke.youku.attack = true;
    //console.log("napad");
  }
  if (!SENSING.keyA.down) {
    Postavke.youku.attack = false;
  }

  //aktivacija stita
  if(SENSING.keyS.active){
    Postavke.stit.aktiviraj();
  }
  if (!SENSING.keyS.active) {
    Postavke.stit.deaktiviraj();
  }

  //!kretanje zlocestih
  if (Postavke.kretanje) {
    Postavke.zlocestaPcela1.kretanje(0, 352);
    Postavke.osa.kretanje(17*32, 23*32);
    Postavke.vepar.kretanje(0, 200);
  }

  //interakcije likova
  if(Postavke.youku.touching(Postavke.zlocestaPcela1)){
    Postavke.youku.napad(Postavke.zlocestaPcela1);
  }

  if(Postavke.youku.touching(Postavke.osa)){
    Postavke.youku.napad(Postavke.osa);
  }

  if(Postavke.youku.touching(Postavke.vepar)){
    Postavke.youku.napad(Postavke.vepar);
  }

  if (Postavke.youku.touching(Postavke.potion)) {
    Postavke.youku.collectPotion(Postavke.potion);
  }


  if(Postavke.youku.y == Postavke.dno) {
    Postavke.youku.diraDno();
  }

  //! kraj levela
  if (Postavke.brojZlocestih == 0 && Postavke.youku.touching(Postavke.kraj)) {
    btnGame.dispatchEvent(levelUp);
  }
}
//granica level1

//pocinje drugi level
function level2(){

  //kontrole
  if(SENSING.right.active){
    Postavke.youku.moveRight();
  }

  if(SENSING.left.active){
    Postavke.youku.moveLeft();
  }

  if(SENSING.up.active){
    Postavke.youku.jump();
  }

  //napad
  if(SENSING.keyA.down){ 
    Postavke.youku.attack = true;
    console.log("napad");
  }
  if (!SENSING.keyA.down) {
    Postavke.youku.attack = false;
  }

  //aktivacija stita
  if(SENSING.keyS.active){
    Postavke.stit.aktiviraj();
  }
  if (!SENSING.keyS.active) {
    Postavke.stit.deaktiviraj();
  }

  //! kretanje likova
  if (Postavke.kretanje) {
    Postavke.zlocestaPcela1.kretanje(0, 352);
    Postavke.osa.kretanje(17*32, 23*32);
    Postavke.vepar.kretanje(0, 200);
    Postavke.crveniDemon.kretanje(10*32);
  }

  //! interakcije likova
  if (Postavke.youku.touching(Postavke.crveniDemon)) {
    Postavke.youku.napad(Postavke.crveniDemon);
  }

  if(Postavke.youku.touching(Postavke.zlocestaPcela1)){
    Postavke.youku.napad(Postavke.zlocestaPcela1);
  }

  if(Postavke.youku.touching(Postavke.osa)){
    Postavke.youku.napad(Postavke.osa);
  }

  if(Postavke.youku.touching(Postavke.vepar)){
    Postavke.youku.napad(Postavke.vepar);
  }

  if (Postavke.youku.touching(Postavke.potion)) {
    Postavke.youku.collectPotion(Postavke.potion);
  }


  //! kraj levela
  if (Postavke.brojZlocestih == 0) {
    GAME.clearSprites();
    btnGame.dispatchEvent(winGame);
  }
}
