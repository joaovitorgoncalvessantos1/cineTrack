import React from "react";
import style from './EmptyState.module.css'
import { useNavigate } from "react-router-dom";
import { Clapperboard } from "lucide-react";

function EmptyState() {
      const navigate = useNavigate();
     
    function voltarHome(){
         navigate(-1);
        
    }
  return (
    <div className={style.container}>
      <span><Clapperboard/></span>

      <h2>Sua coleção está vazia</h2>

      <p>Adicione filmes para começar sua coleção</p>

      <button onClick={voltarHome}>Explorar filmes</button>
    </div>
  );
}

export default EmptyState;
