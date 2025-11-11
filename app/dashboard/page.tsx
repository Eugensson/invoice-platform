import { signOut } from "@/app/utils/auth";
import { requireUser } from "@/app/utils/hooks";

const Dashboard = async () => {
  const session = await requireUser();

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit" className="cursor-pointer">
          Sign Out
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
