"use strict";

/**
 * @name constant
 * @desc App constants
 */
app.constant("Constant", {
  Scores: {
    role: {
      leader: 350,
      coleader: 200,
      elder: 100,
      member: 0
    },
    donation: {
      s: 200,
      a: 100,
      b: 75,
      c: 50,
      d: 0
    },
    rarity: {
      legendary: 200,
      epic: 100,
      rare: 50,
      common: 0
    },
    tag: 50
  },
  Tags: {
    "godlike": {
      font: "user-secret",
      sentence: "is the creator of clan."
    },
    "clan chest master": {
      font: "trophy",
      sentence: "won the Clan Chest Master (1st)."
    },
    "clan battle master": {
      font: "shield",
      sentence: "won the Clan Battle Master (1st)."
    },
    "whatsapp": {
      font: "whatsapp",
      sentence: "has joined the clan's WhatsApp group."
    }
  },
  Sorts: {
    rarity: {
      Common: 0,
      Rare: 1,
      Epic: 2,
      Legendary: 3
    },
    type: {
      Troop: 0,
      Spell: 1,
      Building: 2
    }
  }
});
