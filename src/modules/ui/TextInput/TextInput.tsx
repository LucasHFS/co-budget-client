import { ChangeEventHandler, useId } from "react";
import styles from "./TextInput.module.scss";

export type TextInputProps = {
  label?: string;
  name?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: any;
  required?: boolean;
  minLength?: string;
};

export const TextInput = ({ label, name, onChange, value, ...props }: TextInputProps) => {
  const id = useId();

  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {/* @ts-ignore */}
      <input
        name={name}
        id={id}
        className={styles.input}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};
