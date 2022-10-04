import React, { useState } from "react";
import { Button, Label, Input, Layout } from "ui";
import { useStoreContext } from "../../context/store/Store.context";
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
        <Label label='Email'>
          <Input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='email@gmail.com'
            required
          />
        </Label>
        <Label label='Password'>
          <Input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='********'
            required
          />
        </Label>
        <Button fluid type='submit'>
          submit
        </Button>
      </form>
    </Layout>
  );
};
export default Login;
