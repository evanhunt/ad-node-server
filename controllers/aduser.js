'use strict';
// const Joi = require('Joi');
const ad = require('../connectAD');
const returNewResult = require('../models/aduser');
// const {schemaObj, chemaName} = require('../models/ADUsers');

/**
 * [查找用户]
 * @param  {[type]} userName [sAMAccountName]
 * @return {[type]}          [user Object]
 */
const _findUser = async (userName) => {
    userName = String(userName || '');
    return new Promise(async (resolve, reject) => {
        ad.user(userName).get()
            .then((res) => {
                if (Object.keys(res).length === 0) return resolve({});

                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

/**
 * [启用用户]
 * @return {Promise} [true]
 */
const _enable = async (SANName) => {
    return new Promise(async (resolve, reject) => {
        ad.user(SANName).enable()
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
    });
}

/**
 * [创建新用户]
 * @param  {[type]} userObj [user Object]
 * @return {[type]}         [true]
 */
const _createdUser = async (userObj) => {
    return new Promise(async (resolve, reject) => {
        ad.user().add(userObj)
            .then((res) => {
                if (Object.keys(res).length === 0) return reject('create user error.');
                return res.sAMAccountName;
            })
            .then((sAMAccountName) => {
                _enable(sAMAccountName)
                    .then((enableRes) => {
                        resolve(enableRes);
                    })
                    .catch((err) => {
                        reject({
                            errorMsg: 'create user success, but enable user error.',
                            SystemError: err
                        });
                    })
            })
            .catch((err) => {
                reject(err);
            })
    });
}

/**
 * [根据用户名更新用户信息]
 * @param  {[type]}  userName [sAMAccountName]
 * @param  {[type]}  options  [更新内容]
 * @return {Promise}          [true]
 */
const _updateUser = async (userName, options) => {
    return new Promise(async (resolve, reject) => {
        ad.user(userName).update(options)
            .then(() => {
                resolve();
            })
            .catch((err) => {
                reject(err);
            })
    });
}

module.exports = {
    /**
     * 获取用户信息
     * 如果通过用户名返回个人信息
     * 否则返回所有
     * 此处要修改
     * @return {[type]}     [user Object]
     */
    getUsers: async (req, res) => {
        const userName = req.query.userName === ''
            ? undefined
            : req.query.userName;
        ad.user(userName).get()
            .then((results) => {
                if (Object.keys(results).length === 0) {
                    return res.json({
                        message: 'User does not find.'
                    });
                }
                console.log(results);
                const newResult = returNewResult(results);
                res.json(newResult);
            })
            .catch((err) => {
                res.status(500).json({
                    errorMsg: 'get user error.',
                    SystemError: err
                });
            })
    },

    /**
     * 如果是新用户就创建
     * 如果用户存在就更新
     * @return {[type]}     [true]
     */
    createUser: async (req, res) => {
        if (req.body && req.body.userName) {
            const body = req.body;
            const userName = body.userName;
            console.log(body);
            return _findUser(userName)
                .then((result) => {
                    return Object.keys(result).length;
                })
                .then((length) => {
                    if (length === 0) {
                        return _createdUser(body)
                            .then(() => {
                                res.json({
                                    status: true,
                                    massage: `create user ${userName} success.`
                                });
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    errorMsg: `create user ${userName} error.`,
                                    SystemError: err
                                });
                            })
                    }
                    _updateUser(userName, body)
                        .then(() => {
                            res.json({
                                status: true,
                                message: `update user ${userName} success.`
                            });
                        })
                        .catch((err) => {
                            res.status(500).json({
                                errorMsg: `update ${userName} error.`,
                                SystemError: err
                            });
                        })
                })
                .catch((err) => {
                    res.status(500).json({
                        errorMsg: 'create user error.',
                        SystemError: err
                    });
                })
        }
        res.status(400).json({
            errorMsg: 'please check params userName.'
        });
    },

    /**
     * [启用用户]
     * @return {Promise} [true]
     */
    enableUser: async (req, res) => {
        if (req.body && req.body.userName) {
            const body = req.body;
            const userName = body.userName;
            return _findUser(userName)
                .then((findResult) => {
                    if (Object.keys(findResult).length != 0) {
                        return ad.user(userName).enable()
                            .then(() => {
                                res.json({
                                    status: true,
                                    massage: `enable user ${userName} success.`
                                });
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    errorMsg: `enable user ${userName} error.`,
                                    SystemError: err
                                });
                            })
                    }
                    res.json({
                        message: 'User does not find.'
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        errorMsg: 'enable user,but find user error.',
                        SystemError: err
                    });
                })
        }
        res.status(400).json({
            errorMsg: 'please check params userName.'
        });
    },

    /**
     * [禁用用户]
     * @return {Promise} [true]
     */
    disableUser: (req, res) => {
        if (req.body && req.body.userName) {
            const body = req.body;
            const userName = body.userName;
            return _findUser(userName)
                .then((findResult) => {
                    if (Object.keys(findResult).length != 0) {
                        return ad.user(userName).disable()
                            .then(() => {
                                res.json({
                                    status: true,
                                    massage: `disable user ${userName} success.`
                                });
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    errorMsg: `disable user ${userName} error.`,
                                    SystemError: err
                                });
                            })
                    }
                    res.json({
                        message: 'User does not find.'
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        errorMsg: 'disable user,but find user error.',
                        SystemError: err
                    });
                })
        }
        res.status(400).json({
            errorMsg: 'please check params userName.'
        });
    },

    removeUser: (req, res) => {
        if (req.body && req.body.userName) {
            const body = req.body;
            const userName = body.userName;
            return _findUser(userName)
                .then((findResult) => {
                    if (Object.keys(findResult).length === 0) {
                        return res.json({
                            status: false,
                            massage: `user ${userName} does not find.`
                        });
                    }
                    ad.user(userName).remove()
                        .then((removeResults) => {
                            res.json(removeResults);
                        })
                        .catch((err) => {
                            res.status(500).json({
                                errorMsg: `remove ${userName} error.`,
                                SystemError: err
                            });
                        })
                })
                .catch((err) => {
                    res.status(500).json({
                        errorMsg: 'remove user,but find user error.',
                        SystemError: err
                    });
                })
        }
        res.status(400).json({
            errorMsg: 'please check params userName.'
        });
    }
};
