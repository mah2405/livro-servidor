import { NextApiRequest, NextApiResponse } from "next";
import ControleLivros from "@/classes/controle/ControleLivros";

const controleLivro = new ControleLivros();

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const livros = await controleLivro.obterLivros();
            res.status(200).json(livros);
        } else if (req.method === 'POST') {
            const novoLivro = req.body;
            controleLivro.incluir(novoLivro);
            res.status(200).json({ message: 'Livro incluído com sucesso' });
        } else {
            res.status(405).json({ error: 'Método não permitido' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};