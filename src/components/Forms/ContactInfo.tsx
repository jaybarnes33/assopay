import React, { useContext } from "react";
import { IHandlers, RegisterContext } from "./MultiStep";
import styles from "@/styles/Forms.module.scss";

export interface IStep4 {
  phone?: string;
  socials?: string[];
}
const ContactInfo = ({ previous }: IHandlers) => {
  const { data, setData } = useContext(RegisterContext);
  return <div className={styles.form}></div>;
};

export default ContactInfo;
