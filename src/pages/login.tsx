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
          <form onSubmit={submitHandler} className={styles.form}>
            <Alert variant="info">
              <p>
                Provide valid <b className="bold-white">student email</b> and
                <b className="bold-white"> password</b> to continue.
              </p>
            </Alert>
            <div className={styles.inner}>
              {" "}
              <div className={styles.input}>
                <input
                  type="text"
                  name="email"
                  placeholder="Please enter your student email"
                />
              </div>
              <div className={styles.input}>
                <input
                  type={!show ? "password" : "text"}
                  name="password"
                  placeholder="Please enter your password"
                />
                <br />
                <br />
              </div>
              <small onClick={() => setShow(!show)}>Show Password</small>
              <Link href="/register">
                <small className="link">
                  Don&apos;t have an account? Register{" "}
                </small>
              </Link>
              <Button className="btn-primary btn-sm" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
