"use strict";

app.controller("SettingsController", function (Auth, API, toaster, $scope, $state) {

  var user = Auth.getAuth();

  function constructor() {
    API.Users.get({ username: user.username }, function (data) {
      $scope.form.data = {
        email: data.email,
        about: data.about,
        member: data.member,
        link: data.link,
        nationality: data.nationality,
        picture: data.picture,
        username: data.username
      };
    });
  }

  $scope.update = function (form) {
    form.loading = true;

    API.Settings.put({}, form.data,
      function (data) {
        form.loading = false;
        form.error = null;
        form.data = data;
        toaster.info("Updated", "Your pofile settings are updated.");
      },
      function (data) {
        form.loading = false;
        form.error = data.data;
      }
    );
  };

  constructor();
});
