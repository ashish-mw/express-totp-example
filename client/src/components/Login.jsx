import { useState } from "react";

import { login } from "../api";

function Login(props) {
  const { handleTokenSet } = props;
  const [email, setEmail] = useState("me@gmail.com");
  const [password, setPassword] = useState("me");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      console.log(res.data);
      handleTokenSet(res.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Login!</h1>

      <small>
        By default <i>email: me@gmail.com</i> and <i>password: me</i>
      </small>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" />
      </form>
    </>
  );
}

export default Login;
