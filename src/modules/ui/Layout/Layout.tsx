import { ReactNode } from "react";
import { Header } from "../Header/Header";
import styles from "./Layout.module.scss";

export type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>{children}</main>
    </div>
  );
};
