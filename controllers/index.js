const LinkSchema = require('../models/link');
const isUrl = require('../node_modules/validator/lib/isURL');

const alphabets = '23456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ-_',
    base = alphabets.length;

/**
 * Saves the link to the database and returns a shortened one
 *
 * @param req URL to save and shorten
 * @param res Shortened URL and other resource information
 */
const saveUrl = (req, res) => {
    if(req.body.url && isUrl(req.body.url)){
        const link = new LinkSchema(req.body);
        link.save((err, doc) => {
            if(err) {
                return res.status(500).json({ message: 'Internal Server Error', error: err });
            }

            if(doc) {
                const code = encode(doc._id);
                res.status(201).json({
                    code: code,
                    link: req.protocol + '://' + req.get('host') + '/' + code
                });
            }

        });
    } else {
        res.status(400).json({ message: 'Bad request: url is undefined or not formatted properly'});
    }
};

/**
 * Takes the code, decodes it, and searches
 * the database for the record to redirect user
 *
 * @param req link code as request parameter
 * @param res URL
 */
const getUrl = (req, res) => {
    if(req.params.code){
        const id = decode(req.params.code);

        // todo extend with query params to include other metadata
        const projection =
            { _id: false, url: true }; // only return URL in payload

        LinkSchema.findById(id, projection, (err, link) => {
           if(err) {
               return res.status(500).json({ message: 'Internal Server Error', error: err });
           }

           if(link === null) return res.status(404).json({ message: 'Resource Not Found' });

           res.status(200).json(link);
        });
    }
};

/**
 * Taken from
 * https://github.com/delight-im/ShortURL/blob/master/JavaScript/ShortURL.js
 *
 * @param num
 * @returns returns shortened code that maps to the database
 */
const encode = (num) => {
    let code = '';
    while (num > 0) {
        code = alphabets.charAt(num % base) + code;
        num = Math.floor(num / base);
    }
    return code;
};

/**
 * Taken from
 * https://github.com/delight-im/ShortURL/blob/master/JavaScript/ShortURL.js
 *
 * @param code
 * @returns ID in database
 */
const decode = (code) => {
    let num = 0;
    for (let i = 0; i < code.length; i++) {
        num = num * base + alphabets.indexOf(code.charAt(i));
    }
    return num;
};

module.exports = {
    saveUrl,
    getUrl
};