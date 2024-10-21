const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
const db = require('./models');

dotenv.config();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected...');
    server.listen(PORT, () => {
      console.log(`Server started at PORT: ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    console.error('Database URL:', process.env.DATABASE_URL);
  }
};

startServer();

module.exports = server;
