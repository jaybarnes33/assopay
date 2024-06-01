import Head from "next/head";
import Link from "next/link";
import buttonStyles from "@/components/core/Button/button.module.scss";
import styles from "../styles/Home.module.scss";
import { joinClasses } from "@/utils/join-classes";

export default function Home() {
  return (
    <>
      <Head>
        <title>AssoPay</title>
        <meta
          name="description"
          content="Welcome to the AssoPay, pay your dues with ease."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section id="hero" className={styles.inner_grid}>
          <h1 className={styles.text}>Welcome to Assopay</h1>
          <div className={styles.buttons}>
            <Link href="/register">
              <a
                className={joinClasses(
                  buttonStyles.button,
                  buttonStyles["button-outlined-light"]
                )}
              >
                Register
              </a>
            </Link>
            <Link href="/dues">
              <a
                className={joinClasses(
                  buttonStyles.button,
                  buttonStyles["button-main-light"]
                )}
              >
                Make Payment
              </a>
            </Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        &copy; Copyright - {new Date().getFullYear()}
      </footer>
    </>
  );
}
