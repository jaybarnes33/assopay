import styles from "../styles/Forms.module.scss";
import MultiStep from "@/components/Forms/MultiStep";
import Alert from "@/components/core/Alert";
import Left from "@/components/Forms/Left";
import Link from "next/link";
import Head from "next/head";

const SignUp = () => {
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
          <MultiStep />
          <div className={styles.links}>
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
  );
};

export default SignUp;
