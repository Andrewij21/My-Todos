import { useEffect, useState } from "react";
import TodoList from "../component/TodoList";
import TodoForm from "../component/TodoForm";
import { useTodoContext } from "../hooks/useTodoContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  // const [todos, setTodos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { todos, dispatch } = useTodoContext();
  const { user, dispatch: Authdispatch } = useAuthContext();

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await fetch("/api/todos", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setIsLoading(false);
      if (response.ok) {
        const json = await response.json();
        dispatch({ type: "SET_TODOS", payload: json });
      } else Authdispatch({ type: "LOGOUT" });
    };
    fetchTodo();
  }, [dispatch, user, Authdispatch]);
  return (
    <div className="home">
      <div className="todos">
        {isLoading && <div>Loading...</div>}
        {!todos.length && (
          <div className="empty-todos">You don't have any task</div>
        )}
        {todos && todos.map((todo) => <TodoList key={todo._id} todo={todo} />)}
      </div>
      <TodoForm />
    </div>
  );
};

export default Home;
