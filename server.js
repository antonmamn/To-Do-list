require('dotenv').config();
const express = require('express');
var cors = require('cors')

async function startServer() {
  const app = express();
  app.use(express.json())
  app.use(cors())

  const  Routes = require('./routes/allRoutes');

  app.use(Routes);

  const PORT = process.env.PORT || 8000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
