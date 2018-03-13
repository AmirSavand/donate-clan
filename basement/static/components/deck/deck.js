"use strict";

app.service("Deck", function (API, Auth, Card, Main, toaster, $state) {
  return function (name, cards, kind) {

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
    this.kind = kind || 0;

    /**
     * @type {number}
     */
    this.arena = arena || 0;

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
    this.getKind = function () {
      return Main.deck.kind[this.kind];
    };

    /**
     * Get the arena name by index
     *
     * @type {function}
     * @returns {string}
     */
    this.getArena = function () {
      return Main.deck.arena[this.arena];
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
     * Delete deck via API
     *
     * @returns {bool} True if deletion was successful
     */
    this.delete = function () {

      // Check onwership
      if (!this.isOwner()) {
        return false;
      }

      // Confirm
      if (!confirm("Are you sure you want to delete this deck?")) {
        return false;
      }

      // API call, toast and redirect
      API.Decks.delete({ id: this.id });
      $state.go("app.deck-list", { username: this.user });
      toaster.success("Deleted", "Deleted deck: " + this.name);

      // Success
      return true;
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
        kind: this.kind,
        arena: this.arena,
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
      this.kind = data.kind;
      this.arena = data.arena;
      this.date = new Date(data.created);

      // Import cards
      var cards = data.cards.split(" ");
      for (var i in cards) {
        this.cards.push(new Card().import(cards[i]));
      }

      return this;
    };
  };
});
