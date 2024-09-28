const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
const db = require('./models');

dotenv.config();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
//DATABASE_URL=postgresql://vlad1993:VYKrjCyPpRiztiYK93W3Z1TLh6C39XPB@dpg-crff3djqf0us738k30g0-a/base1_3tq5_39mp
//DATABASE_URL=postgresql://postgres:postgres@localhost:5432/baseToWork

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
