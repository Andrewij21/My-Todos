import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const api_url = process.env.REACT_APP_API_KEY;

  const signup = async ({ email, password }) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(`${api_url}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      console.log(json);
      setError(json.error);
    } else {
      setIsLoading(false);
      dispatch({ type: "LOGIN", payload: json });
    }
  };
  return { signup, isLoading, error };
};
