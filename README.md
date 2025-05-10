# OOP_zavrsni
Platformer game made with tiled and javascript, written following OOP paradigm.


# Izmjene u okviru

## lib-05-game_v2.js

Dodano polje collidedPlatform
* informacija o tome s koje strane dira platformu
* "top", "left", "right", "bottom" ili prazno ako ne dira platformu

/** @type {Boolean} koristi se za zaustavljanje gravitacije kad dotakne platformu tipa Box */
    this.stopFall = false;

Dodana nova klasa Box koja nasljeđuje od Item. 
* Radi se o platormi koja je običan Item samo se ne može kretati jer je updatePosition prazna.

U Sprite dodana metoda collideBox()
* provjerava dira li platformu tipa Box
* ako dira, vraća informaciju s koje strane ili null ako ne dira

## lib-05-game_v3.js

* riješen problem prolaska kroz platforme kod skakanja u nekim situacijama

- drzati tipku a za napad
- drzati tipku s za stit
- kretanje pomocu tipki lijevo desno gore

Prvi level proci tako da se pobjedu svi demoni i dode do plave oznake za kraj levela
Drugi level proci tako da se pobjedu svi demoni

Ako se skupi napitak (potion) Youku dobije 10 dodatnih zivota
