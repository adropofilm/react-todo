import styles from "./TaskItem.module.css";
import { Dispatch, SetStateAction } from "react";
import { Task } from "../../types/Task.types";
import { deleteTask, updateTask } from "../../utility/api";

export type Props = Task & {
  setTasks: Dispatch<SetStateAction<Task[]>>;
};

export const TaskItem = ({ id, title, setTasks }: Props): JSX.Element => {
  const markTaskCompleted = async (): Promise<void | never> => {
    const taskBody = {
      status: "closed",
      id: id,
    };

    updateTask(taskBody).then(() => {
      setTasks((prevState) => prevState.filter((task) => task.id !== id));
    });
  };

  const markTaskDeleted = (): void => {
    deleteTask(id as number).then(() =>
      setTasks((prevState) => prevState.filter((task) => task.id !== id))
    );
  };

  return (
    <div className={styles["container"]}>
      <input className="checkbox-input" role="checkbox" aria-checked="false" />
      <span className={styles["checkmark"]} onClick={markTaskCompleted}></span>
      <label>{title}</label>
      <span
        className={`material-symbols-outlined ${styles["delete-icon"]}`}
        onClick={markTaskDeleted}>
        delete
      </span>
    </div>
  );
};
