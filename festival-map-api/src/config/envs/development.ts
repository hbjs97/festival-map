export const config = {
  db: {
    type: process.env.DB_TYPE,
    host: process.env.DB_URL,
    port: +process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    extra: {
      connectionLimit: 10,
    },
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    entities: [`${__dirname}/../../entity/*.entity{.ts,.js}`],
    // migrations: [`${__dirname}/../../migration/*.entity{.ts,.js}`],
    // cli: {
    //   entitiesDir: 'src/entity',
    //   migrationsDir: 'src/migration',
    // },
  },
};
