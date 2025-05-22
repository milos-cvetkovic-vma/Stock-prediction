const mongoose = require('mongoose');
const { z } = require('zod');
const { fromZodError } = require('zod-validation-error');
const predictionModel = require('../models/predictionModel');

// Creating Schema for validation
const predictionSchema = z.object({
  stock: z
    .string()
    .min(1, { message: 'Stock symbol must be at least 1 character long' })
    .max(5, { message: 'Stock symbol must be at most 5 characters long' }),
  price_Prediction: z
    .string()
    .refine((val) => ['up', 'down'].includes(val.toLowerCase()), {
      message: 'Prediction must be either "up" or "down"',
    }),
  comment: z
    .string()
    .max(100, { message: 'Comment must be at most 100 characters long' })
    .optional(),
});

// sending to predictions.js ... replacing an argument in router.get()

// GET all predicitons
const getPredictions = async (req, res) => {
  const user_id = req.user._id;
  const { email } = req.user;
  let predictions = [];

  if (email === 'admin@gmail.com') {
    predictions = await predictionModel.find({}).sort({ createdAt: -1 });
  } else {
    predictions = await predictionModel
      .find({ user_id })
      .sort({ createdAt: -1 }); // must send empty obj. as arg. if want to filter, pass the argument npr. stock : MSFT, sort -1 za descending order *newest on the top.
  }
  if (predictions.length === 0) {
    res.status(200).json({ message: 'There are no predictions !' });
  } else {
    res.status(200).json(predictions, user_id);
  }
};

// GET single prediciton
const getPrediction = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No stock with that ID' });
  }

  const prediction = await predictionModel.findById(id); // must send empty obj. as arg. if want to filter, pass the argument npr. stock : MSFT, sort -1 za descending order *newest on the top.

  if (!prediction) {
    return res.status(404).json({ error: 'No stock with that ID' });
  }

  res.status(200).json(prediction);
};

// Create a new prediction
const createPrediction = async (req, res) => {
  const { stock, price_Prediction, comment } = req.body;

  const emptyFields = [];
  if (!stock) {
    emptyFields.push('stock');
  }
  if (!price_Prediction) {
    emptyFields.push('price_Prediction');
  }
  if (emptyFields.length > 0) {
    res.status(400).json({
      error: 'Please fill both stock and price action fields!',
      emptyFields,
    });
  }

  // Validation
  const predictionData = { stock, price_Prediction, comment };
  const validationData = predictionSchema.safeParse(predictionData); //

  if (validationData.success) {
    console.log('Good validation!');
  } else {
    const formattedError = fromZodError(validationData.error); // full error
    console.log(formattedError);
    res.status(400).json({ error: `Wrong input!, ${formattedError.message}` });
    return;
  }

  // Creating a new document to db
  try {
    const user_id = req.user._id; // we have attached it in middleware
    const prediction = await predictionModel.create({
      stock,
      price_Prediction,
      comment,
      user_id,
    }); // this is async
    res.status(200).json(prediction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a single prediction
const deletePrediction = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'No such prediction !' });
  }

  const prediction = await predictionModel.findOneAndDelete({ _id: id });

  if (!prediction) {
    return res.status(404).json({ error: 'No such prediction !' });
  }
  res.status(200).json(prediction);
};

// Delete all predictions
const deleteAllPredictions = async (req, res) => {
  const prediction = await predictionModel.deleteMany();

  if (!prediction) {
    return res.status(404).json({ error: 'No more predictions !' });
  }
  res.status(200).json(prediction);
};

// Update a single prediction
const updatePrediction = async function (req, res) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: 'No such prediction !' });
  }
  const prediction = await predictionModel.findOneAndUpdate(
    { _id: id },
    { ...(req.body || {}) },
  );
  if (!prediction) {
    return res.status(404).json({ error: 'No such prediction !' });
  }
  res.status(200).json(prediction);
};

module.exports = {
  getPredictions,
  getPrediction,
  createPrediction,
  deletePrediction,
  updatePrediction,
  deleteAllPredictions,
};
