import { useEffect, useState } from "react";
import { Searchbox } from "Searchbox";

const USERS_URL = "https://www.mocky.io/v2/5ba8efb23100007200c2750c";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
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
      <Searchbox data={users} filterFn={userObjectFilter} />
    </div>
  );
}

type User = any;

function userObjectFilter(user: User, searchString: string) {
  return Object.keys(user).some((key) => {
    if (Array.isArray(user[key])) {
      return user[key].some((item: string) =>
        item.toLowerCase().includes(searchString.toLowerCase())
      );
    } else if (typeof user[key] === "string") {
      return user[key].toLowerCase().includes(searchString.toLowerCase());
    } else {
      return false;
    }
  });
}

export default App;
