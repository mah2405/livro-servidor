import ControleEditora from "@/classes/controle/ControleEditora";
import Livro from "@/classes/modelo/Livro";
import React, { useEffect, useState } from "react";

const controleEditora = new ControleEditora()

interface LinhaLivroProps {
    livro: Livro;
    excluir: (codigo: string) => void;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = ({ livro, excluir }) => {
    const [nomeEditora, setNomeEditora] = useState<string>('');  
    
    useEffect(() => {
        async function editoraNome() {
            const nome = await controleEditora.getNomeEditora(livro.codEditora);
            if (nome) {
                setNomeEditora(nome);
            }
        }

        editoraNome();
    }, [livro.codEditora]);

    return (
        <tr>
            <td>{livro.titulo}<br />
                <button className="btn btn-sm btn-danger" onClick={() => excluir(livro.codigo)}>
                Excluir
                </button>
            </td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td></td>
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (<li key={index}>{autor}</li>))}
                </ul>
            </td>
        </tr>
    );
};