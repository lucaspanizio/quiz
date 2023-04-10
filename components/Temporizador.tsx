import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import styles from '../styles/Temporizador.module.css'

interface TemporizadorProps{
    key: any
    duracao: number
    tempoEsgotado: () => void
}

export default function Temporizador(props: TemporizadorProps){
    return (
        <div className={styles.temporizador}>
            <CountdownCircleTimer
                duration={props.duracao}
                size={120}
                isPlaying 
                onComplete={props.tempoEsgotado}                
                colors={["#BCE596","#F7B801","#ED827A"]}
                colorsTime={[props.duracao,props.duracao/2,0]}   
                // colors={[
                //     ["#BCE596", 0.33],
                //     ["#F7B801", 0.33],
                //     ["#ED827A", 0.33],
                // ]}              
            >
                { ({ remainingTime}) => <h1>{remainingTime}</h1> }
            </CountdownCircleTimer>
        </div>
    )
}