import RespostaModel from "./RespostaModel"
import { embaralhar } from '../functions/arrarys'

export default class QuestaoModel {
    #id: number
    #enunciado: string
    #respostas: RespostaModel[]
    #acertou: boolean 
  
    constructor(id: number, enunciado: string, respostas: RespostaModel[], acertou = false) { 
        this.#id = id
        this.#enunciado = enunciado    
        this.#respostas = respostas
        this.#acertou = acertou
    }

    get id() {
        return this.#id  
    }

    get enunciado() {
        return this.#enunciado  
    }

    get respostas() {        
        return this.#respostas  
    }

    get acertou() {
        return this.#acertou  
    }

    get respondida() {
        for (let resposta of this.#respostas){
            if (resposta.revelada) return true
        }
        return false
    }

    embaralharRespostas(): QuestaoModel {
        let respostasEmbaralhadas = embaralhar(this.#respostas)
        return new QuestaoModel(this.#id, this.#enunciado, respostasEmbaralhadas, this.#acertou)
    }

    responderCom(indice: number): QuestaoModel {
        const acertou = this.#respostas[indice]?.certa
        const respostas = this.#respostas.map((resp, i) => {
            const respostaSelecionada = indice === i
            const deveRevelar = respostaSelecionada || resp.certa
            return deveRevelar ? resp.revelear() : resp
        })
        return new QuestaoModel(this.#id, this.#enunciado, respostas, acertou)
    }

    static criarUsandoObjeto(obj: QuestaoModel): QuestaoModel {
        const respostas = obj.respostas.map(resp => RespostaModel.criarUsandoObjeto(resp))
        return new QuestaoModel(obj.id , obj.enunciado, respostas, obj.acertou)
    }

    converterParaObjeto() {
        return {
            id:         this.#id,
            enunciado:  this.#enunciado,
            respondida: this.respondida,
            acertou:    this.#acertou,
            respostas:  this.#respostas.map(resp => resp.converterParaObjeto())            
        }
    }

  }