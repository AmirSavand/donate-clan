"use strict";

app.controller("SignUpController", function (Auth, API, $scope) {

  $scope.signUp = function (form) {
    form.loading = true;

    // Sign up
    API.Users.save(form.data,
      function () {
        // Sign in
        Auth.signIn(form.data.username, form.data.password, form);
      },
      function (data) {
        // Show error
        form.loading = false;
        form.error = data.data;
      }
    );
  };
});
