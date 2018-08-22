const test = require('tape');
const supertest = require('supertest');
const app = require('../app');

test('Home route returns 200 response', t => {
  supertest(app)
    .get('/')
    .expect(200)
    .end((err, res) => {
      t.error(err, 'Ain\'t no errors here bro');
      t.equals(res.statusCode, 200, 'Response code is 200')
      t.end();
    });
});

test('Bad routes returns 404 response', t => {
  supertest(app)
    .get('/niccageeeeee')
    .expect(404)
    .end((err, res) => {
      t.error(err, 'Ain\'t no errors here bro');
      t.equals(res.statusCode, 404, 'Response is Nic Cage - good job')
      t.end();
    });
});