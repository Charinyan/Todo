import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState, useEffect} from "react";
import { nanoid } from "nanoid";


function App(props) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?') // Ограничим количество задач до 10
      .then(response => response.json())
      .then(data => {setTasks(data)})
      
      .catch(error => console.error('Ошибка загрузки данных:', error));
  }, []);
  function toggleTaskCompleted(id) {
    const updatedTask = tasks.find(task => task.id === id);
    updatedTask.completed = !updatedTask.completed;

    
    setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
  }
  console.log(tasks)
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }
  const taskList = tasks?.map((task) => (
    <Todo
      id={task.id}
      name={task.title}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
    />
  ));
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`,title: name, completed: false };
    setTasks([...tasks, newTask]);
  }
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
    return (
      <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">{headingText} </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}
  
  export default App;
  