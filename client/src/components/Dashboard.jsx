import { useEffect, useState } from "react";
import { userInfo } from "../api";

function Dashboard({ token }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const res = await userInfo(token);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    }

    if (token) {
      getUserInfo();
    }
  }, [token]);

  return (
    <>
      <h1>Dashboard!</h1>

      {user && (
        <div>
          <pre>{JSON.stringify(user)}</pre>
        </div>
      )}
    </>
  );
}

export default Dashboard;
