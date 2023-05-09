import { AppDataSource, path } from './src/data-source';

module.exports = {
  ...AppDataSource.options,
  cli: {
    migrationsDir: path.resolve('src/database/migrations'),
  },
};
