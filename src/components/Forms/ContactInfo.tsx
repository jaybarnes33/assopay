import React, { useContext } from "react";
import { IHandlers, RegisterContext } from "./MultiStep";
import styles from "@/styles/Forms.module.scss";
import Button from "../core/Button";

export interface IStep4 {
  phone?: string;
  socials?: Record<string, string>[];
}
const ContactInfo = ({ previous }: IHandlers) => {
  const { data, setData } = useContext(RegisterContext);
  return (
    <div className={styles.inner}>
      <div className={styles.buttons}>
        <Button className="btn-main">Submit</Button>
        <Button className="btn-main">Submit</Button>
      </div>
    </div>
  );
};

export default ContactInfo;
