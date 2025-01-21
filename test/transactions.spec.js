"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const child_process_1 = require("child_process");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../src/app");
(0, vitest_1.describe)('Transactions Routes', () => {
    (0, vitest_1.beforeAll)(async () => {
        await app_1.app.ready();
    });
    (0, vitest_1.afterAll)(async () => {
        await app_1.app.close();
    });
    (0, vitest_1.beforeEach)(() => {
        (0, child_process_1.execSync)('npm run knex migrate:rollback --all');
        (0, child_process_1.execSync)('npm run knex migrate:latest');
    });
    (0, vitest_1.it)('should be able to create a new transaction', async () => {
        const response = await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send({
            title: 'New Transaction',
            amount: 5000,
            type: 'income'
        })
            .expect(201);
        console.log(response.get('Set-Cookie'));
    });
    (0, vitest_1.it)('should be able to list the transactions', async () => {
        const createTransactionResponse = await (0, supertest_1.default)(app_1.app.server)
            .post('/transactions')
            .send({
            title: 'New Transaction',
            amount: 5000,
            type: 'income'
        })
            .expect(201);
        const cookies = createTransactionResponse.get('Set-Cookie');
        if (cookies) {
            const listTransactionsResponse = await (0, supertest_1.default)(app_1.app.server)
                .get('/transactions')
                .set('Cookie', cookies)
                .expect(200);
            (0, vitest_1.expect)(listTransactionsResponse.body.transactions).toEqual([
                vitest_1.expect.objectContaining({
                    title: 'New Transaction',
                    amount: 5000,
                })
            ]);
        }
    });
});
