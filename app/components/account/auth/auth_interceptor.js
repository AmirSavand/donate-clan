"use strict";

app.factory("AuthInterceptor", function ($rootScope, $q, ENV) {

  /**
   * @name request
   * @desc Automatically attach Authorization header
   *
   * @param config {object}
   *
   * @returns {object}
   */
  function request(config) {
    var token =  localStorage.getItem("JWT");

    if (config.url.indexOf(ENV.ROYALECLAN) === 0 && token) {
      config.headers.Authorization = "JWT " + token;
    }

    return config;
  }

  /**
   * @name responseError
   * @desc Handler for http response
   *
   * @param response {object}
   *
   * @return {object}
   */
  function responseError(response) {
    if (response.status === 403) {
      $rootScope.$broadcast("royaleClan.Auth:unAuth");
    }
    return $q.reject(response);
  }

  return {
    request: request,
    responseError: responseError
  };
});
