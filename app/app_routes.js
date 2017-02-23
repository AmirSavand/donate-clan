"use strict";

app.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider.state("app", {
    abstract: true,
    template: "<ui-view/>"
  })

  .state("app.home", {
    url: "/",
    controller: "HomeController",
    templateUrl: "components/home/home.html"
  })

  .state("app.member", {
    url: "/member/:name",
    controller: "MemberController",
    templateUrl: "components/member/member.html",
    params: {
      member: null
    }
  })

  .state("app.deck-list", {
    url: "/decks/",
    controller: "DeckListController",
    templateUrl: "components/deck_list/deck_list.html"
  })

  .state("app.deck-new", {
    url: "/build/:index",
    controller: "DeckNewController",
    templateUrl: "components/deck_new/deck_new.html",
    params: {
      deck: null
    }
  });

  $urlRouterProvider.otherwise("/");
});
