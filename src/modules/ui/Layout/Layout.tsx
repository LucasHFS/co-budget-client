import { ReactNode } from "react";
import { Header } from "../Header/Header";
import styles from "./Layout.module.scss";

export type LayoutProps = {
  children: ReactNode;
  title: string;
  isApp: boolean;
};

export const Layout = ({ children, title, isApp=true }: LayoutProps) => {
  if(isApp){
    return (
      <div className={styles.layout}>
        <div className={styles.titleContainer}>
          <Header title={title}/>
        </div>

        <main className={styles.main}>{children}</main>
      </div>
    );
  } else {
    return (
      <>
        {/* <LandingNavbar /> */}
        {children}
        {/* <LandingFooter /> */}
      </>
    )
  }
};
