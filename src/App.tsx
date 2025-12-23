import { useEffect, useState } from "react";
import "./App.css";
import { Details } from "./components/Details";
import { List } from "./components/List";
import { getUsersList, getUserInfo } from "./usersApi";

export type UserProps = {
  id: number;
  name: string;
};

export type UserDetailsProps = {
  avatar: string;
  name: string;
  details: {
    city: string;
    company: string;
    position: string;
  };
};

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [list, setList] = useState<UserProps[]>([]);
  const [info, setInfo] = useState<UserDetailsProps | null>(null);
  const [listErrorMessage, setListErrorMessage] = useState<string>("");
  const [infoErrorMessage, setInfoErrorMessage] = useState<string>("");

  useEffect(() => {
     const fetchUsers = async () => {
       try {
         const response = await getUsersList();

         if (!response.ok) {
           setListErrorMessage("Fetch Error");
           return;
         }

         const result = await response.json();
         setList(result);
         setListErrorMessage("");
       } catch {
         setListErrorMessage("Error fetching list of users. Please check your Internet connection or try later");
       }
     };

     fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedId === null) return;

     const fetchUserInfo = async () => {
       try {
         setLoading(true);

         const response = await getUserInfo(selectedId);

         if (!response.ok) {
           setInfoErrorMessage("Fetch Error");
           return;
         }

         const result = await response.json();
         setInfo(result);
         setInfoErrorMessage("");
       } catch {
         setInfoErrorMessage(
           "Error fetching user's details. Please check your Internet connection or try later"
         );
       } finally {
         setLoading(false);
       }
     };

     fetchUserInfo();
  }, [selectedId]);

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  return (
    <>
      <div className="container">
        <div className="left-block">
          {listErrorMessage ? (
            <p className="error-message">{listErrorMessage}</p>
          ) : (
            <List list={list} onSelect={handleSelect} />
          )}
        </div>
        <div className="right-block">
          {infoErrorMessage && (
            <p className="error-message">{infoErrorMessage}</p>
          )}
          {!infoErrorMessage && info && (
            <Details info={info} loading={loading} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
