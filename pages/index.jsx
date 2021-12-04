import styles from "../styles/Home.module.css";
import Head from "next/head";
import TaskCollection from "../components/TaskCollection";
import Button from "@mui/material/Button";
import { DragDropContext } from "react-beautiful-dnd";
import initData from "../data/data.js";
import { useState, useEffect,useRef } from "react";
import NewCard from "../components/newCard";

export default function Home() {
  const [appState, setAppState] = useState(initData);
  const isFirstRun = useRef(true);

  useEffect(() => {
    // dont set app state on first render but on every render anfterwards
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    localStorage.setItem("appState", JSON.stringify(appState));
  }, [appState]);

  useEffect(() => {
    const appState = JSON.parse(localStorage.getItem("appState"));
    if (appState) {
      setAppState(appState);
    }
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    // if dropped anywhere outside doppables
    if (!destination) {
      return;
    }
    // if dropped in same column at same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const startCategory = appState.categories.find(
      (c) => c.name === source.droppableId
    );
    const endCategory = appState.categories.find(
      (c) => c.name === destination.droppableId
    );
    //handle reordering
    if (startCategory === endCategory) {
      const newOrder = Array.from(startCategory.taskIds);
      const taskId = newOrder[source.index];
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, taskId);

      const revisedCategory = {
        ...startCategory,
        taskIds: newOrder,
      };

      const newCategories = appState.categories.map((c) => {
        if (c.name === source.droppableId) {
          return revisedCategory;
        }
        return c;
      });

      setAppState({
        ...appState,
        categories: newCategories,
      });
      return;
    }

    //when task is moved to a different category
    const startTaskIds = Array.from(startCategory.taskIds);
    const endTaskIds = Array.from(endCategory.taskIds);

    //put taskid in end category and remove from start category
    const taskId = startTaskIds[source.index];
    startTaskIds.splice(source.index, 1);
    endTaskIds.splice(destination.index, 0, taskId);

    const newStartCategory = {
      ...startCategory,
      taskIds: startTaskIds,
    };
    const newEndCategory = {
      ...endCategory,
      taskIds: endTaskIds,
    };

    const newCategories = appState.categories.map((c) => {
      if (c.name === source.droppableId) {
        return newStartCategory;
      }
      if (c.name === destination.droppableId) {
        return newEndCategory;
      }
      return c;
    });

    setAppState({
      ...appState,
      categories: newCategories,
    });
  };

  function deleteTask(taskId) {
    const newCategories = appState.categories.map((c) => {
      const newTaskIds = c.taskIds.filter((id) => id !== taskId);
      return { ...c, taskIds: newTaskIds };
    });
    setAppState({
      ...appState,
      categories: newCategories,
    });
  }

  // for the add new task modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function addTask(task) {
    const newTaskId = appState.tasks.length + 1;
    const newTask = {
      id: newTaskId,
      title: task.title,
      description: task.description,
      startDate: task.startDate,
      endDate: task.endDate,
      percentageComplete: task.percentageComplete,
      owner: task.owner,
    };
    const newTasks = [...appState.tasks, newTask];
    const newtaskCategory = task.phase;
    const newCategories = appState.categories.map((c) => {
      if (c.name === newtaskCategory) {
        return {
          ...c,
          taskIds: [...c.taskIds, newTaskId],
        };
      }
      return c;
    });
    setAppState({
      ...appState,
      tasks: newTasks,
      categories: newCategories,
    });
    setOpen(false);
  }

  return (
    <>
      <Head>
        <title>Management Dashboard</title>
        <meta name="description" content="a dashboard for task management" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.heading}>DaVinci Corps</h1>
      <hr />
      <div className={styles.container}>
        <div className={styles.rowEnd}>
          <h1>Client Progress</h1>
          <Button variant="contained" onClick={handleOpen}>
            Add a new Client
          </Button>
          <NewCard open={open} handleClose={handleClose} addTask={addTask} />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.row}>
            {appState.categories.map((category) => (
              <TaskCollection
                key={category.id}
                taskCategory={category.name}
                tasks={category.taskIds.map((id) => appState.tasks[id - 1])}
                deleteTask={deleteTask}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </>
  );
}
