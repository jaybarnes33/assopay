import { useEffect, useState } from "react";
import styles from "../styles/Forms.module.scss";
import Button from "@/components/core/Button";
import Left from "@/components/Forms/Left";
import Alert from "@/components/core/Alert";
import Link from "next/link";
import Head from "next/head";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { setAccessToken } from "@/misc/token";

const Login = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: true
  });
  const { user, authenticating, isAuthenticated } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated && !authenticating) {
      router.replace("/dues");
    }
  }, [isAuthenticated, authenticating, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("/api/users/login", { ...formData });
      if (data.refreshToken) {
        sessionStorage.setItem("token", data.refreshToken);
      }

      setAccessToken(data.accessToken);
      router.push("/dues");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError;
        if (serverError.response) {
          setError(serverError.response.data.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <Head>
        <title>Login</title>
      </Head>
      <Left />
      <main>
        <div className={styles.back}>
          <Link href="/">
            <a>
              <i className="bi bi-arrow-left"></i> Go back home
            </a>
          </Link>
        </div>
        <div className={styles.right}>
          <div className={styles.form_container}>
            <Alert variant="info">
              <p>
                Provide valid <b className="bold-white">student email</b> and
                <b className="bold-white"> password</b> to continue.
              </p>
            </Alert>
            <br />
            <form onSubmit={submitHandler} className={styles.form}>
              <div className={styles.inner}>
                <div className={styles.input}>
                  <label>
                    Email <span>*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    onChange={handleChange}
                    placeholder="Please enter your student email"
                  />
                </div>
                <div className={styles.input}>
                  <label htmlFor="current-password">
                    Password <span>*</span>
                  </label>
                  <input
                    id="current-password"
                    required
                    onChange={handleChange}
                    type={!show ? "password" : "text"}
                    name="password"
                    autoComplete="current-password"
                  />
                  <div>
                    <button onClick={() => setShow(!show)}>
                      {!show ? (
                        <>
                          Show Password <i className="bi bi-eye" />
                        </>
                      ) : (
                        <>
                          Hide Password <i className="bi bi-eye-slash" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles["login-button"]}>
                <Button type="submit" disabled={loading}>
                  Login
                </Button>
              </div>
            </form>
            <div className={styles.links}>
              <Link href="/forgot-password">
                <a className="link mr-2">Forgot Password</a>
              </Link>
              <Link href="/register">
                <a className="link">Don&apos;t have an account? Register </a>
              </Link>
            </div>
            {error && (
              <Alert variant="danger-bg left">
                <p>Invalid Credentials</p>
              </Alert>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
