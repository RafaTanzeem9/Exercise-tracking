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
import { forgotPassword } from "../slices/forgotPasswordSlice";
import FormContainer from "../components/FormContainer";

function ForrgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const forgot = useSelector((state) => state.user);
  const { loading, error } = forgot;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
    // navigate("/resetPassword");
  };

  return (
    <FormContainer>
      <h1>Verify Email</h1>
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

        <Button className="my-3" type="submit" variant="primary">
          VerifyEmail
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ForrgotPassword;
