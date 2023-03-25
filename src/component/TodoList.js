import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTodoContext } from "../hooks/useTodoContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TodoList = ({ todo }) => {
  const { dispatch } = useTodoContext();
  const { user } = useAuthContext();
  const api_url = process.env.REACT_APP_API_KEY;

  const handleClick = async () => {
    const response = await fetch(`${api_url}/api/todos/` + todo._id, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      method: "DELETE",
    });
    // const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: { _id: todo._id } });
      console.log("Todo removed");
    }
  };
  return (
    <div className="todo-list">
      <div className="todo-content">
        <Link to={todo._id}>
          <h4>{todo.title}</h4>
        </Link>
        <p>
          <strong>
            {formatDistanceToNow(new Date(todo.updateDate), {
              addSuffix: true,
            })}
          </strong>
        </p>
        <span onClick={handleClick} className="material-symbols-outlined">
          delete
        </span>
      </div>
    </div>
  );
};

export default TodoList;
