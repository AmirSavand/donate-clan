"use strict";

app.controller("MemberController", function (API, Member, toaster, $scope, $state, $stateParams) {

  function generateDetailCards(member) {
    $scope.detailCards = [{
      icon: "chess",
      color: "primary",
      title: "Role",
      value: member.role
    }, {
      icon: "flag-checkered",
      color: "success",
      title: "Arena",
      value: member.arena.name
        // }, {
        //   icon: "star-half-o",
        //   color: "warning",
        //   title: "Score",
        //   value: member.get.score
    }, {
      icon: "trophy",
      color: "warning",
      title: "Max Trophies",
      value: member.stats.maxTrophies
        // }, {
        //   icon: "plus-circle",
        //   color: "success",
        //   title: "Most Donation",
        //   value: "+" + member.get.most_donated
        // }, {
        //   icon: "trophy",
        //   color: "warning",
        //   title: "1st Clan Chest",
        //   value: member.get.clan_chest_champion
    }];
  }

  function constructor() {
    
    $scope.member = $stateParams.member;

    API.Member.get({ tag: $stateParams.tag, keys: "name,tag,clan,arena,stats" }, function (data) {
      $scope.member = new Member(data);
      generateDetailCards($scope.member);
    });
  }

  constructor();
});
