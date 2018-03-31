"use strict";

app.controller("TournamentListController", function (API, Tournament, Common, $scope) {

  function constructor() {

    /**
     * @type {Array<Tournament>}
     */
    $scope.tournaments = [];

    /**
     * Get tournaments
     */
    API.Tournaments.get({}, function (data) {
      angular.forEach(data.results, function (result) {
        $scope.tournaments.push(new Tournament(result));
      });
    });
  }

  $scope.showInfo = function () {
    Common.modal("tournament/tournament_info.html");
  };

  constructor();
});
