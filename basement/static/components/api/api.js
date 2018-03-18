"use strict";

app.service("API", function (ENV, $resource) {

  var apiData = {};

  var endpoints = [{
    name: "SignIn",
    endpoint: "api/auth/" // POST
  }, {
    name: "Users",
    endpoint: "api/users/:username/" // POST - PUT - GET - DELETE
  }, {
    name: "Follow",
    endpoint: "api/follows/" // POST - PUT
  }, {
    name: "Decks",
    endpoint: "api/decks/:id/" // POST - PUT - GET - DELETE
  }, {
    name: "Settings",
    endpoint: "api/settings/" // PUT
  }, {
    name: "Activities",
    endpoint: "api/activities/" // GET
  }, {
    name: "Comments",
    endpoint: "api/comments/" // POST - PUT - GET - DELETE
  }, {
    name: "Clan",
    endpoint: "crapi/clan/" // GET
  }, {
    name: "Member",
    endpoint: "crapi/member/:tag/" // GET
  }, {
    name: "Cards",
    endpoint: "cards/", // GET
    api: "CLASH_API"
  }, {
    name: "RandomDeck",
    endpoint: "random-deck/", // GET
    api: "CLASH_API"
  }];

  function createResourceObject(attrName, endpoint) {
    apiData[attrName] = $resource(endpoint, {}, {
      put: { method: "PUT" },
      post: { method: "POST" },
      patch: { method: "PATCH" },
      delete: { method: "DELETE" }
    });
  }

  function setAPIData() {
    for (var i in endpoints) {
      // Clan royale
      var base = ENV.ROYALE_PLUS;
      // Clash api
      if (endpoints[i].api) {
        base = ENV[endpoints[i].api];
      }
      // Resource object
      createResourceObject(endpoints[i].name, base + endpoints[i].endpoint);
    }
  }

  setAPIData();

  return apiData;
});
