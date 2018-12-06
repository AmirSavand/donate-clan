"use strict";

app.controller("SettingsController", function (Auth, API, Account, toaster, $scope, $rootScope, $state) {

  var user = Auth.getAuth();

  function constructor() {

    /**
     * @type {Array<Account>}
     */
    $scope.userInstance = new Account(Auth.getAuth());

    /**
     * @type {Array<null>}
     */
    $scope.avatars = new Array(100);

    API.Users.get({ username: user.username }, function (data) {
      $scope.form.data = {
        email: data.email,
        about: data.about,
        link: data.link,
        nationality: data.nationality,
        avatar: data.avatar,
        username: data.username
      };
    });

    /**
     * @type {boolean}
     */
    $scope.showMore = false;
  }

  /**
   * @param {number} avatar
   */
  $scope.setAvatar = function (avatar) {
    $scope.form.data.avatar = avatar;
    $scope.update($scope.form);
  };

  $scope.update = function (form) {
    form.loading = true;

    API.Settings.put({}, form.data,
      function (data) {
        form.loading = false;
        form.error = null;
        form.data = data;
        $scope.userInstance = new Account(data);
        toaster.info("Updated", "Your pofile settings are updated.");

        // Broadcast user update
        $rootScope.$broadcast("royalePlus.Auth:updateAuth");
      },
      function (data) {
        form.loading = false;
        form.error = data.data;
      }
    );
  };

  constructor();
});
