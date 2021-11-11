import React, { useState } from "react"
import Image from "next/image"
import styles from "../styles/Forms.module.scss"
import Button from "@/components/core/Button"
import Left from "@/components/Forms/Left"
import Alert from "@/components/core/Alert"
import Link from "next/link"
import Head from "next/head"
const Login = () => {
  const [show, setShow] = useState(false)

  const submitHandler = () => {}
  return (
    <div className={styles.main}>
      <Head>
        <title>Register</title>
      </Head>
      <Left />
      <div className={styles.right}>
        <div className={styles.form_container}>
          <Alert variant="info">
            <p>
              Provide valid <b className="bold-white">student email</b> and
              <b className="bold-white"> password</b> to continue.
            </p>
          </Alert>
          <form onSubmit={submitHandler} className={styles.form}>
            <Alert variant="info">
              <p>
                Provide valid <b className="bold-white">student email</b> and
                <b className="bold-white"> password</b> to continue.
              </p>
            </Alert>
            <div className={styles.inner}>
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
                  autoComplete="current-password"
                />
              </div>
              <div className={styles.links}>
                {" "}
                <small onClick={() => setShow(!show)}>
                  <i className={`bi bi-${!show ? "eye" : "eye-slash"}`} />
                </small>
                <Link href="/register">
                  <small className="link">
                    Don&apos;t have an account? Register{" "}
                  </small>
                </Link>
              </div>
              <Button className="btn-primary btn-sm" type="submit">
                Submit
              </Button>
            </div>
          </form>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Login
