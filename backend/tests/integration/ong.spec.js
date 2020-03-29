const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => { //antes de cada teste
        await connection.migrate.latest();
        await connection.migrate.rollback();
    })
    afterAll(()=>{  //depois de todos os testes
        connection.destroy();
    })
    it('Shold be able to crate a new ONG', async () =>{
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "APAIDEV",
            email: "contato@apad.com.br",
            whatsapp: "4002892243",
            city: "Rio do Sul",
            uf: "SC"
        })

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
});