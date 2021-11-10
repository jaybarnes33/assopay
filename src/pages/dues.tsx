import useUser from "@/hooks/useUser";
import router from "next/router";
import { useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
const Dues = () => {
  const { user, authenticating, isAuthenticated } = useUser();
  const initializePayment = usePaystackPayment({
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: Math.ceil(1 * 100),
    currency: "GHS",
    publicKey:
      process.env.NODE_ENV === "production"
        ? "pk_live_4f77f76738fd6becf0a144ab06fa7e614e779868"
        : "pk_test_416cb666b87d1627e714824ceb3fc4e9ff3e6acc",
  });

  useEffect(() => {
    if (!isAuthenticated && !authenticating) {
      router.push("/login");
    } else {
      if (user) {
        initializePayment();
      }
    }
  }, []);

  return <div>dues</div>;
};

export default Dues;
