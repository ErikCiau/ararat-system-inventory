export default () => ({
  port: Number(process.env.PORT) || 3000,
  database: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 4321,
    username: process.env.DB_USERNAME || 'erikciau',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'ararat-inventory',
  },
  jwt: {
    secretKey: process.env.JWT_SECRET || 'secret',
    expireIn: process.env.JWT_EXPIREIN || '2d',
  },
});
