"use strict";

app.controller("DeckListController", function (API, Main, Pagination, Deck, toaster, $scope, $state, $stateParams) {

  /**
   * @type {object}
   */
  var payload = {
    limit: 9
  };

  function constructor() {

    $scope.params = $stateParams;

    /**
     * Filter
     *
     * @type {object}
     */
    $scope.deckFilter = {
      arena: null,
      kind: null
    };

    /**
     * Modes
     *
     * @type {Array<object>}
     */
    $scope.modes = [{
      key: "mode_1v1",
      label: "1v1"
    }, {
      key: "mode_2v2",
      label: "2v2"
    }, {
      key: "mode_2x",
      label: "2x Elixir"
    }, {
      key: "mode_3x",
      label: "3x Elixir"
    }];

    /**
     * Keep all modes in filter list
     */
    angular.forEach($scope.modes, function (value) {
      $scope.deckFilter[value.key] = false;
    });

    /**
     * All decks to show
     *
     * @type {Array<Deck>}
     */
    $scope.decks = [];

    /**
     * All areans
     *
     * @type {Array<string>}
     */
    $scope.deckArenas = Main.deck.arena;

    /**
     * All type of decks
     *
     * @type {Array<string>}
     */
    $scope.deckKinds = Main.deck.kind;

    /**
     * If there's user in URL param, then update payload
     */
    if ($stateParams.id) {
      payload.user = $stateParams.id;
    }

    initDecks();
  }

  /**
   * Paginaition
   */
  function initDecks() {
    $scope.pagination = new Pagination(API.Decks.get, payload);
  }

  /**
   * Modes
   *
   * @param key {string | boolean}
   */
  $scope.filter = function (key) {

    // Check for value
    if ($scope.deckFilter[key] !== null) {
      payload[key] = $scope.deckFilter[key];
    }

    // Check if value is false or null
    if ($scope.deckFilter[key] === false || $scope.deckFilter[key] === null) {
      payload[key] = null;
    }

    //  Remove "All Arena" from payload
    if (key == "arena" && $scope.deckFilter[key] == 0) {
      payload[key] = null;
    }

    $scope.decks = [];
    initDecks();
  };

  /**
   * Reset filter/payload
   */
  $scope.resetFilter = function () {
    payload = { limit: 9 };
    constructor();
  };

  /**
   * Loaded decks
   */
  $scope.$on("royalePlus.Pagination:loaded", function (event, data) {
    angular.forEach(data.results, function (result) {
      $scope.decks.push(new Deck().import(result));
    });

    // No decks
    if (!data.count) {
      $state.go("app.deck-list", { id: null });
    }

    $scope.initialled = true;
  });

  $scope.$on("royalePlus.MainController:loadedCards", constructor);

  constructor();
});
