import { useContext, useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { UserIdContext } from "../contexts/UserIdContext";

export default function TodoCard({ todo }) {
  const completed = todo.completed;
  const border = completed ? "success" : "danger";
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const setTodos = useContext(TodoContext).setTodos;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userId = useContext(UserIdContext).userId;

  // Filter out user in todos's array that don't match the userId
  if (todo.user !== userId) {
    return null;
  }

  //functions related to the timer
  const startTimer = () => {
    if (timerInterval === null) {
      const intervalID = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      //store time in timerInterval for global use, due to intervalID only can use in this function
      setTimerInterval(intervalID);
    }
  };

  const pauseTimer = () => {
    //global state timerInterval took the state of intervalID from startTimer()
    clearInterval(timerInterval);
    setTimerInterval(null);
  };

  const resetTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
    setTimer(0);
  };

  const deleteTodo = () => {
    setTodos((prevTodos) =>
      // filter remain the other, but delete prevTodo, due to prevTodo.id !== todo.id is false, other is true
      prevTodos.filter((prevTodo) => prevTodo.id !== todo.id)
    );
  };

  useEffect(() => {
    return () => {
      clearInterval(timerInterval);
    };
  }, [timerInterval]);

  return (
    <>
      <Card border={border} className="my-3">
        <Card.Header>{!completed && "Not"} Completed</Card.Header>

        <Card.Body>
          <Card.Title>{todo.title}</Card.Title>

          <Card.Text>{todo.description}</Card.Text>

          <p>Timer: {timer} seconds</p>

          <Button onClick={startTimer}>
            <i className="bi bi-play"></i>
          </Button>

          <Button onClick={pauseTimer} className="ms-2">
            <i className="bi bi-pause-fill"></i>
          </Button>

          <Button onClick={resetTimer} className="ms-2">
            <i className="bi bi-arrow-clockwise"></i>
          </Button>

          <Button variant="secondary" href={`todo/${todo.id}`} className="ms-4">
            <i className="bi bi-pencil"></i>
          </Button>

          {/* Modal alert for delete todo after click delete button */}
          <Button variant="danger" onClick={handleShow} className="ms-2">
            <i className="bi bi-trash3"></i>
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Delete this todo</Modal.Title>
            </Modal.Header>

            <Modal.Body>Are you SURE?</Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>

              <Button variant="danger" onClick={deleteTodo}>
                Delete!
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </>
  );
}
