import { Button, TextField } from "@mui/material";
import styles from "./Register.module.scss";
import { useFormik } from "formik";
import { useAuth } from "@/modules/auth";
import { ErrorMessage } from "@/modules/ui/ErrorMessage/ErrorMessage";

export const RegisterPage = () => {
  const { signUp, isLoading, errors } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      await signUp(values);
    },
  });

  return (
    <div className={styles.content}>
      <form onSubmit={formik.handleSubmit} className={styles.container}>
          <TextField
            label="Usuário"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoFocus
            required
          />

          <TextField
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type='email'
            required
          />

          <TextField
            label="Senha"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type='password'
            minLength='6'
            required
          />

          <Button disabled={isLoading || formik.isSubmitting} type="submit" variant="contained">
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </Button>

        {errors && <ErrorMessage messages={errors} />}
      </form>
    </div>
  );
};
