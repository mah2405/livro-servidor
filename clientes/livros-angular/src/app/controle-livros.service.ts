import { Injectable } from '@angular/core';
import Livro from './livro';

interface LivroMongo {
  _id: string;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

@Injectable()
export class ControleLivrosService {
  private baseURL = 'http://localhost:3030/livros';

  obterLivros(): Promise<Array<Livro>> {
    return fetch(this.baseURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao obter os livros:');
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        return data.map((livro: LivroMongo) => ({
          codigo: livro._id,
          codEditora: livro.codEditora,
          titulo: livro.titulo,
          resumo: livro.resumo,
          autores: livro.autores,
        }));
      } else {
        console.error('Erro ao obter os livros: resposta não é um array', data);
        return [];
      }
    })
    .catch((error) => {
      console.error('Erro ao obter os livros', error);
      return [];
    });
  }

  excluir(codigo: string): Promise<boolean> {
    return fetch(`${this.baseURL}/${codigo}`, {
      method: 'DELETE',
    })
    .then((response) => {
      if (response.status === 200) {
        return response.json().then((data) => data.ok);
      } else {
        console.error('Erro ao excluir o livro. Status:', response.status);
        return false;
      }
    })
    .catch((error) => {
      console.error('Erro ao excluir livros:', error);
      return false;
    });
  }

  incluir(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = {
      _id: '',
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores,
    };

    return fetch(this.baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livroMongo),
    })
    .then((response) => response.json().then((data) => data.ok))
    .catch((error) => {
      console.error('Erro ao incluir o livro:', error);
      return false;
    });
  }
}
