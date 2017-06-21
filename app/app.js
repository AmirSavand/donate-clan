"use strict";

/**
 * @name module
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
app.config(function ($qProvider, $locationProvider) {
  $qProvider.errorOnUnhandledRejections(false);
  $locationProvider.html5Mode(true);
});

/**
 * @name run
 */
app.run(function () {

});
