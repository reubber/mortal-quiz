import React, { useState } from 'react'
import { useRouter } from 'next/router'
import db from 'db.json'

import Widget from '@/components/Widget'
import Footer from '@/components/Footer'
import GitHubCorner from '@/components/GitHubCorner'
import QuizLogo from '@/components/QuizLogo'
import QuizBackground from '@/components/QuizBackground'
import Input from '@/components/Input'
import Button from '@/components/Button'
import QuizContainer from '@/components/QuizContainer'

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
    }, 0)
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
              <Input
                name="nickname"
                type="text"
                onChange={handleSearchInputChange}
                placeholder="Player digite seu nickname"
                onKeyPress={handleSeachInputKeyPress}
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`GO FIGHT ${name}`}
              </Button>
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
