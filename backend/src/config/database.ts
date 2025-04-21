import { Sequelize } from 'sequelize';
import path from 'path';

// Create SQLite database connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
  logging: false // Disable logging SQL queries
});

export default sequelize; 