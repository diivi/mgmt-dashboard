import styles from "../styles/Home.module.css";
import Head from "next/head";
import TaskCollection from "../components/TaskCollection";
import Button from "@mui/material/Button";
import { DragDropContext } from "react-beautiful-dnd";
import initData from "../data/data.js";
import { useState, useEffect } from "react";

export default function Home() {
  const [appState, setAppState] = useState(initData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
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

  // useEffect(() => {
  //   console.log(appState.categories);
  // }, [appState]);

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
          <Button variant="contained">Add a new Client</Button>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.row}>
            {appState.categories.map((category) => (
              <TaskCollection
                key={category.id}
                taskCategory={category.name}
                tasks={category.taskIds.map((id) => appState.tasks[id - 1])}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </>
  );
}
