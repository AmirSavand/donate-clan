"use strict";

app.controller("MemberController", function (API, Member, toaster, $scope, $state, $stateParams) {

  function generateDetailCards(member) {
    $scope.detailCards = [{
      icon: "user-circle",
      color: "primary",
      title: "Role",
      value: member.role
    }, {
      icon: "diamond",
      color: "danger",
      title: "Rarity",
      value: member.get.rarity
    }, {
      icon: "star-half-o",
      color: "warning",
      title: "Score",
      value: member.get.score
    }, {
      icon: "trophy",
      color: "info",
      title: "Leaderboard Score",
      value: member.get.leaderboard_score
    }, {
      icon: "plus-circle",
      color: "success",
      title: "Top Donation",
      value: "+" + member.get.top_donation
    }, {
      icon: "cube",
      color: "warning",
      title: "1st Clan Chest",
      value: member.get.first_clan_chest
    }, {
      icon: "cubes",
      color: "warning",
      title: "1st Clan Battle Chest",
      value: member.get.first_clan_battle_chest
    }];
  }

  function constructor() {
    if (!$scope.member) {
      // Get member from backend
      API.Members.get({ name: $stateParams.name },
        function (data) {
          // Instantiate member
          $scope.member = new Member(data);
          generateDetailCards($scope.member);
        },
        function () {
          toaster.error($stateParams.name, "This member doesn't exist, or has been removed!");
          $state.go("app.home");
        }
      );
    } else {
      // Load member from param
      $scope.member = new Member($stateParams.member);
      generateDetailCards($scope.member);
    }
  }

  constructor();
});
