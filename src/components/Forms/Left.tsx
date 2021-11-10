import { useRouter } from "next/router";
import Button from "../core/Button";

import styles from "@/styles/Forms.module.scss";
const Left = () => {
  const router = useRouter();
  return (
    <div className={styles.left}>
      <Button
        className="btn-outline-main btn-sm absolute-left"
        onClick={() => router.back()}
      >
        Go back
      </Button>

      <p>Welcome, please {router.pathname.split("/")[1]} to continue</p>
    </div>
  );
};

export default Left;
