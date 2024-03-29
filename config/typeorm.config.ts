import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
  migrations: [__dirname + '/../migrations/*.{js,ts}'],
  cli: {
    migrationsDir: __dirname + '/../db/migrations',
  },
 
};

// export const typeOrmConfig = () => {
//   console.log(dbConfig);
//   return {
//     type: dbConfig.type,
//     host: process.env.RDS_HOSTNAME || dbConfig.host,
//     port: process.env.RDS_PORT || dbConfig.port,
//     username: process.env.RDS_USERNAME || dbConfig.username,
//     password: process.env.RDS_PASSWORD || dbConfig.password,
//     database: process.env.RDS_DB_NAME || dbConfig.database,
//     entities: [__dirname + '/../entities/*.entity.{js,ts}'],
//     synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
//     migrations: [__dirname + '/../migrations/*.{js,ts}'],
//     cli: {
//       migrationsDir: __dirname + '/../db/migrations',
//     },
//   }

// };
