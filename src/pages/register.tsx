import Alert from "@/components/core/Alert";
import Button from "@/components/core/Button";
import Left from "@/components/Forms/Left";
import Link from "next/link";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../styles/Forms.module.scss";
import MultiStep from "@/components/Forms/MultiStep";
import useUser from "@/hooks/useUser";
import router from "next/router";

const Signup = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, authenticating } = useUser();
  useEffect(() => {
    if (isAuthenticated && !authenticating) {
      router.replace("/dues");
    }
  }, [isAuthenticated, authenticating]);
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
              Provide valid <b className="bold-white">Credentials</b> to
              continue.
            </p>
          </Alert>
          <div>
            <MultiStep maxSteps={5} />
            <div className={styles.links}>
              <Link href="/login">
                <a className="link">Already have an account? Login </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .blue-bg {
          background-color: #5578eb;
        }
      `}</style>
    </div>
  );
};

export default Signup;
