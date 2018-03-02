"use strict";

/**
 * @name config
 * @desc App routes
 */
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

  .state("app.signup", {
    url: "/register",
    controller: "SignUpController",
    templateUrl: "components/account/signup/signup.html",
    auth: false,
    params: {
      user: null
    }
  })

  .state("app.user", {
    url: "/u/:username",
    controller: "UserController",
    templateUrl: "components/user/user.html",
    params: {
      user: null
    }
  })

  .state("app.settings", {
    url: "/settings",
    controller: "SettingsController",
    templateUrl: "components/account/settings/settings.html",
    auth: true
  })

  .state("app.member", {
    url: "/m/:tag",
    controller: "MemberController",
    templateUrl: "components/member/member.html",
    params: {
      member: null
    }
  })

  .state("app.deck-new", {
    url: "/build/:index",
    controller: "DeckNewController",
    templateUrl: "components/deck/deck_new/deck_new.html",
    params: {
      deck: null
    }
  })

  .state("app.deck-list", {
    url: "/decks/:username",
    controller: "DeckListController",
    templateUrl: "components/deck/deck_list/deck_list.html"
  });

  $urlRouterProvider.otherwise("/");
});
