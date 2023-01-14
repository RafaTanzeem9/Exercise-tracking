import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { resetPassword } from "../slices/forgotPasswordSlice";
import FormContainer from "../components/FormContainer";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const forgot = useSelector((state) => state.user);
  const { loading, error } = forgot;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email, password }));
    navigate("/login");
  };
  useEffect(() => {
    localStorage.setItem("userInfo", token);
  }, []);

  return (
    <FormContainer>
      <h1>Reset Password</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader></Loader>}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="email">
          <FormLabel>email address</FormLabel>
          <FormControl
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>New password</FormLabel>
          <FormControl
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>

        <Button className="my-3" type="submit" variant="primary">
          Reset Password
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ResetPassword;
