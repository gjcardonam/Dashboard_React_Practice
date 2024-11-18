import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const { login, isLoading } = useLogin();

  function handleSubmit( e ) {
    e.preventDefault();
    if(!username || !password) return;
    login({ username, password }, {
      onSettled: () => {
        setPassword("");
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Usuario">
        <Input
          type="text"
          id="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Contraseña">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">
          {!isLoading ? "Iniciar Sesión" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
