"use strict";

app.controller("MemberController", function (API, Member, toaster, $scope, $state, $stateParams) {

  function constructor() {

    /**
     * Get basic data from params
     *
     * @type {Member}
     */
    $scope.member = $stateParams.member;

    /**
     * Information of a member
     *
     * @type {object}
     */
    $scope.detailCards = [{
      icon: "chess",
      color: "primary",
      title: "Role",
      value: "..."
    }, {
      icon: "flag-checkered",
      color: "success",
      title: "Arena",
      value: "..."
    }, {
      icon: "trophy",
      color: "warning",
      title: "Max Trophies",
      value: "..."
    }];

    /**
     * Get full member detail via API
     */
    API.Member.get({ tag: $stateParams.tag, keys: "name,tag,clan,arena,stats" }, function (data) {
      $scope.member = new Member(data);
      $scope.detailCards[0].value = $scope.member.role;
      $scope.detailCards[1].value = $scope.member.arena.name;
      $scope.detailCards[2].value = $scope.member.stats.maxTrophies;
    });
  }

  constructor();
});
