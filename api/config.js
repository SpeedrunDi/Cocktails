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
        appId: '1054295838568454',
        appSecret: process.env.FACEBOOK_APP_SECRET
    },
};