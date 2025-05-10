class Postavke {

  constructor() {
    if (this instanceof Postavke) {
      throw new Error("Statička klasa nema instance!");
    }
  }

  /** @type {Racoon} */
  static racoon = null;

  static random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /** @type {Youku} */
  static youku = null;

  /** @type {Pcela} */
  static zlocestaPcela1 = null;

  static vepar = null;
  static osa = null;
  static vepar = null;
  static crveniDemon = null;
  static potion = null;
  static stit = null;
  static kraj = null;

  static brojZlocestih = 0;
  static kretanje = false;

  static dno = 580;
}