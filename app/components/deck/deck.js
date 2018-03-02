"use strict";

app.service("Deck", function (Card) {
  return function (name, cards, type) {

    /**
     * @type {string}
     */
    this.name = name;

    /**
     * @type {Array<Card>}
     */
    this.cards = cards;

    /**
     * @type {number}
     */
    this.type = type || 0;

    /**
     * @type {float}
     */
    this.avgElixir = 0.0;

    /**
     * @type {function}
     * @returns {float}
     */
    this.getAvgElixirCost = function () {
      this.avgElixir = 0.0;
      for (var i in this.cards) {
        this.avgElixir += this.cards[i].elixirCost;
        if (this.cards[i].idName === "mirror") {
          this.avgElixir += 2;
        }
      }
      this.avgElixir /= this.cards.length;
      return this.avgElixir;
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
      var exportedCards = [];

      for (var i in this.cards) {
        exportedCards.push(this.cards[i].export());
      }

      return {
        name: this.name,
        type: this.type,
        avg_elixir: this.avgElixir,
        cards: exportedCards.join(" "),
      };
    };

    /**
     * @type {function}
     * @returns {Deck}
     */
    this.import = function (name, cards) {
      this.name = name;
      this.cards = [];
      for (var i in cards.split(" ")) {
        this.cards.push(new Card().import(cards[i]));
      }
      return this;
    };
  };
});
