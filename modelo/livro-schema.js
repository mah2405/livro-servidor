const banco = require('./conexao');
const mongoose = require('mongoose')

const LivroSchema = new moongose.Schema({
    _id: {
        type: banco.Schema.Types.ObjectId,
    },
    titulo: {
        type: String,
        require: true,
    },
    codEditora: {
        type: Number,
        require: true,
    },
    resumo: {
        type: String,
        require: true,
    },
    autores: {
        type: [String],
        require: true,
    },
});

const Livro = banco.model('Livro', LivroSchema, 'livros');

module.exports = Livro;