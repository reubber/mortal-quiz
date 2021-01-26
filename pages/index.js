import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import db from 'db.json'
import Widget from 'src/components/Widget'
import Footer from 'src/components/Footer'
import GitHubCorner from 'src/components/GitHubCorner'
import QuizLogo from 'src/components/QuizLogo'
import QuizBackground from 'src/components/QuizBackground'

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`

export default function Home() {
  const router = useRouter()
  const [name, setName] = useState('')

  const handleSeachInputKeyPress = e => {
    if (e.key === 'Enter') {
      console.log('Enter key pressed! Search Value: ' + e.target.value)
      setName(e.target.value)
    }
  }

  let time = null

  const handleSearchInputChange = e => {
    const value = e.target.value
    clearTimeout(time)

    time = setTimeout(() => {
      setName(value)
      console.log('valor:', value)
    }, 500)
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form
              onSubmit={info => {
                info.preventDefault()
                router.push(`/quiz?name:${name}`)
              }}
            >
              <input
                name="nickname"
                type="text"
                placeholder="Player digite seu nickname"
                onChange={handleSearchInputChange}
                onKeyPress={handleSeachInputKeyPress}
              />
              <button type="submit" disabled={name.length === 0}>
                GO FIGHT
              </button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>FINNISH HIM</h1>

            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/reubber" />
    </QuizBackground>
  )
}
