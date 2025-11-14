const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./dbConfig/db');

const {
  getGroceries,
  createGrocery,
  updateGrocery,
  deleteGrocery
} = require('./controllers/groceryController');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

const groceryRouter = express.Router();
app.use('/groceries', groceryRouter);

groceryRouter.get('/', getGroceries, (req, res) => {
  return res.status(200).json(res.locals.groceries);
});

groceryRouter.post('/', createGrocery, (req, res) => {
  return res.status(201).json(res.locals.newGrocery);
});

groceryRouter.put('/:id', updateGrocery, (req, res) => {
  return res.status(200).json(res.locals.updatedGrocery);
});

groceryRouter.delete('/id', deleteGrocery, (req, res) => {
  return res.status(200).json(res.locals.deletedGrocery);
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));