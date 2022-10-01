import React, { useState } from "react";
import { Button, InputLabel, Layout } from "ui";
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
        <InputLabel
          labelProps={{ label: "Email" }}
          inputProps={{
            type: "email",
            onChange: (e) => setEmail(e.target.value),
            value: email,
            placeholder: "email@gmail.com",
            required: true,
          }}
        />
        <InputLabel
          labelProps={{
            label: "Password",
          }}
          inputProps={{
            type: "password",
            onChange: (e) => setPassword(e.target.value),
            value: password,
            placeholder: "********",
            required: true,
          }}
        />
        <Button type='submit'>submit</Button>
      </form>
    </Layout>
  );
};
export default Login;
