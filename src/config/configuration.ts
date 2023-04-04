export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.PORT ? parseInt(process.env.PORT) : 3306,
  },
});
