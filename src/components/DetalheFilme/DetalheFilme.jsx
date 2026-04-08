import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardFilme from "../CardFilme/CardFilme";

import style from "./DetalheFilme.module.css";

function DetalheFilme() {
  const [filme, setFilme] = useState(null);
  const imageBaseURL = "https://image.tmdb.org/t/p/";
  const size = "w200";
  const { id } = useParams();
  const navigate = useNavigate();
  function voltar() {
    navigate(-1);
  }
  function navegarForm() {
    navigate(`/formulario-avaliacao/${id}`);
  }

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=6812781b2c4fa1feadbd90bfe8879f95&language=pt-BR`;

    async function mostrarDetalhes() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setFilme(data);
      } catch (error) {
        console.log(error);
      }
    }
    mostrarDetalhes();
  }, [id]);
  return (
    <>
      <div
        className={style.background}
        style={{
          backgroundImage: `url(${imageBaseURL}w500${filme?.backdrop_path})`,
        }}
      >
        <div className={style.overlay}></div>

        <div className={style.container}>
          <div className={style.container}>
            <button onClick={voltar} className={style.botao}>
              Voltar
            </button>

            <div className={style.conteudo}>
              {filme && (
                <img
                  className={style.poster}
                  src={`${imageBaseURL}${size}${filme.poster_path}`}
                  alt={filme.title}
                />
              )}

              <div className={style.info}>
                <h1>{filme?.title}</h1>

                <div className={style.meta}>
                  <span>{filme?.release_date?.split("-")[0]}</span>
                  <span>⭐ {filme?.vote_average}</span>
                  <span className={style.time}>
                    {filme?.runtime > 0
                      ? `${Math.floor(filme.runtime / 60)}h ${filme.runtime % 60}m`
                      : "N/A"}
                  </span>
                </div>

                <div className={style.generos}>
                  {filme?.genres?.map((genre) => (
                    <span key={genre.id} className={style.tag}>
                      {genre.name}
                    </span>
                  ))}
                </div>

                <h2>sinopse:</h2>
                <p className={style.overview}>{filme?.overview}</p>
                <div className={style.container_avaliacao}>
                  <button onClick={navegarForm} className={style.botao_form}>
                    Avaliar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetalheFilme;
