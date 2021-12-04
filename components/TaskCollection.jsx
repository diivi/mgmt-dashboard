import Task from "./Task.jsx";
import styles from "./styles/TaskCollection.module.css";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Droppable } from "react-beautiful-dnd";
import { useState, useEffect } from "react";

export default function TaskCollection(props) {
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  const { taskCategory, tasks } = props;

  return (
    <div className={styles.taskCollection}>
      <Stack direction="row" spacing={2} className={styles.heading}>
        <Typography sx={{ fontSize: 22 }} color="text.secondary">
          {taskCategory}
        </Typography>
        <Chip label={tasks.length} />
      </Stack>
      {winReady && (
        <Droppable droppableId={taskCategory}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`${styles.category} ${
                snapshot.isDraggingOver && styles.draggingOver
              }`}
            >
              {tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  category={taskCategory}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </div>
  );
}
