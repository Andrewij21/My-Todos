import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const api_url = process.env.REACT_APP_API_KEY;
  const login = async ({ email, password }) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(`${api_url}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      setIsLoading(false);
      dispatch({ type: "LOGIN", payload: json });
      localStorage.setItem("user", JSON.stringify(json));
    }
  };
  return { login, isLoading, error };
};
