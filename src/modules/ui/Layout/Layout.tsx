import { ReactNode } from "react";
import { Header } from "../Header/Header";
import styles from "./Layout.module.scss";

export type LayoutProps = {
  children: ReactNode;
  title: string;
};

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <div className={styles.titleContainer}>
        <Header title={title}/>
      </div>

      <main className={styles.main}>{children}</main>
    </div>
  );
};
