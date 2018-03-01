"use strict";

app.service("Deck", function (Card) {
  return function (name, cards) {

    /**
     * @type {string}
     */
    this.name = name;

    /**
     * @type {Array<Card>}
     */
    this.cards = cards;

    /**
     * @type {function}
     * @returns {float}
     */
    this.getAvgElixirCost = function () {
      var aec = 0.0;
      for (var i in this.cards) {
        aec += this.cards[i].elixirCost;
        if (this.cards[i].idName === "mirror") {
          aec += 2;
        }
      }
      return aec / this.cards.length;
    };

    /**
     * @type {function}
     * @returns {Array<Card>}
     */
    this.addCard = function (card) {
      if (card.isInDeck(this) || this.cards.length >= 8) {
        return false;
      }
      return this.cards.push(card);
    };

    /**
     * @type {function}
     * @returns {Array<Card>}
     */
    this.removeCard = function (card) {
      this.cards.splice(this.cards.indexOf(card), 1);
    };

    /**
     * @type {function}
     * @returns {object}
     */
    this.export = function () {
      var deck = {
        name: this.name,
        cards: []
      };
      for (var i in this.cards) {
        deck.cards.push(this.cards[i].export());
      }
      return deck;
    };

    /**
     * @type {function}
     * @returns {Deck}
     */
    this.import = function (name, cards) {
      this.name = name;
      this.cards = [];
      for (var i in cards) {
        this.cards.push(new Card().import(cards[i]));
      }
      return this;
    };
  };
});
