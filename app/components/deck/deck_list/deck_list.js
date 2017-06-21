"use strict";

app.service("DeckList", function () {

  this.get = function (index) {
    var decks = localStorage.decks ? JSON.parse(localStorage.decks) : [];
    if (index) {
      return decks[index];
    }
    return decks;
  };

  this.save = function (deck, index) {
    var decks = this.get();
    if (decks[index]) {
      decks[index] = deck.export();
    } else {
      decks.push(deck.export());
    }
    this.update(decks);
  };

  this.remove = function (index) {
    var decks = this.get();
    if (decks[index]) {
      decks.splice(index, 1);
    }
    this.update(decks);
  };

  this.update = function (decks) {
    localStorage.decks = JSON.stringify(decks);
  };
});
