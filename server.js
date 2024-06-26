const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const studentRoutes = require('./routes/student.routes');
const db = require('./models');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api', studentRoutes);

// Sync database
db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized.');
  })
  .catch(err => {
    console.error('Failed to synchronize database:', err);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
