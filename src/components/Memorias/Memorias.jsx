import { useNavigate } from "react-router-dom";
import CardAvaliacoes from "../CardAvaliacoes/CardAvaliacoes";
import style from "./Memorias.module.css";
import { useState } from "react";
import EmptyState from "../EmptyState/EmptyState";
function Memorias() {
const [lista, setLista] = useState(
  JSON.parse(localStorage.getItem("avaliacoes")) || []
);
  const navigate = useNavigate();
  

  function home() {
    navigate("/");
  }


function deletar(id) {
  if(!window.confirm("Tem certeza que deseja excluir?")){
    return
  }
  const novaLista = lista.filter(filme => filme.id !== id)

  setLista(novaLista)

  localStorage.setItem("avaliacoes", JSON.stringify(novaLista))
}
function editar(id){
 navigate(`/formulario-avaliacao/${id}`);

}
  return (
    <div>
      <div className={style.container_btn}>
        <button className={style.botao} onClick={home}>
          Voltar
        </button>
      </div>
      <div className={style.container}>
        {lista.length === 0 ? (
        <EmptyState/>
        ) : (
          lista.map((avaliacao) => (
            <CardAvaliacoes key={avaliacao.id} avaliacao={avaliacao} deletar={deletar} editar={editar} />
          ))
        )}
      </div>
    </div>
  );
}

export default Memorias;
