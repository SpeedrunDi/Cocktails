const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/cocktail',
        options: {useNewUrlParser: true},
    },
    facebook: {
        appId: process.env.FACEBOOKID,
        appSecret: process.env.FACEBOOK_SECRET_KEY
    },
};