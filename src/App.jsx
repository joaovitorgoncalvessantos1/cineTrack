import { useEffect, useState } from "react";

import CardFilme from "./components/CardFilme/CardFilme";
import Container from "./components/Container/Container";

import Navbar from "./components/Navbar/Navbar";

function App() {
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || []
    console.log('minha va' +avaliacoes)

  const [filmes, setFilmes] = useState([]);
  const imageBaseURL = "https://image.tmdb.org/t/p/";
  const size = "w200";
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=6812781b2c4fa1feadbd90bfe8879f95&language=pt-BR`;

    async function buscarFilmes() {
      try {
        const response = await fetch(url);
        const data = await response.json();

        setFilmes(data.results);
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    }

    buscarFilmes();
  }, []);
  console.log(filmes);
  return (
    <>
    <Navbar></Navbar>
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
