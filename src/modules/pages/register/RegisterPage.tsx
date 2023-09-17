import Head from "next/head";
import { TextInput } from "@/modules/ui/TextInput/TextInput";
import { Button } from "@/modules/ui/Button/Button";
import styles from "./Register.module.scss";
import { FormEvent, ReactNode, useState } from "react";
import { useAuth } from "@/modules/auth";
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, isLoading, errors } = useAuth();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      username,
      email,
      password,
    };
    await signUp(data);
  };

  return (
    <div className={styles.content}>
      <Head>
        <title>Co-Finance - Register</title>
      </Head>
      <form onSubmit={onSubmit} className={styles.container}>
          <TextInput
            label="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

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

          <Button disabled={isLoading} type="submit">
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </Button>

        {errors && <ErrorMessage messages={errors} />}
      </form>
    </div>
  );
};

