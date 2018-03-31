"use strict";

app.controller("TournamentController", function (API, Tournament, TournamentMatch, $scope, $stateParams) {

  function constructor() {

    /**
     * @type {Tournament}
     */
    $scope.tournament = $stateParams.tournament;

    /**
     * @type {Array<TournamentMatch>}
     */
    $scope.tournamentMatches = [];

    /**
     * Used to group matches by their stage
     *
     * @type {Array<number>}
     */
    $scope.stages = [];

    /**
     * Get tournament
     */
    if (!$scope.tournament) {
      API.Tournaments.get({ id: $stateParams.id }, function (data) {
        $scope.tournament = new Tournament(data);
      });
    }

    /**
     * Get tournament matches
     */
    API.TournamentMatches.get({ tournament: $stateParams.id }, function (data) {
      angular.forEach(data.results, function (result) {
        $scope.tournamentMatches.unshift(new TournamentMatch(result, $scope.tournament));
        // Store stage
        $scope.stages[result.stage] = result.stage;
      });
    });
  }

  constructor();
});
