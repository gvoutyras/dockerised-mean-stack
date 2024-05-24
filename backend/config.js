module.exports = {
  database: {
    port: 27017,
    username: "root",
    password: "alpine",
    name: "bandbeat",
    authSrc: "admin",
    host: process.env.DB_HOST || "127.0.0.1",
  },
  backendPort: 3000,
};
