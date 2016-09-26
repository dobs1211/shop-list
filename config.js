exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                         'mongodb://dobs1211:Bre121195@ds021166.mlab.com:21166/travis-ci' :
                            'mongodb://localhost/shop-list');
exports.PORT = process.env.PORT || 8080;