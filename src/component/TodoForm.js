import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTodoContext } from "../hooks/useTodoContext";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const { dispatch } = useTodoContext();
  const { user } = useAuthContext();
  const api_url = process.env.REACT_APP_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todo = { title, body };
    const response = await fetch(`${api_url}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(todo),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json);
    } else {
      setTitle("");
      setBody("");
      setError(null);
      dispatch({ type: "CREATE_TODO", payload: json });
      console.log("Todo has been added");
    }
  };
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h4>Create Todo</h4>

      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={error?.emptyFields.includes("title") ? "error" : ""}
      />
      <label>Body</label>
      <textarea
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className={error?.emptyFields.includes("body") ? "error" : ""}
      />
      <button>Add todo</button>
      {error && <div className="error">{error.error}</div>}
    </form>
  );
};

export default TodoForm;
