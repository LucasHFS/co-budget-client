import Head from "next/head";
import { TextInput } from "@/modules/ui/TextInput/TextInput";
import { Button } from "@/modules/ui/Button/Button";
import styles from "./Landing.module.scss";
import GetStarted from "./components/GetStarted";
import Header from "./components/Header";
import GetInTouch from "./components/GetInTouch";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";

export const LandingPage = () => {

  return (
    <>
      <Navbar />
      <Header />
      <GetStarted />
      <GetInTouch />
      <Footer />
    </>
  );
};
