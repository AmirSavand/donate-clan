"use strict";

app.service("Account", function (ENV, Auth, toaster, API) {
  return function (data) {

    /**
     * @private
     */
    var self = this;

    /**
     * @private
     * @type {object}
     */
    var currentUser = Auth.getAuth();

    /**
     * @private
     * @type {string}
     */
    var defaultImage = "static/assets/img/avatar.png?v=" + ENV.VERSION;

    /**
     * @type {object}
     */
    this.get = data;

    /**
     * @type {string}
     */
    this.username = this.get.username;

    /**
     * @type {string}
     */
    this.picture = this.get.picture || defaultImage;

    /**
     * @type {function}
     * @returns {boolean}
     *
     * @param {Account} user
     */
    this.isSameUser = function () {
      return this.username === currentUser.username;
    };

    /**
     * @type {function}
     */
    this.follow = function () {

      // Check if user is not authenticated
      if (!Auth.isAuth()) {
        toaster.error("Unable to follow", "You need to be a member to follow.");
        return;
      }

      // Check if following self
      if (this.isSameUser()) {
        toaster.error("Unable to follow", "You can't follow yourself");
        return;
      }

      // Follow
      API.Follow.save({ following: this.username },
        function (data) {
          console.log(data);
        },
        function (data) {
          console.log(data);
          toaster.error("Oops", "Somthing went wrong");
        }
      );
    };

    /**
     * @type {function}
     *
     * @param {Account}
     */
    this.unfollow = function (user) {

      // @todo check auth (with toast)

      // Check if unfollowing self
      if (this.isSameUser()) {
        // @todo Toast here
        return;
      }

      // @todo unfollow here (with toast)
    };
  };
});
