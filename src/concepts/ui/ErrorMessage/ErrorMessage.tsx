import styles from "./ErrorMessage.module.scss";

export const ErrorMessage = ({messages}:{messages: string[] | undefined}) => {
  return (
    <>
      {messages?.map(message => <li key={message} className={styles.error}>{message}</li>)}
    </>
  );
};
