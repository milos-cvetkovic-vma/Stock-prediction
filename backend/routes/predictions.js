const express = require("express");
//creating the router
const router = express.Router();
const predictionModel = require('../models/predictionModel');
const {getPredictions, getPrediction, createPrediction, 
    deletePrediction, updatePrediction, deleteAllPredictions} = require('../controllers/predictionController');
const {requireAuth} = require('../middleware/requireAuth');

//middleware for every req to check before controllers if user is auth, if req has jwt and is unchanged.
// require Auth for all prediction routes 
router.use(requireAuth);

//putanja je u server.js definisana sa /api/predictions, a ovde u putanji dodajemo na to.
//GET all predicitons
router.get('/', getPredictions);

//GET single prediciton
router.get('/:id', getPrediction);

//POST new prediciton
router.post('/', createPrediction);

//DELETE a prediciton
router.delete('/:id', deletePrediction);

//DELETE all predicitons
router.delete('/', deleteAllPredictions);

//UPDATE a prediciton
router.patch('/:id',updatePrediction);


module.exports = router