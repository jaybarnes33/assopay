import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Forms.module.scss";
import { joinClasses } from "@/utils/join-classes";

const Left = () => {
  const router = useRouter();

  return (
    <div className={styles.left}>
      <div>
        <Link href="/">
          <a className={joinClasses(styles.back, "absolute-left")}>
            <i className="bi bi-arrow-left"></i> Go back home
          </a>
        </Link>
      </div>
      <h1>Welcome, please {router.pathname.split("/")[1]} to continue</h1>
    </div>
  );
};

export default Left;
