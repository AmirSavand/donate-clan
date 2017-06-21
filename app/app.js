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
app.config(function ($qProvider, $resourceProvider, $locationProvider) {
  $qProvider.errorOnUnhandledRejections(false);
  $resourceProvider.defaults.stripTrailingSlashes = false;
  $locationProvider.hashPrefix("");
});

/**
 * @name run
 */
app.run(function () {

  $rootScope.$on('$viewContentLoaded', function () {
    $anchorScroll();
  });
});
