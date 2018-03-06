"use strict";

/**
 * Environment constant
 */
app.constant("ENV", {
  ROYALE_PLUS: "http://127.0.0.1:8000/",
  CLASH_API: "http://www.clashapi.xyz/api/"
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
  },
  deck: {
    type: [
      "None",
      "Cycle",
      "Spell Bait",
      "Beatdown",
      "Spawner",
      "Three Crowns",
      "Control",
      "Siege"
    ]
  }
});
