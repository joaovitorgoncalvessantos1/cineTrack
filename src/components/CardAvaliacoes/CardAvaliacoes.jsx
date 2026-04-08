import style from "./CardAvaliacoes.module.css";

function CardAvaliacoes({ avaliacao }) {
  return (
    <div className={style.container}>
      <img
        className={style.imagem}
        src={`https://image.tmdb.org/t/p/w200${avaliacao.poster}`}
      />

      <div className={style.review}>
        <h2>{avaliacao.titulo}</h2>

        <div className={style.info}>
          <p>⭐ {avaliacao.nota}</p>
          <p>
            {avaliacao.recomendaria === "sim"
              ? "👍 Recomendado"
              : "👎 Não recomendado"}
          </p>
        </div>

        <p>{new Date(avaliacao.data).toLocaleDateString("pt-BR")}</p>

        {/* EMOÇÕES */}
        <div className={style.badges}>
          {avaliacao.emocoes?.map((emocao, index) => (
            <span key={index} className={style.badge}>
              {emocao}
            </span>
          ))}
        </div>

        {/* RESENHA */}
        <p className={style.resenha}>{avaliacao.resenha}</p>
      </div>
    </div>
  );
}

export default CardAvaliacoes;