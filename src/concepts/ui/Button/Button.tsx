import { ReactNode } from "react";
import styles from "./Button.module.scss";
import { Button as MuiButton } from '@mui/material';

export type ButtonProps = {
  children: ReactNode;
  type?: HTMLButtonElement["type"];
  disabled?: boolean;
};

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    // @ts-ignore
    <MuiButton
      {...props}
      className={styles.button}
      variant="contained"
    >

      {children}
    </MuiButton>
  );
};
