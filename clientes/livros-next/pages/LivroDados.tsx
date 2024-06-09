import React, { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Menu } from '@/componentes/Menu';
import { useRouter } from 'next/router';
import ControleEditora from '@/classes/controle/ControleEditora';
import Livro from '@/classes/modelo/Livro';

const LivroDados: React.FC = () => {
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(0);
    const navigate = useRouter();
    const controleEditora: ControleEditora = new ControleEditora();
    const baseURL = 'http://localhost:3000/api/livros';

    const getEditoras = controleEditora.getEditoras.bind(controleEditora);

    const opcoes = getEditoras().map((editora) => {
        return { value: editora.codEditora, text: editora.nome };
    });

    function tratarCombo(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedCodEditora = Number(event.target.value);
        setCodEditora(selectedCodEditora);
    };

    async function incluirLivro(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const novoLivro: Livro = {
            codigo: "",
            codEditora: codEditora,
            titulo: titulo,
            resumo: resumo,
            autores: autores.split('\n'),
        };

        const response = await fetch(baseURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoLivro),
        });
        if (response.ok) {
            navigate.push('/LivroLista');
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Livros Next</title>
            </Head>

            <Menu />

            <main className={styles.main}>
                <form onSubmit={incluirLivro}>
                    <h2>Novo Livro</h2><br/>
                    <div className='mb-3'>
                        <label htmlFor="titulo" className='form-label'>
                            Título
                        </label>
                        <input 
                            type="text"
                            required
                            className='form-control'
                            id='titulo'
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)} 
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="resumo" className='form-label'>
                            Resumo
                        </label>
                        <textarea 
                            className='form-control'
                            required
                            id='resumo'
                            value={resumo}
                            onChange={(e) => setResumo(e.target.value)} 
                        ></textarea>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="editora" className='form-label'>
                            Editora
                        </label>
                        <select
                            className='form-control'
                            id='codEditora'
                            value={codEditora}
                            onChange={tratarCombo} 
                            required
                        >
                            {opcoes.map((opcao) => (
                                <option key={opcao.value} value={opcao.value}>
                                    {opcao.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="autores" className='form-label'>
                            Autores (um por linha)
                        </label>
                        <textarea
                            className='form-control'
                            required
                            id='autores'
                            value={autores}
                            onChange={(e) => setAutores(e.target.value)} 
                        ></textarea>
                    </div>
                    <button type='submit' className='btn btn-primary'>
                        Salvar
                    </button>
                </form>
            </main>
        </div>
    );
};

export default LivroDados;