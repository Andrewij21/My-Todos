import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const signup = async ({ email, password }) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
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
