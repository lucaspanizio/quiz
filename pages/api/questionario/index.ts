import questoes from '../bancoDeQuestoes'
import { embaralhar } from '../../../functions/arrarys'

export default function questionario(req, res) {
    const ids = questoes.map(questao => questao.id)
    res.status(200).json(embaralhar(ids))
}