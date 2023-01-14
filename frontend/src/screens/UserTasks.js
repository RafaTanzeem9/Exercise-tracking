import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { toast } from "react-hot-toast";

function UserTasks() {
  const { userInfo } = useSelector((state) => state.user);
  const [type, setType] = useState("Walking");
  const [duration, setDuration] = useState(0);
  const [comment, setComment] = useState("");
  const [tasks, setTasks] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(type, duration, comment);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/task`,
        {
          type,
          duration,
          comment,
        },
        config
      );
      if (res.status === 200) {
        fetchUserTasks();
      } else {
        toast.error("something went wrong");
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserTasks = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/task`,
        config
      );
      console.log("task:::", res.data.task);
      setTasks(res?.data.task);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };
  console.log(tasks);
  useEffect(() => {
    fetchUserTasks();
  }, []);
  return (
    <>
      <FormContainer>
        <h1>What have you done today!</h1>

        <Form onSubmit={submitHandler}>
          <DropdownButton id="dropdown-basic-button" title={`Task: ${type}`}>
            <Dropdown.Item
              onClick={() => {
                setType("Swimming");
              }}
            >
              Swimming
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setType("Running");
              }}
            >
              Running
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setType("Walking");
              }}
            >
              Walking
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setType("Gyming");
              }}
            >
              Gyming
            </Dropdown.Item>
          </DropdownButton>
          <FormGroup controlId="number">
            <FormLabel>Duration</FormLabel>
            <FormControl
              type="number"
              placeholder="Duration in hours.."
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            ></FormControl>
          </FormGroup>
          <FormGroup controlId="comment">
            <FormLabel>Comment</FormLabel>
            <FormControl
              type="text"
              placeholder="Explain your task..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></FormControl>
          </FormGroup>
          <Button className="my-3" type="submit" variant="primary">
            Create Task
          </Button>
        </Form>
      </FormContainer>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Task Type</th>
            <th>Comment</th>
            <th>Duration</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length &&
            tasks.map((task) => {
              return (
                <tr>
                  <td>1</td>
                  <td>{task.type}</td>
                  <td>{task.duration}</td>
                  <td>{task.comment}</td>
                  <td>{task.createdAt}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}

export default UserTasks;
