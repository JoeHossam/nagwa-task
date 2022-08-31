const server = require('./app');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

const mustHaves = ['adjective', 'adverb', 'noun', 'verb'];

afterAll((done) => {
    done();
});

describe('Word Endpoint', () => {
    it('GET /word should return 10 words', async () => {
        const res = await requestWithSupertest.get('/word');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('words');
        expect(res.body.words.length).toBe(10);
    });

    it('GET /word should return at least 1 of each part of speech', async () => {
        const res = await requestWithSupertest.get('/word');
        for (let i = 0; i < mustHaves; i++) {
            expect(res.body.words).toContain(mustHaves[i]);
        }
    });
});

describe('Rank Endpoint', () => {
    it('score 90', async () => {
        const res = await requestWithSupertest.post('/rank').send('score=90');
        expect(res.body.rank).toBe(80);
    });
    it('score 60', async () => {
        const res = await requestWithSupertest.post('/rank').send('score=60');
        expect(res.body.rank).toBe(56.67);
    });
    it('score 50', async () => {
        const res = await requestWithSupertest.post('/rank').send('score=50');
        expect(res.body.rank).toBe(40);
    });
});
