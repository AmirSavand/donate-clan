"use strict";

/**
 * Environment constant
 */
app.constant("ENV", {
  ROYALECLAN: "http://127.0.0.1:8000/",
  CLASHAPI: "http://www.clashapi.xyz/api/"
});

/**
 * Main constant
 */
app.constant("Main", {
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
