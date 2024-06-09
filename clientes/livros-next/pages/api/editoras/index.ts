import { NextApiRequest, NextApiResponse } from "next";
import ControleEditora from "@/classes/controle/ControleEditora";

const controleEditora = new ControleEditora();

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const editoras = controleEditora.getEditoras();
            res.status(200).json(editoras);
        } else {
            res.status(405).json({ error: 'Método não permitido' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};