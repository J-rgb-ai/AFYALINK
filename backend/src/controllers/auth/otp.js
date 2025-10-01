const crypto = require('crypto');

module.exports = {

    genotp(length = 6) {
        return crypto.randomInt(0, Math.pow(10,length)).toString().padStart(length,'0');

    },

    verotp(input,actual){
        return input === actual;
    }


};