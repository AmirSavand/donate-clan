"use strict";

app.service("API", function (Constant, $resource) {

  var apiData = {};

  var endpoints = [{
    name: "SignIn",
    endpoint: "auth/" // POST
  }, {
    name: "Members",
    endpoint: "members/:name/" // POST, GET, DELETE
  }, {
    name: "Users",
    endpoint: "users/:name/" // POST, GET, DELETE
  }, {
    name: "Cards",
    endpoint: "cards/", // GET
    clashApi: true
  }, {
    name: "RandomDeck",
    endpoint: "random-deck/", // GET
    clashApi: true
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
      // Base API is royale clan
      var base = Constant.env.api.royaleClan;
      // Is endpoint for clash api
      if (endpoints[i].clashApi) {
        base = Constant.env.api.clashApi;
      }
      createResourceObject(endpoints[i].name, base + endpoints[i].endpoint);
    }
  }

  setAPIData();

  return apiData;
});
