"use strict";

app.service("Member", function (Constant) {
  return function (name, role, rarity, donation, tags) {
    var self = this;

    this.name = name;
    this.role = role;
    this.rarity = rarity;
    this.donation = donation;
    this.tags = [];
    this.score = (
      Constant.score.role[this.role] +
      Constant.score.donation[this.donation] +
      Constant.score.rarity[this.rarity]
    );

    this.hasTag = function (tag) {
      return this.tags ? this.tags.indexOf(tag) !== -1 : false;
    };

    function constructor() {
      angular.forEach(tags, function (tag) {
        self.tags.push(new Tag(tag));
        self.score += Constant.Score.tag;
      });
    }

    constructor();
  };
});
