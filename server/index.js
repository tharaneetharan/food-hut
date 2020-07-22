import dotenv from 'dotenv';
import { Pool } from 'pg';
import DB from './models/dbModel';
import Order from './models/orderModel';
import server from './server';
import OrdersController from './controllers/ordersController';
import OrdersDBController from './controllers/ordersDBcontroller';
import UsersController from './controllers/usersController';
import MenuController from './controllers/menuController';
import User from './models/userModel';
import Auth from './models/authModel';


// Load .env into process.env
dotenv.config();

let userC = {};
let orderC = {};
let menuC = {};
let connectionString = 'postgres://xgnhpjbgfvzhti:fc5db96c87d898f2686eb9d77704f73e85c8dc83a76125c9fc5ba8359521f160@ec2-34-233-226-84.compute-1.amazonaws.com:5432/dbvgv82lc53ejk';
let ssl = false;

 const pool = new Pool({
    connectionString, ssl: {rejectUnauthorized: false}
  });
  pool.on('connect', () => {
  });

  const db = new DB(pool);
  // db.dropTable('menu');
  // db.dropTable('orders');
  // db.dropTable('users');
  // db.createUsersTable();
  // db.createOrdersTable();
  // db.createMenuTable();

  const auth = new Auth();
  const userM = new User();
  userC = new UsersController(db, userM, auth);
  orderC = new OrdersDBController(db);
  menuC = new MenuController(db);


const app = server(orderC, userC, menuC);
const port = 3000;
app.listen(port, () => console.log('listening at port', port));
//User@123!; admin@foodhut.com;