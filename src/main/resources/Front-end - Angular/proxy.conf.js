module.exports = {
  "/api": {
    target: "http://localhost:8080",
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  },
  "/usuarios": {
    target: "http://localhost:8080",
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  },
  "/sindico/api": {
    target: "http://localhost:8080",
    secure: false,
    logLevel: "debug",
    changeOrigin: true
  }

};