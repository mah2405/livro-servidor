import { NextApiRequest, NextApiResponse } from "next";
import ControleLivros from "@/classes/controle/ControleLivros";

const controleLivro = new ControleLivros();

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const codigo = Number(req.query);
            controleLivro.obterLivros()
            .then(livros => {
                const livro = livros.find(livro => livro.codigo.toString() === codigo.toString());
                if (livro) {
                    res.status(200).json(livro);
                } else {
                    res.status(400).json({message: "Livro não encontrado."});
                }
            }) 
        } else if (req.method === 'DELETE') {
            const codigo = Number(req.query);
            controleLivro.excluir(codigo.toString());
            res.status(200).json({message: 'Livro excluído com sucesso'});
        } else {
            res.status(405).json({message: `Método ${req.method} não permitido`});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro interno do servidor'});
    }
};