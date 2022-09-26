const express = require('express');
// require('express-async-errors');

const app = express();
app.use(express.json());

const loginRoutes = require('./routes/login.router');
const userRoutes = require('./routes/user.router');
const categoryRoutes = require('./routes/category.router');
const postRoutes = require('./routes/post.router');

const errorMiddleware = require('./middlewares/error.middleware');

app.use('/login', loginRoutes);
app.use('/user', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/post', postRoutes);

app.use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
