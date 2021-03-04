import {Sequelize} from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'sc_admin_proto1',
  port: 5432,
  password: "1234",
  username: "pasannissanka",
  models: [__dirname + '/models'],
});