"use strict";

app.service("Auth", function (API, toaster, $rootScope) {

  /**
   * @private
   */
  var self = this;

  /**
   * @name getAuth
   * @returns {object|boolean}
   */
  this.getAuth = function () {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    }
    return false;
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
      localStorage.setItem("JWT", JSON.stringify(token));
    }
    $rootScope.$broadcast("royaleClan.Auth:setAuth");
  };

  /**
   * @name unAuth
   */
  this.unAuth = function () {
    if (!this.isAuth) {
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
   */
  this.signIn = function (username, password, form) {
    form.loading = true;

    API.SignIn.post({ username: username, password: password }, function (data) {
      self.setAuth(data.user, data.token);
      toaster.info("Signed in", "Welcome to the awesomeness " + username + ".");
      form.loading = false;
    }, function () {
      toaster.error("Unable to Sign in", "Incorrect username or password.");
      form.loading = false;
    });
  };
});
