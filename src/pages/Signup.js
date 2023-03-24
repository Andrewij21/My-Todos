import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  const handelSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    await signup(user);
  };
  return (
    <form className="signup" onSubmit={handelSubmit}>
      <h3>Signup</h3>
      <label>Email: </label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password: </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={isLoading}>Signup</button>
      {isLoading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
