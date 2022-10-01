import React, { useState } from "react";
import { Layout } from "ui";
import { useStoreContext } from "../../context/Store.context";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useStoreContext();

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <Layout title='Login'>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formInputContainer}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='email@gmail.com'
            required
          />
        </div>
        <div className={styles.formInputContainer}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='********'
            required
          />
        </div>
        <button type='submit'>submit</button>
      </form>
    </Layout>
  );
};
export default Login;
