import style from './CardFilme.module.css'
import {Navigate, useNavigate} from 'react-router-dom'


function CardFilme({titulo,nota,ano,imagem,id}) {
    const navigate = useNavigate()

   function selecionarId() {
  navigate(`/filme/${id}`)
}
  return (
    <div className={style.container}>
        <div>
            <img src={imagem} alt="" />
        </div>
        <div className={style.nomeFilme}>
            <h2>{titulo}</h2>
        </div>
        <div className={style.informacoes}>
            <p>{ano}</p>
            <p>{`⭐ ${nota}`}</p>
        </div>
        <button onClick={selecionarId} className={style.botao}>Ver detalhes</button>
    </div>
  )
}

export default CardFilme