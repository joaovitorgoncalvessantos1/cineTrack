import styles from "./FormAvaliacao.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";

function FormAvaliacao() {
  const [filme, setFilme] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function buscarFilme() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=6812781b2c4fa1feadbd90bfe8879f95&language=pt-BR`,
        );
        const data = await response.json();
        setFilme(data);
      } catch (error) {
        console.log(error);
      }
    }

    buscarFilme();
  }, [id]);

  function aoSubmeter(data) {
    const avaliacoes = {
      id: Date.now(),
      filmeId: id,
      titulo: filme?.title,
      poster: filme?.poster_path,
      ...data,
    };

    console.log(avaliacoes);

    const listaAvaliado = JSON.parse(localStorage.getItem("avaliacoes")) || [];
    listaAvaliado.push(avaliacoes);
    localStorage.setItem("avaliacoes", JSON.stringify(listaAvaliado));

    navigate(-1);
  }

  return (
    <div className={styles.page}>
      <div className={styles.nav}>
        <button onClick={() => navigate("/")}>🏠 Início</button>
        <button onClick={() => navigate(-1)}>⬅ Voltar</button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(aoSubmeter)}>
        <h1 className={styles.title}>Avaliar Filme</h1>

        {filme && (
          <img
            className={styles.imagem}
            src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`}
          />
        )}

        <div className={styles.movieInfo}>
          {!filme ? <p>Carregando...</p> : <h2>{filme.title}</h2>}
        </div>

        <div className={styles.field}>
          <label>Data</label>
          <Input type="date" {...register("data", { required: true })} />
          {errors.data?.type === "required" && (
            <p className={styles.error}>Coloque a data que você assistiu</p>
          )}
        </div>

        <div className={styles.field}>
          <label>Nota</label>
          <Input
            type="number"
            {...register("nota", {
              required: true,
              min: 1,
              max: 10,
            })}
          />
          {errors.nota?.type === "required" && (
            <p className={styles.error}>De uma nota de 0 a 10</p>
          )}
        </div>

        <div className={styles.field}>
          <label>Sua resenha</label>
          <textarea
            className={styles.textarea}
            {...register("resenha", { required: true, minLength: 10 })}
          />
          {errors.resenha?.type === "required" && (
            <p className={styles.error}>
              Escreva sua resenha,com no minimo 10 caracteres
            </p>
          )}

          {errors.resenha?.type === "minLength" && (
            <p className={styles.error}>
              Conta um pouco mais da sua experiência
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label>Recomendaria?</label>
          <div className={styles.radioGroup}>
            <label>
              <Input
                type="radio"
                value="sim"
                {...register("recomendaria", { required: true })}
              />
              Sim
            </label>

            <label>
              <Input
                type="radio"
                value="nao"
                {...register("recomendaria", { required: true })}
              />
              Não
            </label>
            {errors.recomendaria && (
              <p className={styles.error}>Você recomendaria esse filme?</p>
            )}
          </div>
          <div className={styles.field}>
            <label>Emoões</label>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkbox}>
                <input type="checkbox" value="Tédio" {...register("emocoes")} />
                <span>Tédio</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  value="Alegria/Feliz"
                  {...register("emocoes", { required: true })}
                />
                <span>Alegria/Feliz</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  value="Tristeza/Emotivo"
                  {...register("emocoes", { required: true })}
                />
                <span>Tristeza/Emotivo</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  value="Medo/Tensão"
                  {...register("emocoes", { required: true })}
                />
                <span>Medo/Tensão</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  value="Calma/Relaxante "
                  {...register("emocoes", { required: true })}
                />
                <span>Calma/Relaxante </span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  value="Nostalgia"
                  {...register("emocoes", { required: true })}
                />
                <span>Nostalgia</span>
              </label>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  value="Raiva/Fúria"
                  {...register("emocoes", { required: true })}
                />
                <span>Raiva/Fúria</span>
              </label>{" "}
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  value="Desolado/Devastado"
                  {...register("emocoes", { required: true })}
                />
                <span>Desolado/Devastado</span>
              </label>
              {errors.emocoes && (
                <p className={styles.error}>Escolha pelo menos uma emoção</p>
              )}
            </div>
          </div>
        </div>

        <button className={styles.submit} type="submit">
          Salvar Avaliação
        </button>
      </form>
    </div>
  );
}

export default FormAvaliacao;
