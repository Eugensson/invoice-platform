import { requireUser } from "@/app/utils/hooks";

const Dashboard = async () => {
  const session = await requireUser();

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
