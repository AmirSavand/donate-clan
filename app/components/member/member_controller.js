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
    $scope.member = $stateParams.member;
    $scope.name = $stateParams.name;

    // Get member (if not given)
    if (!$scope.member) {
      API.Members.get({ name: $stateParams.name }, function (data) {
        $scope.member = new Member(data);
        generateDetailCards($scope.member);
      }, function () {
        toaster.error($scope.name, "This member doesn't exist, or has been removed!");
        $state.go("app.home");
      });
    } else {
      generateDetailCards($scope.member);
    }
  }

  constructor();
});
