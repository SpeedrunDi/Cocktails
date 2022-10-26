const path = require("path");
const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');

const Cocktail = require("../models/Cocktail");
const config = require('../config');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});

const upload = multer({storage});

router.get('/', async (req, res) => {
  const query = {};

  query.published = {$eq: true};
  try {
    const cocktails = await Cocktail.find(query);

    res.send(cocktails);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({message: 'ID not valid'});
  }

  const query = {};

  query.published = {$eq: true};

  query._id = id

  try {
    const cocktail = await Cocktail.findOne(query);

    if (!cocktail) {
      return res.status(404).send({message: 'Cocktail not found!'});
    }

    res.send(cocktail);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const {title, recipe, ingredients} = req.body;

  const cocktailData = {
    title,
    recipe,
    ingredients
  };

  if (req.file) cocktailData.image = 'uploads/' + req.file.filename;

  try {
    const cocktail = new Cocktail(cocktailData);

    await cocktail.save();

    res.send(cocktail);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;