"use strict";

app.service("Card", function (Constant, $uibModal) {
  return function (id, idName, name, arena, description, elixirCost, order, rarity, type) {
    var self = this;

    this.id = id;
    this.idName = idName;
    this.name = name;
    this.arena = arena;
    this.description = description;
    this.elixirCost = elixirCost;
    this.order = order;
    this.rarity = rarity;
    this.type = type;

    function constructor() {
      self.image = "http://www.clashapi.xyz/images/cards/" + self.idName + ".png";
      self.typeSort = Constant.sorts.type[self.type];
      self.raritySort = Constant.sorts.rarity[self.rarity];
    }

    this.isInDeck = function (deck) {
      return deck.cards.indexOf(this) !== -1;
    };

    this.view = function () {
      $uibModal.open({
        templateUrl: "components/card/card.html",
        controller: "CardController",
        ariaDescribedBy: "modal-body",
        resolve: {
          card: this
        }
      });
    };

    this.export = function () {
      return this.idName;
    };

    this.import = function (idName) {

      if (!localStorage.cards) {
        return;
      }

      var cards = JSON.parse(localStorage.cards);

      for (var i in cards) {
        var card = cards[i];

        if (card.idName === idName) {
          this.id = card._id;
          this.idName = card.idName;
          this.name = card.name;
          this.arena = card.arena;
          this.description = card.description;
          this.elixirCost = card.elixirCost;
          this.order = card.order;
          this.rarity = card.rarity;
          this.type = card.type;
          constructor();
          return this;
        }
      }
    };

    constructor();
  };
});
