import { useState } from "react";
import axios from "axios";

export default function App() {
  return (
    <div>
      <StudentEditor />
    </div>
  );
}

const axiosStudentInstance = axios.create({
  baseURL: "https://crudcrud.com/api/e861ed7f0b5f4e14affc4e69f7ffa725",
});
// Add a request interceptor
axiosStudentInstance.interceptors.request.use(
  function (config) {
    console.log("requst", config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosStudentInstance.interceptors.response.use(
  function (response) {
    console.log("response", response);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const createStudent = (name, age) => {
  axiosStudentInstance.post("/student", {
    name: name,
    age: age,
  });
};

function StudentEditor() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  function handleOnClick() {
    // console.log("name", name);
    // console.log("age", age);
    createStudent(name, age);
  }
  const [students, setStudents] = useState([]);
  function handleOnGetStudent() {
    axiosStudentInstance
      .get("/student")
      .then((response) => setStudents(response.data));
  }
  function handleDelete(id) {
    axiosStudentInstance.delete(`/student/${id}`);
  }
  return (
    <div>
      <div>
        <input type="text" onChange={(e) => setName(e.target.value)}></input>
        <input
          type="text"
          onChange={(e) => setAge(Number(e.target.value))}
        ></input>
        <button onClick={handleOnClick}>Submit</button>
        <button onClick={handleOnGetStudent}>Get student</button>
      </div>
      <div>
        {students.map((student) => (
          <div key={student._id}>
            <div>
              name: {student.name} age: {student.age}
            </div>
            <button onClick={() => handleDelete(student._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
