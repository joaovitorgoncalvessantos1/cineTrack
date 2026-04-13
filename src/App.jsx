import { useEffect, useState } from "react";

import CardFilme from "./components/CardFilme/CardFilme";
import Container from "./components/Container/Container";

import Navbar from "./components/Navbar/Navbar";

function App() {
  const [buscar, setBusca] = useState("");

  function aoClicar() {
    buscarFilmes();
  }

  function aodigitar(e) {
    setBusca(e.target.value);
  }

  const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];

  const [filmes, setFilmes] = useState([]);
  const imageBaseURL = "https://image.tmdb.org/t/p/";
  const size = "w200";

  async function buscarFilmes() {
    try {
      if (buscar.trim() === "") {
        const urlpopulares = `https://api.themoviedb.org/3/movie/popular?api_key=6812781b2c4fa1feadbd90bfe8879f95&language=pt-BR`;

        const response = await fetch(urlpopulares);
        const data = await response.json();
        setFilmes(data.results);
      } else {
        const urlpesquisa = `https://api.themoviedb.org/3/search/movie?api_key=6812781b2c4fa1feadbd90bfe8879f95&query=${buscar}&language=pt-BR`;
        const responsepesquisa = await fetch(urlpesquisa);
        const dataPesquisa = await responsepesquisa.json();
        setFilmes(dataPesquisa.results);
      }
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      /*sistema de loadingo */
    }
  }

  useEffect(() => {
    buscarFilmes();
  }, []);
  console.log(filmes);
  return (
    <>
      <Navbar value={buscar} onChange={aodigitar} onClick={aoClicar}></Navbar>
      <Container>
        {filmes.map((filme) => (
          <CardFilme
            key={filme.id}
            id={filme.id}
            titulo={filme.title}
            ano={filme?.release_date?.split("-")[0]}
            nota={filme?.vote_average?.toFixed(1)}
            imagem={`${imageBaseURL}${size}${filme.poster_path}`}
            filme={filme}
          />
        ))}
      </Container>
    </>
  );
}

export default App;
