import useUser from "@/hooks/useUser";
import router from "next/router";
import { useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";
import styles from "@/styles/Home.module.scss";
import Button from "@/components/core/Button";
import buttonStyles from "@/components/core/Button/button.module.scss";
import { joinClasses } from "@/utils/join-classes";
import makeSecuredRequest from "@/utils/makeSecuredRequest";
import { getAmount } from "@/utils/getAmount";
import { isPaid } from "@/utils/isPaid";
const Dues = () => {
  const { user, authenticating, isAuthenticated } = useUser();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (!user && !authenticating && !isAuthenticated) {
      router.push("/login");
    } else {
      user && setAmount(50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticating, user]);

  //paystack functions
  const initializePayment = usePaystackPayment({
    label: "ACSES DUES",
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: Math.ceil(amount * 100),
    currency: "GHS",
    publicKey:
      process.env.NEXT_PUBLIC_ENV === "production"
        ? process.env.NEXT_PUBLIC_PAYSTACK_KEY!
        : process.env.NEXT_PUBLIC_PAYSTACK_TEST!
  });

  console.log(isPaid(user?.dues));
  // Success payment
  const onSuccess = async (reference: Function) => {
    await makeSecuredRequest("/api/dues", "POST", {
      amount,
      reference
    });
    console.log(reference);
    window.location.reload();
  };

  //Closed Payment modal
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  return (
    <div className={styles.main}>
      <section className={styles.inner_grid}>
        <div className={`${styles.inner_grid} ${styles.text}`}>
          <h1>
            Welcome {user?.firstName} {user?.lastName},
          </h1>
          <h2>
            {!isPaid(user?.dues)
              ? "Please click the button below to pay your dues"
              : "Your dues have already been paid"}
          </h2>
        </div>

        <div className={styles.buttons}>
          {!isPaid(user?.dues) && (
            <Button
              onClick={() => initializePayment(onSuccess, onClose)}
              className={joinClasses(
                buttonStyles.button,
                buttonStyles["button-main-light"]
              )}
            >
              Pay Dues
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dues;
