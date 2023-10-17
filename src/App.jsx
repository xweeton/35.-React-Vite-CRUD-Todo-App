import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { TodoContext } from "./contexts/TodoContext";
import Addtodo from "./pages/AddTodo";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import EditTodo from "./pages/EditTodo";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";
import { UserIdContext } from "./contexts/UserIdContext";

function Layout() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const userId = useContext(UserIdContext).userId;

  function logout() {
    authContext.setToken(null);
    navigate("/");
  }

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Todos</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/add">Add Todo</Nav.Link>
          </Nav>
          Welcome {userId} !
          <Button className="ms-5" variant="danger" onClick={logout}>
            Logout
          </Button>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [userId, setUserId] = useLocalStorage("userId", null);
  const [token, setToken] = useLocalStorage("token", null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <UserIdContext.Provider value={{ userId, setUserId }}>
        <TodoContext.Provider value={{ todos, setTodos }}>
          <BrowserRouter>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route
                  index
                  element={
                    <RequireAuth>
                      <Home />
                    </RequireAuth>
                  }
                />
                <Route
                  path="add"
                  element={
                    <RequireAuth>
                      <Addtodo />
                    </RequireAuth>
                  }
                />
                <Route path="*" element={<ErrorPage />} />
                <Route
                  path="todo/:id"
                  element={
                    <RequireAuth>
                      <EditTodo />
                    </RequireAuth>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </TodoContext.Provider>
      </UserIdContext.Provider>
    </AuthContext.Provider>
  );
}
