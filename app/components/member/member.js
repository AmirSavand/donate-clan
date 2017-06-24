"use strict";

app.service("Member", function (Constant) {
  return function (data) {

    /**
     * @name get
     * @type {object}
     */
    this.get = data;

    /**
     * @name role
     * @type {string}
     */
    this.role = Constant.roles[data.role];
  };
});
