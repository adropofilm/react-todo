import React, { useState, useEffect } from 'react';
import axios from "axios";
import NewTaskInputForm from '../newTaskInputForm/NewTaskInputForm';
import TaskItem from '../taskItem/TaskItem';
import styles from './styles.module.css'

const TaskListContainer = () => {
    const [tasks, setTasks] = useState([]);
    const taskItems = Array.from(tasks);

    useEffect(() => {
        getAllTasks();
      }, [])

    const getAllTasks = async () => {
      const { data } = await axios.get("http://localhost:4000/tasks")
      setTasks(data.tasks);
    };

    const taskList = taskItems?.map((task) => {
        if(task.status === "open") {
            return (
                <TaskItem {...task} />
            );
        } else { 
            return null; 
        }
    });

    return (
        <div id={styles["task-list-container"]} className="flex-column-center">
            <h1 id={styles["task-list-header"]}>Keep It Moving 💪🏽</h1>
            <NewTaskInputForm getAllTasks={getAllTasks}/>
            <div id={styles["task-list"]} className="flex-column-center">
                {taskList}
            </div>
        </div>
    )
}

export default TaskListContainer;