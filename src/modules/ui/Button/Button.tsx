import { ReactNode } from "react";
import styles from "./Button.module.scss";

export type ButtonProps = {
  children: ReactNode;
  type?: HTMLButtonElement["type"];
  disabled?: boolean;
};

export const Button = ({ children, disabled }: ButtonProps) => {
  return (
    <button disabled={disabled} className={styles.button}>
      {children}
    </button>
  );
};
