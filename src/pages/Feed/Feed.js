import React, { useEffect } from 'react'
import CardPost from '../../components/CardPost/CardPost'
import CriarPost from '../../components/CriarPost/CriarPost'
import useRequestData from '../../hooks/useRequestData'
import { FeedContainer } from './styled'
import { irParaLogin } from '../../routes/coordinator'
import { useNavigate } from 'react-router-dom'
import useProtectedPage from '../../hooks/useProtectedPage'

// PRÁTICA 2:
// 1) O parâmetro headers do useRequestData deve ser passado como argumento no [posts]:
// - Criar o objeto config e chamar o headers dentro com a authorization token.
// - Criar a variável token que pega o token do localStorage. 
// - Chamar o config no [posts]

// PRÁTICA 3:
// 1) Verificar se o token existe através do hook useEffect.Se o token não existir, a página é direcionada para a página de Login através do navigate

// EXERCÍCIO DE FIXAÇÃO:
// 1) Chamar a função useProtectedPage() e apagar o useEffect

export default function Feed() {
  const navigate = useNavigate ()
  const token = localStorage.getItem("token")
  const config = {
    headers: {
      Authorization: token
    }
  }
  const [posts] = useRequestData([], '/posts', config)

  // useEffect (() => {
  //   if (!token) {
  //     irParaLogin(navigate)
  //   }
  // }, [navigate])

  useProtectedPage ()

  return (
    <FeedContainer>
      <h1>Feed</h1>
      <section>
        <h3>Novo post</h3>
        <CriarPost />
      </section>
      {
        posts.map((post) => {
          return <CardPost key={post.id} post={post} />
        })
      }
    </FeedContainer>
  )
}
