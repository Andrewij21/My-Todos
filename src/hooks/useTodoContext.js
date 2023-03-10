import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) throw Error("Can't use context here");
  return context;
};
