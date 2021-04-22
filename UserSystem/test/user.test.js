const chai = require('chai');
const chaihttp = require('chai-http');
const server = require('../app');

//Assertion style
chai.should();

chai.use(chaihttp);

describe('User Api', () => {
    /**
     * Login api 
     */
    describe('Login Post /api/login', () => {
        it('its take user email and password', (done) => {
            chai.request(server)
                .post('/api/login')
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    })

    /**
     * signup api 
     */

    /**
     * getalluser api 
     */

    /**
     * update user api 
     */

    /**
     * delete user api 
     */
})