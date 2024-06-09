const mongoose = require('mongoose');
const Livro = require('./livro-schema');

const novoLivro = new Livro({
    codEditora: 123,
    titulo: 'Meu Livro Incrível',
    resumo: 'Um livro emocionante sobre...',
    autores: ['Autor 1', 'Autor 2'],
  });
  
  // Salve o livro no banco de dados
  novoLivro.save()
    .then(() => {
      console.log('Livro salvo com sucesso!');
    })
    .catch((erro) => {
      console.error('Erro ao salvar o livro:', erro);
    });

    
const obterLivros = async () => {
    try {
        const livros = await Livro.find();
        return livros;
    } catch (error) {
        console.error('Erro ao obter os livros:', error);
        throw error;
    }
};

const incluir = async (livro) => {
    try {
        const novoLivro = await Livro.create(livro);
        return novoLivro;
    } catch (error) {
        console.error('Erro ao incluir o livro:', error);
        throw error;
    }
};

const excluir = async (codigo) => {
    try {
        const resultado = await Livro.deleteOne({ _id: codigo })
        return resultado;
    } catch (error) {
        console.error('Erro ao excluir o livro:', error);
        throw error;
    }
};

module.exports = {
    obterLivros,
    incluir,
    excluir,
    save,
};