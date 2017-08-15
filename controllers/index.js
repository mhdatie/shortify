const LinkSchema = require('../models/link');
const AnalyticsSchema = require('../models/analytics');
const isUrl = require('../node_modules/validator/lib/isURL');
const _h = require('../util/helper');

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
                const code = _h.encode(doc._id);
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
        const id = _h.decode(req.params.code);

        const update = { $inc: { hits: 1 } };

        LinkSchema.findByIdAndUpdate(id, update, (err, link) => {
           if(err) {
               return res.status(500).json({ message: 'Internal Server Error', error: err });
           }

           if(link === null) return res.status(404).json({ message: 'Resource Not Found' });

           const analytics = new AnalyticsSchema({
               urlId: link._id,
               geo: _h.getRequestingGeoLocation(req),
               browser: _h.getRequestingBrowser(req.useragent),
               platform: _h.getRequestingPlatform(req.useragent)
           });

           analytics.save((err, doc) => {
               if(err) {
                   return res.status(500).json({ message: 'Internal Server Error', error: err });
               }

               if(doc) {
                   res.status(302).redirect(_h.addHttp(link.url));
               }
           });

        });
    }
};

module.exports = {
    saveUrl,
    getUrl
};