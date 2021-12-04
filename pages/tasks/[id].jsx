import { useRouter } from "next/router";

export default function TasksPage(props) {
  const router = useRouter();
  return (
    <div>
      <h1>Task {`${router.asPath}`}</h1>
    </div>
  );
}
