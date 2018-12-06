"use strict";

/**
 * App routes
 */
app.config(function (ENV, $stateProvider, $urlRouterProvider) {

  /**
   * Get template URL with version
   * @type {function}
   */
  function comp(url) {
    return "static/components/" + url + "?v=" + ENV.VERSION;
  }

  $stateProvider.state("app", {
    abstract: true,
    template: "<ui-view/>"
  })

  .state("app.home", {
    url: "/",
    controller: "HomeController",
    templateUrl: comp("home/home.html")
  })

  .state("app.signin", {
    url: "/signin",
    controller: "SignInController",
    templateUrl: comp("account/signin/signin.html"),
    auth: false
  })

  .state("app.signup", {
    url: "/register",
    controller: "SignUpController",
    templateUrl: comp("account/signup/signup.html"),
    auth: false
  })

  .state("app.user", {
    url: "/u/:username",
    controller: "UserController",
    templateUrl: comp("user/user.html"),
    params: {
      user: null
    }
  })

  .state("app.settings", {
    url: "/settings",
    controller: "SettingsController",
    templateUrl: comp("account/settings/settings.html"),
    auth: true
  })

  .state("app.deck-new", {
    url: "/build/:id",
    controller: "DeckNewController",
    templateUrl: comp("deck/deck_new/deck_new.html"),
    params: {
      deck: null
    }
  })

  .state("app.deck-list", {
    url: "/decks/:id",
    controller: "DeckListController",
    templateUrl: comp("deck/deck_list/deck_list.html")
  })

  .state("app.deck", {
    url: "/deck/:id",
    controller: "DeckController",
    templateUrl: comp("deck/deck.html"),
    params: {
      deck: null
    }
  });

  $urlRouterProvider.otherwise("/");
});
