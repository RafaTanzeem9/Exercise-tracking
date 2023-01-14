import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "./../components/Message";
import Loader from "./../components/Loader";
import { Register } from "../slices/userRegisterSlice";
import FormContainer from "../components/FormContainer";

function RegisterScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState(0);
  const [image, setImage] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const register = useSelector((state) => state.userRegister);
  const { status, loading, error } = register;

  const submitHandler = (event) => {
    event.preventDefault();
    // console.log(image, email, name, age, password, address);
    if (
      !name ||
      !email ||
      age ||
      image ||
      address ||
      !password ||
      !confirmPassword
    ) {
      return toast.error("Please fill all fields");
    }
    if (password.length < 8) {
      return toast.error("Password should be at least 8 characters!");
    }

    let form_data = new FormData();
    form_data.append("file", image);
    form_data.append("name", name);
    form_data.append("email", email);
    form_data.append("age", age);
    form_data.append("address", address);
    form_data.append("password", password);
    console.log(form_data);

    if (password !== confirmPassword) {
      setMessage("password do not match");
    } else {
      dispatch(Register(form_data));
    }
  };

  const handlePhoto = (e) => {
    setImage(e.target.files[0]);
  };
  useEffect(() => {
    if (status) {
      navigate("/login");
    }
  }, [status]);

  return (
    <FormContainer>
      <h1>
        Sign Up <i className="fa fa-upload" aria-hidden="true"></i>
      </h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader></Loader>}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="name">
          <FormLabel>Name</FormLabel>
          <FormControl
            required
            type="name"
            placeholder="enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="email">
          <FormLabel>email address</FormLabel>
          <FormControl
            required
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="address">
          <FormLabel>Address</FormLabel>
          <FormControl
            required
            type="text"
            placeholder="enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="age">
          <FormLabel>Age</FormLabel>
          <FormControl
            required
            type="number"
            placeholder="enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          ></FormControl>
        </FormGroup>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          name="file"
          onChange={handlePhoto}
        />
        <FormGroup controlId="password">
          <FormLabel>password</FormLabel>
          <FormControl
            required
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="confirm Password">
          <FormLabel>Confirmpassword</FormLabel>
          <FormControl
            required
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></FormControl>
        </FormGroup>
        <Button className="my-3" type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          <Link to="/login"> Have an account?</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
