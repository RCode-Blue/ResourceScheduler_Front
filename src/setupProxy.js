const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use( "/api",       proxy({ target: "https://serene-dusk-06086.herokuapp.com", changeOrigin: true }));
  app.use( "/rest-auth", proxy({ target: "https://serene-dusk-06086.herokuapp.com" }));
};