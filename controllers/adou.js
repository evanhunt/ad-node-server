const ad = require('../connectAD');
// const Joi = require('Joi');
// const { schemaObj, chemaName } = require('../models/ADUsers');

/**
 * [查找OU]
 * @type {[type]}
 */

const _findOU = async (name) => {
    return new Promise(async (resolve, reject) => {
        ad.ou(name).exists()
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

/**
 * [创建OU]
 * @param  {[type Object]}
 *{
 *    name: '部门',
 *    location: '部门,OU=部门,OU=公司'
 *}
 * @return {Promise}         [description]
 */

const _createOU = async (options) => {
    return new Promise(async (resolve, reject) => {
        ad.ou().add(options)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

/**
 * [删除OU]
 * @type {[type]}
 */

const _removeOU = async (name) => {
    return new Promise(async (resolve, reject) => {
        ad.ou(name).remove()
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

module.exports = {
    /**
     * [返回OU信息]
     * @return {ou info}
     */

    getOU: async (req, res) => {
        const name = req.query.name === ''
            ? undefined
            : req.query.name;

        ad.ou(name).get()
            .then((result) => {
                res.json({
                    status: true,
                    data: result
                });
            })
            .catch((err) => {
                res.status(500).json({
                    errorMsg: 'find ou error.',
                    SystemError: err
                });
            })
    },

    /**
     * [添加OU]
     * @param  {[type Object]}
     *{
     *    name: '部门',
     *    location: '部门,OU=部门,OU=公司'
     *}
     * @return {Promise}         [description]
     */

    addOU: async (req, res) => {
        if (req.body && req.body.name) {
            const body = req.body;
            const name = body.name;

            return _findOU(name)
                .then((result) => {
                    if (result) {
                        return res.json({
                            status: false,
                            message: `ou ${name} exists.`
                        });
                    }
                    _createOU(body)
                        .then(() => {
                            res.json({
                                status: true,
                                message: `create ou ${name} success.`
                            });
                        })
                        .catch((err) => {
                            res.status(500).json({
                                errorMsg: 'create ou ${name} error.',
                                SystemError: err
                            });
                        })
                })
                .catch((err) => {
                    res.status(500).json({
                        errorMsg: 'create ou ${name}, but find ou error.',
                        SystemError: err
                    });
                })
        }
        res.status(400).json({
            errorMsg: 'please check params ou name.'
        });
    },

    /**
     * [查看OU状态]
     * @param  {[type]} name [string]
     * @return {[type]}        [bool]
     */
    existsOU: async (req, res) => {
        if (req.query && req.query.name) {
            const name = req.query.name === ''
                ? undefined
                : req.query.name;

            return _findOU(name)
                .then((findResult) => {
                    res.json({
                        status: findResult
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        errorMsg: 'exists ou,but find ou error.',
                        SystemError: err
                    });
                })
        }
        res.status(400).json({
            errorMsg: 'please check query ou name.'
        });
    },

    /**
     * [removeOU description]
     */
    removeOU: async (req, res) => {
        if (req.body && req.body.name) {
            const body = req.body;
            const name = body.name;

            return _findOU(name)
                .then((result) => {
                    if (result) {
                        return _removeOU(name)
                            .then((removeResult) => {
                                res.json({
                                    status: removeResult
                                });
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    errorMsg: 'remove ou error.',
                                    SystemError: err
                                });
                            })
                    }
                    res.json({
                        message: 'remove ou,but ou don\'t exists.'
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        errorMsg: 'remove ou,but find ou error.',
                        SystemError: err
                    });
                })
        }
        res.status(400).json({
            errorMsg: 'please check params ou name.'
        });
    }
};
