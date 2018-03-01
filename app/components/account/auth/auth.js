"use strict";

app.service("Auth", function (Member, API, toaster, $rootScope, $state) {

  /**
   * @private
   */
  var self = this;

  /**
   * @name getAuth
   * @returns {object|boolean}
   */
  this.getAuth = function () {
    var user = false;

    if (this.isAuth()) {
      user = JSON.parse(localStorage.getItem("user"));
    }

    return user;
  };

  /**
   * @name setAuth
   *
   * @param {object} user
   * @param {string} token
   */
  this.setAuth = function (user, token) {
    localStorage.setItem("user", JSON.stringify(user));
    if (token) {
      localStorage.setItem("JWT", token);
    }
    $rootScope.$broadcast("royaleClan.Auth:setAuth");
  };

  /**
   * @name unAuth
   */
  this.unAuth = function () {
    if (!this.isAuth()) {
      return;
    }
    localStorage.removeItem("JWT");
    localStorage.removeItem("user");
    $rootScope.$broadcast("royaleClan.Auth:unAuth");
  };

  /**
   * @name isAuth
   * @returns {boolean}
   */
  this.isAuth = function () {
    if (localStorage.getItem("JWT") && localStorage.getItem("user")) {
      return true;
    }
    return false;
  };

  /**
   * @name signIn
   *
   * @param {string} username
   * @param {string} password
   * @param {object} form
   * @param {function} success
   */
  this.signIn = function (username, password, form, success) {
    form.loading = true;

    API.SignIn.post({ username: username, password: password }, function (data) {
      self.setAuth(data.user, data.token);
      toaster.info("Signed in", "Welcome to the awesomeness " + username + ".");
      form.loading = false;

      if (success) {
        success();
      }
    }, function () {
      toaster.error("Unable to Sign in", "Incorrect username or password.");
      form.loading = false;
    });
  };
});
