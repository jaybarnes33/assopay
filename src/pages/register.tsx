import Alert from "@/components/core/Alert"
import Button from "@/components/core/Button"
import Left from "@/components/Forms/Left"
import Link from "next/link"
import Head from "next/head"
import React, { useState } from "react"

import styles from "../styles/Forms.module.scss"

const Signup = () => {
  const [show, setShow] = useState(false)

  const submitHandler = () => {}
  return (
    <div className={styles.main}>
      <Head>
        <title>Register</title>
      </Head>
      <Left />
      <div className={styles.right}>
        {" "}
        <div className={styles.form_container}>
          <Alert variant="info">
            <p>
              Provide valid <b className="bold-white">Credentials</b> to
              continue.
            </p>
          </Alert>

          <form
            id="register"
            name="sign-up"
            onSubmit={submitHandler}
            className={styles.form}
          >
            <div className={styles.input}>
              <label htmlFor="email">Student Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Ex. ce-jdoe6020@st.umat.edu.gh"
              />
            </div>
            <div className={styles.input}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type={!show ? "password" : "text"}
                name="password"
                autoComplete="new-password"
              />
              <div>
                <button type="button" onClick={() => setShow(!show)}>
                  show password
                </button>
              </div>
            </div>
            <Button type="submit" className="blue-bg" color="light">
              Submit
            </Button>
          </form>
          <div className={styles.links}>
            <Link href="/forgot-password">
              <a className="link">Forgot Password</a>
            </Link>
            <Link href="/login">
              <a className="link">Already have an account? Login </a>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .blue-bg {
          background-color: #5578eb;
        }
      `}</style>
    </div>
  )
}

export default Signup
