import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Input, Label, Layout } from "ui";
import { routes } from "../constants/routes.constants";
import { signIn } from "next-auth/react";
import styles from "../styles/login.module.css";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const response = await unstable_getServerSession(req, res, authOptions);

  if (response?.accessToken) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("joni@gmail.com");
  const [password, setPassword] = useState("Password123!");

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (response) {
      router.push(routes.main.root);
    }
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
