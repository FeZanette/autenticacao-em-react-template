import React from "react";
import { FormPost, Input, TextArea } from "./styled";
import useForms from "../../hooks/useForms";
import { BASE_URL } from "../../constants/BASE_URL";
import axios from "axios";
import useProtectedPage from "../../hooks/useProtectedPage";

// EXERCÍCIO DE FIXAÇÃO:
// 1) Na API -> Create Post: precisa de um token no Headers:
// - Criar a variável token que pega o token do localStorage.
// - Criar o objeto config e chamar o headers dentro com a authorization token.
// 2. Importar os objetos desestruturados do useForms indicando o que ele pede no body da requisição (title e body)
// 3) Colocar nos inputs: name, value e onChange
// 4) Na função enviarPost fazer o axios. Colocar e.preventDefault() e chamar a função limparCampos
// 5) Chamar a função useProtectedPage() 

export default function CriarPost() {
  
  useProtectedPage ()

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const { form, onChange, limparCampos } = useForms({ title: "", body: "" });

  const enviarPost = (e) => {
    e.preventDefault();
    console.log("entrou");
    axios
      .post(`${BASE_URL}/posts`, form, config)
      .then((res) => {
        console.log(res.data);
        limparCampos();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <FormPost onSubmit={enviarPost}>
      <label htmlFor="tituloPost">Título:</label>
      <Input
        placeholder="digite um título para o seu post"
        name="title"
        value={form.title}
        onChange={onChange}
      />
      <label htmlFor="textoPost">Texto:</label>
      <TextArea
        placeholder="crie um post!"
        name="body"
        value={form.body}
        onChange={onChange}
      />
      <button>Enviar</button>
    </FormPost>
  );
}
