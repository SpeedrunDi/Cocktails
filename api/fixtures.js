const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');

const User = require('./models/User');
const Cocktail = require('./models/Cocktail');

const run = async () => {
  await mongoose.connect(config.mongo.db);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [admin, user] = await User.create({
    email: 'admin@gmail.com',
    password: 'admin',
    token: nanoid(),
    role: 'admin',
    displayName: 'Admin',
    avatar: 'fixtures/admin.jpeg',
  }, {
    email: 'user@gmail.com',
    password: 'user',
    token: nanoid(),
    role: 'user',
    displayName: 'User',
    avatar: 'fixtures/user.jpeg',
  });


  await Cocktail.create({
    title: "Long Island Iced Tea",
    user: user._id,
    image: 'fixtures/long_island.jpeg',
    recipe: 'Add the vodka, rum, tequila, ' +
      'gin, triple sec, simple syrup and lemon ' +
      'juice to a Collins glass filled with ice.' +
      ' Top with a splash of the cola and stir briefly. ' +
      'Garnish with a lemon wedge. Serve with a straw.',
    published: true,
    ingredients: [
      {name: 'white rum', amount: '15 ml'},
      {name: 'tequila', amount: '15 ml'},
      {name: 'vodka', amount: '15 ml'},
      {name: 'triple sec', amount: '15 ml'},
      {name: 'gin', amount: '15 ml'},
      {name: 'sour mix', amount: '30 ml'},
      {name: 'cola', amount: '50 ml'},
      {name: 'lime', amount: '2 slices'},
    ],
    rates: [
      {user: admin._id, rate: 5}
    ],
    rating: 5
  }, {
    title: "Whiskey & Coke",
    user: user._id,
    image: 'fixtures/whiskey_coke.jpeg',
    recipe: 'Add the whiskey into a double rocks ' +
      'glass over one large ice cube or a highball glass ' +
      'filled with ice. Top with the cola and stir briefly and ' +
      'gently to combine. Garnish with a lemon twist, if desired',
    published: false,
    ingredients: [
      {name: 'whiskey', amount: '2 ounces'},
      {name: 'Coca-Cola', amount: '4 to 6 ounces'},
      {name: 'lemon twist', amount: 'optional'},
    ],
    rates: [
      {user: admin._id, rate: 3},
      {user: user._id, rate: 4}
    ],
    rating: 3.5
  });



  await mongoose.connection.close();
};

run().catch(console.error);