import { useEffect, useState } from "react";
import { Searchbox } from "Searchbox";

const USERS_URL = "https://www.mocky.io/v2/5ba8efb23100007200c2750c";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      // todo: try block
      const response = await fetch(USERS_URL);
      const jsonResponse = await response.json();

      if (isMounted === true) {
        setUsers(jsonResponse);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <Searchbox searchList={users} />
    </div>
  );
}

export default App;
