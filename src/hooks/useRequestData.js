import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants/BASE_URL";
import axios from "axios";

// PRÁTICA 2:
// 1) Passar o headers como parâmetro na função useRequestData
// 2) No axios, além da URL também tem que passar o headers de autorização
// 3) Na página Feed.js, passar o parâmetro headers como outro argumento. Cria o objeto config e chama o headers dentro com a authorization token. Cria a variável token que pega o token do localStorage. Por fim, chama o config no [posts]

export default function useRequestData(estadoInicial, path, headers) {
  const [dados, setDados] = useState(estadoInicial);
  const [erro, setErro] = useState("");

  const receberDados = () => {
    axios
      .get(`${BASE_URL}${path}`, headers)
      .then((resposta) => {
        setDados(resposta.data);
      })
      .catch((erro) => {
        console.log(erro.response);
        setErro(erro.response);
      });
  };

  useEffect(() => {
    receberDados();
  }, [path]);

  return [dados, receberDados, erro];
}
