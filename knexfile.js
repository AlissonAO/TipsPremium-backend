// Update with your config settings.

module.exports = {
  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './src/database/crawler.sqlite'
  //   },
  //   migrations:{
  //     directory: './src/database/migrations'
  //   },

  // },

  development: {
    client: 'postgresql',
    searchPath: ['knex', 'public'],
    connection: {
      //host: 'tips.chgdctshl9nz.sa-east-1.rds.amazonaws.com', // homol
      //host: 'tips.cqm9b7amos8q.sa-east-1.rds.amazonaws.com', //prod
      host: '31.220.20.161', //prod
      user: 'tips',
      password: 'alisson123',
      database: 'tips',
    },

    debug: false,
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }
};
