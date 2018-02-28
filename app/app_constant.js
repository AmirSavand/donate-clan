"use strict";

/**
 * @name constant
 * @desc App constants
 */
app.constant("Constant", {
  env: {
    api: {
      royaleClan: "http://127.0.0.1:8000/",
      clashApi: "http://www.clashapi.xyz/api/"
    }
  },
  roles: [
    "member",
    "elder",
    "coleader",
    "leader",
  ],
  sorts: {
    rarity: {
      common: 0,
      rare: 1,
      epic: 2,
      legendary: 3
    },
    type: {
      Troop: 0,
      Spell: 1,
      Building: 2
    }
  }
});
