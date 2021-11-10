import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Image from "next/image";
import Button from "../components/core/Button";
import styles from "../styles/Home.module.scss";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Acses Portal</title>
        <meta
          name="description"
          content="Welcome to the ACSES-UMaT portal, pay your dues, get course content and more"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.inner_grid}>
          <div className={styles.text}>Welcome to the ACSES - UMaT portal</div>
          <div className={styles.buttons}>
            <Button
              onClick={() => router.push("/dues")}
              className="btn-main-outline"
            >
              Pay Dues
            </Button>
            <Button onClick={() => router.push("/login")} className="btn-main">
              Login
            </Button>
            <Button
              onClick={() => router.push("/register")}
              className="btn-main"
            >
              Register
            </Button>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        &copy; Copyright - {new Date().getFullYear()}
      </footer>
    </>
  );
}
