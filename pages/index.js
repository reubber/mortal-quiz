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
import { motion } from 'framer-motion'
import Link from '@/components/Link'

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
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' }
          }}
          initial="hidden"
          animate="show"
        >
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

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 }
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>FINNISH HIM</h1>

            <ul>
              {db.external.map(linkExterno => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.')

                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                )
              })}
            </ul>
          </Widget.Content>
        </Widget>

        <Footer
          as={motion.footer}
          transition={{ delay: 1, duration: 0.5 }}
          variants={{
            show: { opacity: 1, x: '0' },
            hidden: { opacity: 0, x: '100%' }
          }}
          initial="hidden"
          animate="show"
        ></Footer>
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/reubber" />
    </QuizBackground>
  )
}
