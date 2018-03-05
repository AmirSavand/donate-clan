"use strict";

/**
 * @name app
 * @desc Royale clan for Donate clan
 */
var app = angular.module("royaleClan", [
  "ngResource",
  "ngDisqus",
  "ui.router",
  "ui.bootstrap",
  "toaster"
]);

/**
 * @name config
 */
app.config(function ($qProvider, $resourceProvider, $locationProvider, $httpProvider, $disqusProvider, uibDropdownConfig) {
  $qProvider.errorOnUnhandledRejections(false);
  $resourceProvider.defaults.stripTrailingSlashes = false;
  $httpProvider.interceptors.push("AuthInterceptor");
  $locationProvider.hashPrefix("!");
  $disqusProvider.setShortname("royale-clan");
  uibDropdownConfig.openClass = "show";
});

/**
 * @name run
 */
app.run(function (Auth, toaster, $state, $window, $rootScope, $anchorScroll) {

  /**
   * @type {string}
   */
  $rootScope.version = "1.0.0";

  /**
   * @type {string}
   */
  $rootScope.tag = "#2Y2C9RCJ";

  /**
   * @type {string}
   */
  $rootScope.feedback = "mailto:amir@savandbros.com?Subject=Royale Clan v" + $rootScope.version;

  /**
   * @type {string}
   */
  $rootScope.github = "https://github.com/AmirSavand/royale-clan";

  /**
   * @type {Date}
   */
  $rootScope.now = new Date();

  /**
   * Page loaded completely
   */
  $rootScope.$on("$viewContentLoaded", function () {
    $anchorScroll();
  });

  /**
   * Page is starting to change
   */
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

    // Check authentication for state
    if (typeof toState.auth !== "undefined") {

      // Conditions
      var authOnly = toState.auth && !Auth.isAuth();
      var unAuthOnly = !toState.auth && Auth.isAuth()

      // State allows (un)authenticated only
      if (authOnly || unAuthOnly) {

        // Stop chaging state
        event.preventDefault();

        // If first view, go home
        if (fromState.name == "") {
          $state.go("app.home");
        }

        // Announce user
        if (authOnly) {
          toaster.error("Not signed in", "You need to sign in first.");
        } else {
          toaster.error("Opps!", "You can not access that page.");
        }
      }
    }
  });
});
