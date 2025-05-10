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

//---------------events--------------------
//btnGame
const btnGame = document.getElementById("btnGame");
btnGame.addEventListener("gameover", kraj);
btnGame.addEventListener("levelUp", setupLevel2);


//gameover
const gamerOverEvent = new CustomEvent("gameover", {
  detail:{
    win: false
  }
});

const winGame = new CustomEvent("gameover", {
  detail:{
    win:true
  }
});

//event levelup
const levelUp = new Event("levelUp");

//event handler
function kraj(ev) {
  console.log(ev);
  btnStop_click();

  if (ev.detail.win) {
    alert("pobjeda");
  }
  else{
    alert("Gubitak!");
    setup();
  }
}

// što će se pokrenuti kad se klikne button Setup:
let btnSetupGame = document.getElementById("btnSetupGame");
btnSetupGame.addEventListener("click", setup);

function setup() {

  GAME.clearSprites();

  let odabrana = GAME.activeWorldMap.name;
  GameSettings.output(odabrana);

  switch (odabrana) {
    case "v10":
      setupVjezbe10();
      break;

    case "level1":
      setupLevel1();
      break;
    
    case "level2":
      setupLevel2();
      break;

    default:
      throw "Ne postoji setup za " + GAME.activeWorldMap.name;
      break;
  }

  render_main();
}

/* LEVELS */
function setupLevel1(){
  GAME.clearSprites();

  GAME.activeWorldMap.setCollisions("platforme");

  Postavke.kretanje = true;

  //glavna
  Postavke.youku = new Youku(0,0, GAME.getSpriteLayer("Youku"));
  GAME.addSprite(Postavke.youku);

  //zlocesti
  Postavke.brojZlocestih = 3;
  
  Postavke.zlocestaPcela1 = new Pcela(352,0, GAME.getSpriteLayer("pcele"));
  GAME.addSprite(Postavke.zlocestaPcela1);

  Postavke.osa = new Osa(544, 200, GAME.getSpriteLayer("osa"));
  GAME.addSprite(Postavke.osa);

  Postavke.vepar = new Vepar(0, 16*32, GAME.getSpriteLayer("vepar"));
  GAME.addSprite(Postavke.vepar);

  //Potion
  Postavke.potion = new Potion(GAME.getSpriteLayer("potion"));
  GAME.addSprite(Postavke.potion);

  Postavke.potion.pozicioniraj();

  //stit
  Postavke.stit = new Stit(GAME.getSpriteLayer("stit"));
  GAME.addSprite(Postavke.stit);

  //kraj levela
  Postavke.kraj = new Item(GAME.getSpriteLayer("kraj"));
  GAME.addSprite(Postavke.kraj);
  Postavke.kraj.visible = true;

}

function setupLevel2() {
  console.log("Level 2");
  btnStop_click();


  alert("Novi level");
  alert("Pobjedi sve demone za pobjedu");
  GAME.clearSprites();
  GAME.setActiveWorldMap("level2");

  GAME.activeWorldMap.setCollisions("platforme");

  Postavke.kretanje = true;
  
  //Youku
  Postavke.youku = new Youku(0,0, GAME.getSpriteLayer("Youku"));
  GAME.addSprite(Postavke.youku);


  //zlocesti
  Postavke.brojZlocestih = 4;

  Postavke.crveniDemon = new CrveniDemon(13*32,GAME.getSpriteLayer("crveniDemon"));
  GAME.addSprite(Postavke.crveniDemon);

  Postavke.zlocestaPcela1 = new Pcela(0,0, GAME.getSpriteLayer("pcele"));
  GAME.addSprite(Postavke.zlocestaPcela1);
  Postavke.zlocestaPcela1.postavi(17*32);

  Postavke.osa = new Osa(0, 0, GAME.getSpriteLayer("osa"));
  GAME.addSprite(Postavke.osa);
  Postavke.osa.postavi(17*32);

  Postavke.vepar = new Vepar(0, 0, GAME.getSpriteLayer("vepar"));
  GAME.addSprite(Postavke.vepar);
  Postavke.vepar.postavi(17*32);

  //stit
  Postavke.stit = new Stit(GAME.getSpriteLayer("stit"));
  GAME.addSprite(Postavke.stit);


  //potion
  Postavke.potion = new Potion(GAME.getSpriteLayer("potion"));
  GAME.addSprite(Postavke.potion);
  Postavke.potion.pozicioniraj(1,11);

  btnStart_click();

}