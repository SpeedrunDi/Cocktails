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
        appSecret: "9fb644de8b3bbf6eb27b87a4722d25db"
    },
};