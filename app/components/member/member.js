"use strict";

app.service("Member", function () {
  return function (data) {

    /**
     * Member class
     * @private
     */
    var self = this;

    /**
     * Used for sorting members by role
     * @private
     */
    var clanRoles = [
      "none",
      "member",
      "elder",
      "coLeader",
      "leader"
    ];

    /**
     * @type {object}
     */
    this.get = data;

    /**
     * @type {string}
     */
    this.name = this.get.name;

    /**
     * @type {string}
     */
    this.tag = this.get.tag;

    /**
     * @type {string}
     */
    this.role = clanRoles[0];

    /**
     * @type {object}
     */
    this.stats = {};

    /**
     * @type {object}
     */
    this.arena = {};

    /**
     * @type {object}
     */
    this.clan = {};

    /**
     * @type {number}
     */
    this.roleRank = -1;

    /**
     * @type {function}
     */
    this.constructor = function () {
      if (this.get.role) {
        this.role = this.get.role;
        this.roleRank = clanRoles.indexOf(this.role);
      }
      if (this.get.clan) {
        this.clan = this.get.clan;
        this.role = this.clan.role;
        this.stats = this.get.stats;
        this.arena = this.get.arena;
      }
    };

    this.constructor();
  };
});
