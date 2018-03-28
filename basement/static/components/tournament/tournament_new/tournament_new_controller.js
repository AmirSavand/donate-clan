"use strict";

app.controller("TournamentNewController", function (API, Auth, toaster, $scope) {

  var user = Auth.getAuth();

  function constructor() {

    /**
     * Tournament form
     *
     * @type {object}
     */
    $scope.form = {
      loading: false,
      errors: [],
      data: {
        name: "My New Tournament",
        prize: 100,
        users: []
      }
    };

    /**
     * Available participants to select
     * @type {Array}
     */
    $scope.participants = [];

    /**
     * Add self as available participants
     */
    $scope.participants.push({
      id: user.id,
      username: user.username,
      add: true
    });

    /**
     * Add all followings to participants
     */
    API.Follow.get({ following: user.id }, function (data) {
      angular.forEach(data.results, function (result) {
        $scope.participants.push({
          username: result.user.username,
          id: result.user.id,
          add: false
        });
      });
    });
  }

  $scope.create = function () {
    $scope.form.loading = true;
    var payload = $scope.form.data;

    angular.forEach($scope.participants, function (participant) {
      if (participant.add) {
        payload.users.push(participant.id);
      }
    });

    // Check user selection
    if ($scope.form.data.users.length < 3) {
      toaster.error("Oops!", "You need to select at least 3 users.");
      $scope.form.loading = false;
      return;
    }

    API.Tournaments.post(payload, function (data) {
      console.log(data);
    });
  };

  constructor();
});
