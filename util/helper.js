const isIP = require('../node_modules/validator/lib/isIP');

const alphabets = '23456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ-_',
    base = alphabets.length;
const NA = "NA";

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

const getRequestingGeoLocation = (req) => {
    return req.geoip.country || isIP(req.ip) ? req.ip : NA;
};

const getRequestingBrowser = (useragent) => {
    return useragent.browser || NA;
};

const getRequestingPlatform = (useragent) => {
    return useragent.platform || NA;
};

const addHttp = (url) => {
    if (!/^(f|ht)tps?:\/\//i.test(url) && url.trim().length !== 0) {
        url = "http://" + url;
    }
    return url;
};

module.exports = {
    encode, decode, getRequestingGeoLocation, getRequestingPlatform, getRequestingBrowser, addHttp
};