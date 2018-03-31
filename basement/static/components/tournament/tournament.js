"use strict";

app.service("Tournament", function (Account, Main) {
  return function (data) {

    /**
     * @private
     */
    var self = this;

    /**
     * @type {object}
     */
    this.get = data;

    /**
     * @type {number}
     */
    this.id = data.id;

    /**
     * @type {string}
     */
    this.name = data.name;

    /**
     * @type {Account}
     */
    this.user = data.user ? new Account(data.user) : null;

    /**
     * @type {Array<Account>}
     */
    this.participants = [];

    /**
     * @type {number}
     */
    this.status = data.status;

    /**
     * @type {number}
     */
    this.prize = data.prize;

    /**
     * @type {function}
     * @returns {string}
     */
    this.getStatus = function () {
      return Main.tournament.status[this.status];
    };

    /**
     * @private
     * @type {function}
     */
    function constructor() {
      // Instantiate all users
      for (var i in self.get.participants) {
        self.participants.push(new Account(self.get.participants[i]));
      }
    }

    constructor();
  };
});

app.service("TournamentMatch", function (API, Account) {
  return function (data, tournament) {

    /**
     * @private
     */
    var self = this;

    /**
     * @type {object}
     */
    this.get = data;

    /**
     * @type {number}
     */
    this.id = data.id;

    /**
     * @type {Tournament}
     */
    this.tournament = tournament;

    /**
     * @type {number}
     */
    this.stage = data.stage;

    /**
     * @type {Account}
     */
    this.player1 = data.player_1 ? new Account(data.player_1) : null;

    /**
     * @type {Account}
     */
    this.player2 = data.player_2 ? new Account(data.player_2) : null;

    /**
     * @type {Account}
     */
    this.winner = data.player_winner ? new Account(data.player_winner) : null;

    /**
     * @type {function}
     *
     * @param {Account} player
     */
    this.setWinner = function (player) {

      // Check if tournament host
      if (!this.tournament.user.isSameUser()) {
        return;
      }

      // Check if player is in match
      if (player.id !== this.player1.id && player.id !== this.player2.id) {
        return;
      }

      // Set winner
      API.TournamentMatches.put({ id: this.id }, { winner: player.id, tournament: this.tournament.id },
        function (data) {
          self.winner = new Account(data.player_winner);
        }
      );
    };
  };
});
