import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
// import { useTodoContext } from "../hooks/useTodoContext";

const PopUpTodoForm = ({ setPopup, todo, getData }) => {
  const [title, setTitle] = useState(todo.title);
  const [body, setBody] = useState(todo.body);
  // const [error, setError] = useState(null);
  // const { dispatch } = useTodoContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, body };
    setPopup(false);
    const response = await fetch("/api/todos/" + todo._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (!response.ok) console.log(json);
    else {
      // const todo = { title: json.data.title, body: json.data.body };
      getData(json.data);
      console.log(json);
    }
  };
  return (
    <form className="popup-form" onSubmit={handleSubmit}>
      <h4>Update Todo</h4>
      <label>Title: </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Body: </label>
      <textarea
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button>Update</button>
      <span
        className="material-symbols-outlined"
        onClick={() => setPopup(false)}
      >
        close
      </span>
    </form>
  );
};
export default PopUpTodoForm;
