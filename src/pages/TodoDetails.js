import { useEffect, useState } from "react";
import PopUpTodoForm from "../component/popupTodoForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";

const TodoDetails = () => {
  const [popup, setPopup] = useState(null);
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const { id } = useParams();

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await fetch("/api/todos/" + id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setTodo(json);
        setIsLoading(false);
      }
    };
    fetchTodo();
  }, [user, id]);

  const getData = (todo) => {
    setTodo(todo);
    // console.log("masuks");
  };
  return (
    <div className="todo-details">
      {isLoading}
      {todo && (
        <article>
          <h2>{todo.title}</h2>
          {/* <p>{new Date(todo.updateDate).toLocaleDateString()}</p> */}
          <div>{todo.body}</div>
          <span
            className="material-symbols-outlined"
            onClick={() => setPopup(!popup)}
          >
            edit
          </span>
        </article>
      )}
      {popup && (
        <PopUpTodoForm setPopup={setPopup} todo={todo} getData={getData} />
      )}
    </div>
  );
};

export default TodoDetails;
