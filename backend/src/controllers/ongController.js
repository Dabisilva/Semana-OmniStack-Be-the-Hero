const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },
    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body; //desestruturação dentro de chavez para cada umdos dados fcar em variaveis separadas
    
    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({ //cria um insert de banco de dados e uma conexão com ele, com os dados a serem colocados 
        id, 
        name,
        email,
        whatsapp,
        city,
        uf,
    })
    
    return response.json({ id });
    }
}