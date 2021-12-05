import { useRouter } from "next/router";
import { initData } from "../../data/data";
import moment from "moment";

export default function TasksPage(props) {
  const tasks = initData.tasks;
  const router = useRouter();
  const taskId = parseInt(`${router.asPath.split("/")[2]}`);
  const task = tasks.find((task) => task.id === taskId);

  return (
    <div>
      <p style={{cursor:"pointer",color:"blue"}} onClick = {()=>router.push('/')}>Back</p>
      <h1>Task {task.id} - {task.title}</h1>
      <h4>{task.description}</h4>
      <p>{moment(task.startDate).format("Do MMM YYYY")} - {moment(task.endDate).format("Do MMM YYYY")}</p>
      <p>{task.percentageComplete}% Complete</p>
      <ins>{task.owner}</ins>
    </div>
  );
}
