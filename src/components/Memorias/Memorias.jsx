import { useNavigate } from "react-router-dom";
import CardAvaliacoes from "../CardAvaliacoes/CardAvaliacoes";
import style from "./Memorias.module.css";
function Memorias() {
  const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
  const navigate = useNavigate()

    function home (){
        navigate('/')
    }
  return (
    <div>
<div className={style.container_btn} > 
          <button className={style.botao} onClick={home}>Voltar</button>
</div>
      <div className={style.container}>
        {avaliacoes.length === 0 ? (
          <p>Nenhuma memória ainda 🎬</p>
        ) : (
          avaliacoes.map((avaliacao) => (
            <CardAvaliacoes key={avaliacao.id} avaliacao={avaliacao} />
          ))
        )}
      </div>
    </div>
  );
}

export default Memorias;
