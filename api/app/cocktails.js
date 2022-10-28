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

router.get('/', auth, async (req, res) => {
    const query = {};
    query.published = req.query.published;

    try {
        const token = req.get('Authorization');
        const user = await User.findOne({token});

        if (user && user.role === 'admin') {
            delete query.published;
        }
        let cocktails;

        if (user && user.role === 'user') {
            cocktails = await Cocktail.find({$and: [{published: true}, {user: user._id}]});
        } else {
            cocktails = await Cocktail
                .find().populate('user')
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

        const cocktail = await Cocktail.findOne({$or: [{$and: [{user: user._id}, {_id: id}]}, query]});

        if (!cocktail) {
            return res.status(404).send({message: 'Cocktail not found!'});
        }

        res.send(cocktail);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    const {title, recipe, ingredients} = req.body;

    const cocktailData = {
        title,
        recipe,
        ingredients: JSON.parse(ingredients),
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

router.patch('/rate/:id', auth, permit('user', 'admin'), async (req, res) => {
    const rate = req.body.rate;

    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send({error: 'ID not valid'});
        }

        let cocktail;

        cocktail = await Cocktail.findById(id);

        if (cocktail.rates.length !== 0) {
            let update = false;
            cocktail.rates.find(rateData => {
                if (rateData.user.equals(req.user._id)) {
                    update = true;
                }
            });

            if (!update) {
                cocktail = await Cocktail.findByIdAndUpdate(
                    {_id: id},
                    {$push: {rates: {user: req.user._id, rate: rate}}},
                    {returnDocument: "after"}
                );
            } else {
                await Cocktail.findByIdAndUpdate({_id: id}, {$pull: {rates: {user: req.user._id}}});
                cocktail = await Cocktail.findByIdAndUpdate(
                    {_id: id},
                    {$push: {rates: {user: req.user._id, rate: rate}}},
                    {returnDocument: "after"}
                );
            }
        } else {
            cocktail = await Cocktail.findByIdAndUpdate(
                {_id: id},
                {$push: {rates: {user: req.user._id, rate: rate}}},
                {returnDocument: "after"}
            );
        }

        if (!cocktail) {
            return res.status(404).send({message: "Cocktail not found!"});
        }

        if (cocktail.rates.length !== 0) {
            let sumRating = 0;
            cocktail.rates.forEach(rate => {
                sumRating += rate.rate;
            });

            await Cocktail.findByIdAndUpdate({_id: id}, {rating: sumRating / cocktail.rates.length});
        }

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

        const cocktail = await Cocktail.findByIdAndUpdate(id, req.body);

        if (!cocktail) {
            return res.status(404).send({message: "Cocktail not found!"});
        }

        res.send(cocktail);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({message: 'ID not valid'});
    }

    try {
        const cocktail = await Cocktail.findByIdAndDelete(id);

        if (!cocktail) {
            return res.status(404).send({message: "Cocktail not found!"});
        }

        res.send(cocktail);
    } catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router;