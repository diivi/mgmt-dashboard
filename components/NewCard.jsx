import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import { useState } from "react";

export default function NewCard(props) {
  const [title, setTitle] = useState("Title");
  const [phase, setPhase] = useState("Approval Needed");
  const [description, setDescription] = useState("Additional information");
  const [completion, setCompletion] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [owner, setOwner] = useState("");

  const handleAdd = () => {
    const task = {
      title,
      phase,
      description,
      percentageComplete: completion,
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
      owner,
    };
    props.addTask(task);
  };

  return (
    <Dialog open={props.open} onClose={props.handleClose} fullWidth={true}>
      <DialogTitle>Add Client</DialogTitle>
      <DialogContent>
        <DialogContentText>Fll in client details.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          defaultValue={title}
          variant="standard"
          onChange={(event) => setTitle(event.target.value)}
        />
        <Box sx={{ marginTop: "25px" }}>
          <FormControl fullWidth>
            <InputLabel id="phase">Phase</InputLabel>
            <Select
              labelId="phase-select"
              id="phase-select"
              label="Phase"
              onChange={(event) => setPhase(event.target.value)}
              defaultValue={phase}
            >
              <MenuItem value={"Approval Needed"}>Approval Needed</MenuItem>
              <MenuItem value={"Todo"}>Todo</MenuItem>
              <MenuItem value={"Development"}>Development</MenuItem>
              <MenuItem value={"Testing"}>Testing</MenuItem>
              <MenuItem value={"Completed"}>Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ marginTop: "25px" }}>
          <Typography id="input-slider" gutterBottom>
            Percentage Complete
          </Typography>
          <Slider
            defaultValue={completion}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={(event, value) => setCompletion(value)}
          />{" "}
        </Box>
        <Box sx={{ marginTop: "0px" }}>
          <TextField
            id="description"
            label="Task Description"
            placeholder={description}
            multiline
            variant="standard"
            fullWidth
            onChange={(event) => setDescription(event.target.value)}
          />
        </Box>
        <Box sx={{ marginTop: "35px" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
          </LocalizationProvider>
        </Box>
        <Box sx={{ marginTop: "10px" }}>
          <TextField
            autoFocus
            margin="dense"
            id="owner"
            label="Owner"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setOwner(event.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}
