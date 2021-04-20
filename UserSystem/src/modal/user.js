const crypto = require("crypto");

module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        hash: {
            type: Sequelize.STRING
        },
        salt: {
            type: Sequelize.STRING
        },
        isVerified: {
            type: Sequelize.Boolean,
            default: false
        },
        resetPasswordToken: {
            type: Sequelize.STRING,
            required: false
        },
        resetPasswordExpires: {
            type: Sequelize.Date,
            required: false
        },
    }, {
        freezeTableName: true,
        instanceMethods: {
            setPassword = function (password) {
                this.salt = crypto.randomBytes(16).toString('hex');
                console.log(password);
                this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
                console.log(this.hash);
            },

            validPassword = function (password) {
                var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
                return this.hash === hash;
            }
        }
    });
    return user;
};