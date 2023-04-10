import styles from '../styles/Questionario.module.css'
import QuestaoModel from "../model/QuestaoModel"
import Questao from './Questao'
import Botao from './Botao'

interface QuestionarioProps{
    questao: QuestaoModel
    ultima: boolean
    questaoRespondida: (questao: QuestaoModel) => void
    proximoPasso: () => void
}

export default function Questionario(props: QuestionarioProps) {
    
    function respostaFornecida(indice: number) {
        if (!props.questao.respondida) {
            props.questaoRespondida(props.questao.responderCom(indice))
        }
    }

    return (
        <div className={styles.questionario}>
            { props.questao ? (
                <Questao 
                    valor={props.questao}
                    tempoParaResponder={6}
                    respostaFornecida={respostaFornecida}
                    tempoEsgotado={props.proximoPasso}
                /> 
              ) : false
            }
            <Botao onClick={props.proximoPasso} texto={props.ultima ? 'Finalizar' : 'Próxima'} />
        </div>
    )
}