import Head from "next/head";
import { TextInput } from "@/modules/ui/TextInput/TextInput";
import { Button } from "@/modules/ui/Button/Button";
import styles from "./Login.module.scss";
import { FormEvent, ReactNode, useState } from "react";
import { useAuth } from "@/modules/auth";
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, isLoading, errors } = useAuth();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };
    await signIn(data);
  };

  return (
    <div className={styles.content}>
      <Head>
        <title>Co-Finance - Login</title>
      </Head>
      <form onSubmit={onSubmit} className={styles.container}>
          <TextInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            required
          />

          <TextInput
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            minLength='6'
            required
          />

          <Button disabled={isLoading} type="submit" >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>

        {errors && <ErrorMessage messages={errors} />}
      </form>
    </div>
  );
};
