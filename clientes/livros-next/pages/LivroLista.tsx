import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from '../styles/Home.module.css';
import Livro from "@/classes/modelo/Livro";
import { Menu } from "@/componentes/Menu";
import { LinhaLivro } from "@/componentes/LinhaLivro";
import ControleLivros from "@/classes/controle/ControleLivros";

const baseURL = 'http://localhost:3000/api/livros';
const controleLivros = new ControleLivros();

const LivroLista = () => {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [carregado, setCarregado] = useState(false);

    const obter = async () => {
        const response = await fetch(baseURL);
        const data = await response.json();
        return data;
    };

    useEffect(() => {
        obter().then((data) => {
            setLivros(data);
            setCarregado(true);
        })
    }, [carregado]);

    const excluir = async (codigo: string) => {
        const sucesso = await controleLivros.excluir(codigo);
        if (sucesso) {
            setLivros((livrosNovos) => livrosNovos.filter((livro) => livro.codigo !== codigo));
            setCarregado(false);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Livros Next</title>
            </Head>

            <Menu />

            <main className={styles.main}>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Resumo</th>
                            <th>Editora</th>
                            <th></th>
                            <th>Autores</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(livros) && livros.length > 0 ? (
                        livros.map((livro, index) => (
                            <LinhaLivro
                                livro={livro}
                                excluir={() => excluir(livro.codigo).then(() => setCarregado(false))}
                                key={index}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>Nenhum livro encontrado.</td>
                        </tr>
                    )} 
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default LivroLista;