import Head from "next/head";
import { Button, TextField } from "@mui/material";
import styles from "./Login.module.scss";
import { useFormik } from "formik";
import { ErrorMessage } from "@/concepts/ui/ErrorMessage/ErrorMessage";
import { useSignIn } from "./hooks/useSignIn";

export const LoginPage = () => {
  const { signIn, isLoading, errors } = useSignIn();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      await signIn(values)
    },
  });

  return (
    <div className={styles.content}>
      <Head>
        <title>Co-Finance - Login</title>
      </Head>
      <form onSubmit={formik.handleSubmit} className={styles.container}>
          <TextField
            label="Email"
            name="email"
            type='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            autoFocus
            required
          />

          <TextField
            label="Senha"
            name="password"
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            inputProps={{ minLength: 6, maxLength: 20 }}
            required
          />

          <Button disabled={isLoading} variant="contained" type="submit">
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>

        {errors && <ErrorMessage messages={errors} />}
      </form>
    </div>
  );
};
