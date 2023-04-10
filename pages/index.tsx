import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import QuestaoModel from '../model/QuestaoModel'
import Questionario from '../components/Questionario'

// const questaoMock = new QuestaoModel(1, 'Melhor cor?', [
//     RespostaModel.errada('Vermelho'),
//     RespostaModel.errada('Azul'),
//     RespostaModel.errada('Amarelo'),
//     RespostaModel.certa('Preto'),
// ])

const BASE_URL = 'http://localhost:3000/api'

export default function Home() {
    const router = useRouter()

    const [idsQuestoes, setIdsQuestoes] = useState<number[]>([])
    const [questao, setQuestao] = useState<QuestaoModel>()
    // const [questao, setQuestao] = useState<QuestaoModel>(questaoMock)
    const [respostasCertas, setRespostasCertas] = useState<number>(0)
    
    async function carregarIdsDasQuestoes() {
        const resp = await fetch(`${BASE_URL}/questionario`)
        const ids = await resp.json()
        setIdsQuestoes(ids)
    }

    async function carregarQuestao(idQuestao: number) {
        const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
        const dadosNovaQuestao = await resp.json()
        const novaQuestao = QuestaoModel.criarUsandoObjeto(dadosNovaQuestao)
        setQuestao(novaQuestao)
    }

    useEffect(() => {
        carregarIdsDasQuestoes()
    }, [])

    useEffect(() => {
        idsQuestoes.length > 0 && carregarQuestao(idsQuestoes[0])
    }, [idsQuestoes])

    function questaoRespondida(questao: QuestaoModel) {
        setQuestao(questao)
        setRespostasCertas(respostasCertas + (questao.acertou ? 1 : 0))
    }

    function idProximaQuestao() {        
        const proximoIndice = idsQuestoes.indexOf(questao.id) + 1
        return idsQuestoes[proximoIndice]        
    }

    function proximoPasso() {
        const proximoId = idProximaQuestao()
        proximoId ? proximaQuestao(proximoId) : finalizar()                
    }

    function proximaQuestao(proximoId: number) {
        carregarQuestao(proximoId)
    }

    function finalizar() {
        router.push({
            pathname: "/resultado",
            query: {
                total: idsQuestoes.length,
                certas: respostasCertas
            }
        })
    }

    return questao ? (
            <Questionario 
                questao={questao}
                ultima={idProximaQuestao() === undefined}
                questaoRespondida={questaoRespondida}
                proximoPasso={proximoPasso}
            />
        ) : false 
}
