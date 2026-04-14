import styles from "./FormAvaliacao.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

import { Home } from "lucide-react";

function FormAvaliacao() {
  const [filme, setFilme] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

const emocoesLista = [
  "Feliz",
  "Triste",
  "Empolgado",
  "Ansioso",
  "Reflexivo",
  "Chocado",
  "Com medo",
  "Tenso",
  "Aliviado",
  "Inspirado",
  "Motivado",
  "Confuso",
  "Surpreso",
  "Indignado",
  "Apaixonado",
  "Nostálgico",
  "Curioso",
  "Decepcionado",
  "Impactado",
  "Divertido",
  "Entediado",
  "Intrigado",
  "Apreensivo",
  "Eufórico",
  "Comovido"
];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const lista = JSON.parse(localStorage.getItem("avaliacoes")) || [];

    const avaliacao = lista.find(item => item.id == id);

  
    if (avaliacao) {
      setFilme({
        title: avaliacao.titulo,
        poster_path: avaliacao.poster,
      });

      setTimeout(() => {
        setValue("data", avaliacao.data);
        setValue("nota", avaliacao.nota);
        setValue("resenha", avaliacao.resenha);
        setValue("recomendaria", avaliacao.recomendaria);
        setValue("emocoes", avaliacao.emocoes || []);
      }, 0);
    } 
 
    else if (id) {
      async function buscarFilme() {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=6812781b2c4fa1feadbd90bfe8879f95&language=pt-BR`
          );
          const data = await response.json();
          setFilme(data);
        } catch (error) {
          console.log(error);
        }
      }

      buscarFilme();
    }
  }, [id, setValue]);

  function aoSubmeter(data) {
    const lista = JSON.parse(localStorage.getItem("avaliacoes")) || [];

    if (lista.find(item => item.id == id)) {
      const novaLista = lista.map(item =>
        item.id == id ? { ...item, ...data } : item
      );

      localStorage.setItem("avaliacoes", JSON.stringify(novaLista));
    } else {
      const novaAvaliacao = {
        id: Date.now(),
        filmeId: id,
        titulo: filme?.title,
        poster: filme?.poster_path,
        ...data,
      };

      lista.push(novaAvaliacao);
      localStorage.setItem("avaliacoes", JSON.stringify(lista));
    }

    navigate(-1);
  }

  return (
    <div className={styles.page}>
      <div className={styles.nav}>
        <button className={styles.icon} onClick={() => navigate("/")}><Home/></button>
        <button className={styles.icon}  onClick={() => navigate(-1)}><ArrowLeft/></button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(aoSubmeter)}>
        <h1 className={styles.title}>
         Avaliar filme
        </h1>

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
          <Input
            type="date"
            {...register("data", { required: "Data obrigatória" })}
          />
          {errors.data && (
            <p className={styles.error}>{errors.data.message}</p>
          )}
        </div>

 
        <div className={styles.field}>
          <label>Nota</label>
          <Input
            type="number"
            {...register("nota", {
              required: "Nota obrigatória",
              min: { value: 1, message: "Mínimo 1" },
              max: { value: 10, message: "Máximo 10" },
            })}
          />
          {errors.nota && (
            <p className={styles.error}>{errors.nota.message}</p>
          )}
        </div>

 
        <div className={styles.field}>
          <label>Sua resenha</label>
          <textarea
            className={styles.textarea}
            {...register("resenha", {
              required: "Resenha obrigatória",
              minLength: {
                value: 10,
                message: "Escreva pelo menos 10 caracteres",
              },
            })}
          />
          {errors.resenha && (
            <p className={styles.error}>{errors.resenha.message}</p>
          )}
        </div>


        <div className={styles.field}>
          <label>Recomendaria?</label>
          <div className={styles.radioGroup}>
            <label>
              <Input
                type="radio"
                value="sim"
                {...register("recomendaria", {
                  required: "Selecione uma opção",
                })}
              />
              Sim
            </label>

            <label>
              <Input
                type="radio"
                value="nao"
                {...register("recomendaria", {
                  required: "Selecione uma opção",
                })}
              />
              Não
            </label>
          </div>

          {errors.recomendaria && (
            <p className={styles.error}>
              {errors.recomendaria.message}
            </p>
          )}
        </div>


        <div className={styles.field}>
          <label>Quais emoções esse filme te trouxe?</label>

          <div className={styles.checkboxGroup}>
            {emocoesLista.map((emocao) => (
              <label key={emocao} className={styles.checkbox}>
                <Input
                  type="checkbox"
                  value={emocao}
                  {...register("emocoes", {
                    validate: (value) =>
                      value && value.length > 0 ||
                      "Escolha pelo menos uma emoção",
                  })}
                />
                <span>{emocao}</span>
              </label>
            ))}
          </div>

          {errors.emocoes && (
            <p className={styles.error}>{errors.emocoes.message}</p>
          )}
        </div>

        <button className={styles.submit} type="submit">
          Salvar Avaliação
        </button>
      </form>
    </div>
  );
}

export default FormAvaliacao;