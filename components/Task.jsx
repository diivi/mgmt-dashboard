import styles from "./styles/Task.module.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Draggable } from "react-beautiful-dnd";

export default function Task(props) {
  return (
    <Draggable draggableId={props.task.title} index={props.index}>
      {(provided,snapshot) => (
        <Card
          ref={provided.innerRef}
          sx={{ minWidth: 300 }}
          className={`${styles.task} ${snapshot.isDragging && styles.dragging}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {props.category}
            </Typography>
            <Typography variant="h5" component="div">
              {props.task.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography variant="body2">
              {props.task.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      )}
    </Draggable>
  );
}
