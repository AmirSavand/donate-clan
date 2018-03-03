"use strict";

app.service("Deck", function (Auth, Card, Main) {
  return function (name, cards, type) {

    /**
     * @type {number}
     */
    this.id = null;

    /**
     * @type {string}
     */
    this.user = null;

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
     * @type {Date}
     */
    this.date = new Date();

    /**
     * Get the type name by index
     *
     * @type {function}
     * @returns {string}
     */
    this.getType = function () {
      return Main.deck.type[this.type];
    };

    /**
     * Calculate average elixir cost and update the variable then return it
     *
     * @type {function}
     * @returns {float}
     */
    this.getAvgElixir = function () {
      // Reset aec
      var aec = 0;
      // For all cards
      for (var i in this.cards) {
        // Add elixir cost
        aec += this.cards[i].elixirCost;
        // If card is mirror
        if (this.cards[i].idName === "mirror") {
          // Consider it 2 elixir cost
          aec += 2;
        }
      }
      // Calculate the aec and update the instance variable
      aec /= this.cards.length;
      // Round it
      aec = Math.round(aec * 10) / 10;
      // Return it finally
      return aec;
    };

    /**
     * @type {function}
     * @returns {Card|false}
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
      // Return the card
      return this;
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
     * Check if signed in user is owner of this deck
     *
     * @type {boolean}
     */
    this.isOwner = function () {
      return this.user === Auth.getAuth().username;
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
        avg_elixir: this.getAvgElixir(),
        cards: exportedCards.join(" "),
      };
    };

    /**
     * Import the card data from backend API structure
     *
     * @type {function}
     * @returns {Card}
     *
     * @param {object} data
     */
    this.import = function (data) {
      this.id = data.id;
      this.user = data.user;
      this.name = data.name;
      this.cards = [];
      this.type = data.type;
      this.date = new Date(data.date_created);

      // Import cards
      var cards = data.cards.split(" ");
      for (var i in cards) {
        this.cards.push(new Card().import(cards[i]));
      }

      return this;
    };
  };
});
