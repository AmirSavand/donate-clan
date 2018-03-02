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
     * Calculate average elixir cost and update the variable then return it
     *
     * @type {function}
     * @returns {float}
     */
    this.updateAvgElixirCost = function () {
      // Reset aec
      this.avgElixir = 0;
      // For all cards
      for (var i in this.cards) {
        // Add elixir cost
        this.avgElixir += this.cards[i].elixirCost;
        // If card is mirror
        if (this.cards[i].idName === "mirror") {
          // Consider it 2 elixir cost
          this.avgElixir += 2;
        }
      }
      // Calculate the aec and update the instance variable
      this.avgElixir /= this.cards.length;
      // Round it
      this.avgElixir = Math.round(this.avgElixir * 10) / 10;
      // Return it finally
      return this.avgElixir;
    };

    /**
     * @type {function}
     * @returns {null|false}
     *
     * @param {Card} card
     */
    this.addCard = function (card) {
      // Check if card is already in or deck is full
      if (card.isInDeck(this) || this.cards.length >= 8) {
        return false;
      }
      // Add the card
      this.cards.push(card);
      // Update AEC
      this.updateAvgElixirCost();
    };

    /**
     * @type {function}
     * @returns {Array<Card>}
     *
     * @param {Card} card
     */
    this.removeCard = function (card) {
      this.cards.splice(this.cards.indexOf(card), 1);
    };

    /**
     * Export an object structure for backend API
     *
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
     * Import the card data from backend API structure
     *
     * @type {function}
     * @returns {Card}
     *
     * @param {string} name
     * @param {string} cards All cards separated by space
     * @param {number} type
     */
    this.import = function (name, cards, type) {
      this.name = name;
      this.cards = [];
      this.type = type;
      for (var i in cards.split(" ")) {
        this.cards.push(new Card().import(cards[i]));
      }
      return this;
    };
  };
});
