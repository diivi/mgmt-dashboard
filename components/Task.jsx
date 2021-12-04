import styles from "./styles/Task.module.css";
import { Draggable } from "react-beautiful-dnd";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { CgProfile } from "react-icons/cg";
import moment from "moment";

export default function Task(props) {
  return (
    <Draggable draggableId={props.task.title} index={props.index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          sx={{ minWidth: 300 }}
          className={`${styles.task} ${snapshot.isDragging && styles.dragging}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          elevation={5}
        >
          <CardHeader
            subheader={props.category}
            className={styles.topHeading}
            action={
              <Stack direction="row" spacing={0}>
                <IconButton
                  aria-label="edit"
                  onClick={() => props.taskRedirect(props.task)}
                >
                  <InsertLinkIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => props.deleteTask(props.task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            }
          />
          <CardHeader
            title={props.task.title}
            subheader={moment(props.task.endDate).format("MMM Do YYYY")}
            className={styles.bottomHeading}
          />
          <CardContent className={styles.completion}>
            <Typography variant="body2">{`${props.task.percentageComplete}% Completed`}</Typography>
            <Box sx={{ width: "100%" }}>
              <LinearProgress
                variant="determinate"
                value={parseInt(props.task.percentageComplete)}
                sx={{
                  height: "6px",
                  marginTop: "5px",
                  backgroundColor: "rgba(0,0,0,0.1)",
                }}
              />
            </Box>
          </CardContent>
          <Divider sx={{ marginTop: "12px" }} />
          <CardContent>
            <div className={styles.sidebyside}>
              <Typography variant="subtitle2">Owner</Typography>
              <Typography variant="subtitle2">Duration</Typography>
            </div>
            <div className={styles.sidebyside} style={{ marginTop: "6px" }}>
              <Stack direction="row" spacing={1}>
                <CgProfile size={24} />
                <Typography variant="subtitle1">{props.task.owner}</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <Typography variant="subtitle1">
                  {/* {`${props.task.endDate.diff(props.task.startDate, "days")} days`} */}
                  {`${moment(props.task.startDate).format("MMM DD")} - ${moment(
                    props.task.endDate
                  ).format("MMM DD")}`}
                </Typography>
              </Stack>
            </div>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}
