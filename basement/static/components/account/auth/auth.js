"use strict";

app.service("Auth", function (API, toaster, $rootScope) {

  /**
   * @private
   */
  var self = this;

  /**
   * @name getAuth
   * @type {function}
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
   * @type {function}
   *
   * @param {object} user
   * @param {string} token
   */
  this.setAuth = function (user, token) {
    localStorage.setItem("user", JSON.stringify(user));
    if (token) {
      localStorage.setItem("JWT", token);
    }
    $rootScope.$broadcast("royalePlus.Auth:setAuth");
  };

  /**
   * @name updateAuth
   * @type {function}
   *
   * @param {object} user
   */
  this.updateAuth = function (user, broadcast) {
    localStorage.setItem("user", JSON.stringify(user));
    if (broadcast) {
      $rootScope.$broadcast("royalePlus.Auth:updateAuth");
    }
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
    $rootScope.$broadcast("royalePlus.Auth:unAuth");
  };

  /**
   * @name isAuth
   * @type {function}
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
   * @type {function}
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
      form.loading = false;
      toaster.info("Signed in", "Welcome to the awesomeness " + username + ".");
      $rootScope.$broadcast("royalePlus.Auth:signIn", data.user);

      if (success) {
        success();
      }
    }, function () {
      toaster.error("Unable to Sign in", "Incorrect username or password.");
      form.loading = false;
    });
  };
});
