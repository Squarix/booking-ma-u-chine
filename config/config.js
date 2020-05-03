module.exports = {
  development: {
    username: 'admin',
    password: 'admin',
    database: 'cp_development',
    host: '127.0.0.1',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  },
  test: {
    username: 'admin',
    password: 'admin',
    database: 'cp_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'admin',
    password: 'admin',
    database: 'cp_production',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
