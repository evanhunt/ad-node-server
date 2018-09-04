const ad = require('../connectAD');

module.exports = {
    getGroup: async(req, res) => {
        const name = req.query.name === ''
            ? undefined
            : req.query.name;
        ad.group(name).get()
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.status(500).json({
                    errorMsg: 'get group error.',
                    SystemError: err
                });
            })
    },
    createGroup: async(req, res) => {
        if (req.body && req.body.name) {
            const body = req.body;
            const name = body.name;
            return ad.group().add(body)
                .then(() => {
                    res.json({
                        status: true,
                        massage: `create group ${name} success.`
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        errorMsg: 'create group error.',
                        SystemError: err
                    });
                })
        }
        res.status(400).json({
            errorMsg: 'please check params name.'
        });
    },
    existsGroup: async(req, res) => {
        const name = req.query.name === ''
            ? undefined
            : req.query.name;
        ad.group(name).exists()
            .then((result) => {
                res.json({
                    status: result
                });
            })
            .catch((err) => {
                res.status(500).json({
                    errorMsg: 'check group exists error.',
                    SystemError: err
                });
            })
    },
    removeGroup: async(req, res) => {
        if (req.body && req.body.name) {
            const body = req.body;
            const name = body.name;
            return ad.group(name).remove()
                .then(() => {
                    res.json({
                        status: true,
                        massage: `remove group ${name} success.`
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        errorMsg: 'remove group error.',
                        SystemError: err
                    });
                })
        }
        res.status(400).json({
            errorMsg: 'please check params name.'
        });
    },
    addUser: async(req, res) => {
        if (req.body && req.body.gname && req.body.uname) {
            const body = req.body;
            const gname = body.gname;
            const uname = body.uname;
            return ad.group(gname).addUser(uname)
                .then(() => {
                    res.json({
                        status: true,
                        massage: `add ${uname} in group ${gname} success.`
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        errorMsg: 'users is exits in group.',
                        SystemError: err
                    });
                })
        }
        res.status(400).json({
            errorMsg: 'please check params.'
        });
    },
    removeUser: async(req, res) => {
        if (req.body && req.body.gname && req.body.uname) {
            const body = req.body;
            const gname = body.gname;
            const uname = body.uname;
            return ad.group(gname).removeUser(uname)
                .then(() => {
                    res.json({
                        status: true,
                        massage: `remove ${uname} in group ${gname} success.`
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        errorMsg: 'remove users in group error.',
                        SystemError: err
                    });
                })
        }
        res.status(400).json({
            errorMsg: 'please check params.'
        });
    }
};
