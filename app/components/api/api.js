"use strict";

app.service("API", function (ENV, $resource) {

  var apiData = {};

  var endpoints = [{
    name: "SignIn",
    endpoint: "auth/" // POST
  }, {
    name: "Users",
    endpoint: "users/:username/" // POST - GET - DELETE
  }, {
    name: "Member",
    endpoint: "crapi/member/:tag/" // GET
  }, {
    name: "Clan",
    endpoint: "crapi/clan/" // GET
  }, {
    name: "Cards",
    endpoint: "cards/", // GET
    api: "CLASHAPI"
  }, {
    name: "RandomDeck",
    endpoint: "random-deck/", // GET
    api: "CLASHAPI"
  }, {
    name: "Settings",
    endpoint: "settings/" // PUT
  }];

  function createResourceObject(attrName, endpoint) {
    apiData[attrName] = $resource(endpoint, {}, {
      put: { method: "PUT" },
      post: { method: "POST" },
      patch: { method: "PATCH" }
    });
  }

  function setAPIData() {
    for (var i in endpoints) {
      // Clan royale
      var base = ENV.ROYALECLAN;
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
