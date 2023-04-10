
import questoes from '../bancoDeQuestoes'

export default function questaoPorId(req, res) {  
  const id = +req.query.id
  const questao = questoes.filter(ques => ques.id === id)
  
  if (questao.length === 1) {
    res.status(200)
        .json(
            questao[0]
                .embaralharRespostas()
                .converterParaObjeto()
        )
  }else{
    res.status(204).send()
  }  
}
