// const async = require('async');

const _replaceObj = (result) => {
    const newResult = {};
    for (let key of Object.keys(result)) {
        switch (key) {
            case 'sAMAccountName':
                newResult.userName = result[key];
                break;
            case 'cn':
                newResult.commonName = result[key];
                break;
            case 'employeeID':
                newResult.employeeID = result[key];
                break;
            case 'telephoneNumber':
                newResult.phone = result[key];
                break;
            case 'mail':
                newResult.email = result[key];
                break;
            case 'dn': {
                const fragment = result[key].split(',DC')[0];
                if (!fragment.split(`CN=${result.cn},`)[1]) break;
                const location = result[key].split(',DC')[0].split(`CN=${result.cn},`)[1].split('OU=').slice(1, 4);
                newResult.location = [].concat(location.reverse());
                break;
            }
            default:
                newResult[key] = result[key]
        }
    }
    return newResult;
}

const _returnNewArr = (result) => {
    const arr = [];
    result.forEach((item) => {
        arr.push(_replaceObj(item))
    });
    return arr;
}

const returNewResult = (result) => {
    if (Array.isArray(result)) {
        return _returnNewArr(result);
    }
    return _replaceObj(result);
}


module.exports = returNewResult;
