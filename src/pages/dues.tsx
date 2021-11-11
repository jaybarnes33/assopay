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
const Dues = () => {
  const { user, authenticating, isAuthenticated } = useUser();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (!user && !authenticating && !isAuthenticated) {
      router.push("/login");
    } else {
      user && setAmount(getAmount(user.level));
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
      process.env.VERCEL_ENV === "production"
        ? "pk_live_4f77f76738fd6becf0a144ab06fa7e614e779868"
        : "pk_test_416cb666b87d1627e714824ceb3fc4e9ff3e6acc",
  });

  // Success payment
  const onSuccess = (reference: Function) => {
    console.log(reference);
  };

  //Closed Payment modal
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };
  const handlePayment = () => {};
  return (
    <div className={styles.main}>
      <section className={styles.inner_grid}>
        <h1 className={styles.text}>
          Welcome {user?.firstName} {user?.lastName},
          <br /> Please click the button below to pay your dues
        </h1>
        <div className={styles.buttons}>
          <Button
            onClick={() => initializePayment(onSuccess, onClose)}
            className={joinClasses(
              buttonStyles.button,
              buttonStyles["button-main-light"]
            )}
          >
            Pay Dues
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Dues;
