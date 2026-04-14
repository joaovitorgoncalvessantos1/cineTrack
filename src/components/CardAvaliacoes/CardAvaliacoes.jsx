import style from "./CardAvaliacoes.module.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function CardAvaliacoes({ avaliacao,deletar,editar }) {

 
  return (
    <div className={style.container}>
      <img
        className={style.imagem}
        src={`https://image.tmdb.org/t/p/w200${avaliacao.poster}`}
      />

      <div className={style.review}>
        <div>
          <h2>{avaliacao.titulo}</h2>
        </div>

        <div className={style.info}>
          <p>⭐ {avaliacao.nota}</p>
          <p>
            {avaliacao.recomendaria === "sim"
              ? "👍 Recomendado"
              : "👎 Não recomendado"}
          </p>
        </div>

        <div>
          {" "}
          <p className={style.data}>{new Date(avaliacao.data).toLocaleDateString("pt-BR")}</p>
        </div>

        <div className={style.badges}>
          {avaliacao.emocoes?.map((emocao, index) => (
            <span key={index} className={style.badge}>
              {emocao}
            </span>
          ))}
        </div>

        <div>
          <p className={style.resenha}>{avaliacao.resenha}</p>
        </div>

<div className={style.actions}>
  <button onClick={()=> editar(avaliacao.id)} title={avaliacao.title}>
    <MdEdit />
  </button>

  <button onClick={() => deletar(avaliacao.id)}>
    <MdDelete  />
  </button>
</div>
      </div>
    </div>
  );
}

export default CardAvaliacoes;
