import {it,beforeAll, afterAll, describe} from 'vitest';
import request from 'supertest';
import {app} from '../src/app';

describe('Transactions Routes', () => {
  beforeAll(async () => {
    await app.ready();
  })
  afterAll (async () => {
    await app.close();
  })

  it('should be able to create a new transaction', async () => {
    const response = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'income'
      })
      .expect(201);
      console.log(response.get('Set-Cookie'));
    })
   it('should be able to list the transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 5000,
        type: 'income'
      })
      .expect(201);    
      const cookies = createTransactionResponse.get('Set-Cookie');
      if (cookies) {
        await request(app.server)
          .get('/transactions')
          .set('Cookie', cookies)
          .expect(200);
      }
   })

})
