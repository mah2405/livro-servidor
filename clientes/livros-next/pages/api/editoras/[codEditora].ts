import { NextApiRequest, NextApiResponse } from "next";
import ControleEditora from "@/classes/controle/ControleEditora";

const controleEditora = new ControleEditora();

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const codEditora = Number(req.query.codEditora);
            const nomeEditora = await controleEditora.getNomeEditora(codEditora);
            res.status(200).json(nomeEditora);
        } else {
            res.status(405).json({ error: 'Método não permitido' });
        } 
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};