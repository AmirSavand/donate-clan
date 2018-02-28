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
  uibDropdownConfig.openClass = 'show';
});

/**
 * @name run
 */
app.run(function ($window, $rootScope, $anchorScroll) {
  $rootScope.version = "1.0.0";
  $rootScope.tag = "#2Y2C9RCJ";
  $rootScope.feedback = "mailto:amir@savandbros.com?Subject=Donate Clan v" + $rootScope.version;

  $rootScope.$on('$viewContentLoaded', function () {
    $anchorScroll();
  });
});
