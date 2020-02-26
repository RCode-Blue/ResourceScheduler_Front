const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  // app.use( "/api",      proxy({ target: "http://127.0.0.1:8000", changeOrigin: true }));
  // app.use( "/rest-auth/*", proxy({ target: "http://127.0.0.1:8000" }));

  app.use( "/api",         proxy({ target: "https://serene-dusk-06086.herokuapp.com", changeOrigin: true }));
  app.use( "/rest-auth", proxy({ target: "https://serene-dusk-06086.herokuapp.com" }));
  // https://serene-dusk-06086.herokuapp.com

  // app.use(
  //   "/api/rest-auth/login/",
  //   proxy({
  //     target: "http://localhost:8000/"
  //   })
  // );
};