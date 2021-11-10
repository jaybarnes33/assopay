import Alert from "@/components/core/Alert";
import Button from "@/components/core/Button";
import Left from "@/components/Forms/Left";
import Link from "next/link";
import Head from "next/head";
import React, { useState } from "react";

import styles from "../styles/Forms.module.scss";
import MultiStep from "@/components/Forms/MultiStep";

const Signup = () => {
  const [show, setShow] = useState(false);

  const submitHandler = () => {};
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
                Provide valid <b className="bold-white">Credentials</b> to
                continue.
              </p>
            </Alert>
            <div>
              <MultiStep maxSteps={4} />
              <Link href="/login">
                <small className="link">Already have an account? Login </small>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
