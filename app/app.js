"use strict";

/**
 * @name app
 * @desc Royale clan for Donate clan
 */
var app = angular.module("royaleClan", [
  "ngResource",
  "ui.router",
  "ui.bootstrap",
  "toaster"
]);

/**
 * @name config
 */
app.config(function ($qProvider, $resourceProvider, $locationProvider, uibDropdownConfig) {
  $qProvider.errorOnUnhandledRejections(false);
  $resourceProvider.defaults.stripTrailingSlashes = false;
  $locationProvider.hashPrefix("");
  uibDropdownConfig.openClass = "show";
});

/**
 * @name run
 */
app.run(function (Auth, toaster, $state, $window, $rootScope, $anchorScroll) {
  $rootScope.version = "1.0.0";
  $rootScope.tag = "#2Y2C9RCJ";
  $rootScope.feedback = "mailto:amir@savandbros.com?Subject=Royale Clan v" + $rootScope.version;

  $rootScope.$on("$viewContentLoaded", function () {
    $anchorScroll();
  });

  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

    console.log(123);

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
