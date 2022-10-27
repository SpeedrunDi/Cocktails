const path = require("path");
const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');

const Cocktail = require("../models/Cocktail");
const config = require('../config');
const auth = require("../middleware/auth");
const User = require("../models/User");
const permit = require("../middleware/permit");

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
  query.published = true;

  try {
    const token = req.get('Authorization');
    const user = await User.findOne({token});

    if (user && user.role === 'admin') {
      delete query.published;
    }
    let cocktails;

    if (!user) {
      cocktails = await Cocktail.find(query);
    } else {
      cocktails = await Cocktail
        .find({$or: [query, {user: user._id}]})
        .sort({published: 1});
    }

    res.send(cocktails);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/my_cocktails', auth, async (req, res) => {
  try {
    const cocktails = await Cocktail
      .find({user: req.user._id})
      .sort({published: 1});

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
    const token = req.get('Authorization');
    const user = await User.findOne({token});

    if (user && user.role === 'admin') {
      delete query.published;
    }

    let cocktail;

    if (!user) {
      cocktail = await Cocktail.findOne(query);
    } else {
      cocktail = await Cocktail.findOne({$or: [{$and: [{user: user._id}, {_id: id}]}, query]});
    }

    if (!cocktail) {
      return res.status(404).send({message: 'Cocktail not found!'});
    }

    res.send(cocktail);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/new_cocktail', auth, upload.single('image'), async (req, res) => {
  const {title, recipe, ingredients} = req.body;

  const cocktailData = {
    title,
    recipe,
    ingredients,
    user: req.user._id
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

router.patch('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send({error: 'ID not valid'});
    }

    const cocktail = await Cocktail.findOneAndUpdate({
      _id: id
    }, {
      published: true
    }, {
      returnDocument: 'after',
    });

    if (!cocktail) {
      return res.status(404).send({message: "Cocktail not found!"});
    }

    res.send(cocktail);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({message: 'ID not valid'});
  }

  try {
    const cocktail = await Cocktail.findOneAndDelete({
      _id: id
    });

    if (!cocktail) {
      return res.status(404).send({message: "Cocktail not found!"});
    }

    res.send(cocktail);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;