export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  database: {
    uri: process.env.MONGO_DB_URI,
  },
});
