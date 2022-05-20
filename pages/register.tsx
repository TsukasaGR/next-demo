import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from '@/libs/axios'

const Register: NextPage = () => {
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const router = useRouter()

  const register = async () => {
    // CSPF保護初期化
    await axios
      .get(`/sanctum/csrf-cookie`)
      .then((response) => {
        console.log('sanctum/csrf-cookie response is', response)
      })
      .catch(() => setError('CSRF保護初期化エラー'))

    // ユーザー登録
    await axios
      .post(`/register`, {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then((result) => {
        console.log('register response is', result)
        router.push('/dashboard')
      })
      .catch((registerError) => console.log('register error is', registerError))
  }

  return (
    <div className={styles.container}>
      <div>
        <p>Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <p>Email</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Password(確認)</p>
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <br />
        <br />
        <button onClick={register}>ユーザー登録</button>
      </div>
    </div>
  )
}

export default Register
