const AD = require('../plugins/ad'); // 对第三方包进行了修改

const ad = new AD({
    url: "ldaps://ad-ip-address",
    user: "user name",
    pass: "user password"
});

ad.cache(false);

module.exports = ad;
