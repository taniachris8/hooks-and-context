import { useEffect, useState } from "react";
import "./App.css";
import { Details } from "./components/Details";
import { List } from "./components/List";

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

const url =
  "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [list, setList] = useState<UserProps[]>([]);
  const [info, setInfo] = useState<UserDetailsProps | null>(null);
  const [listErrorMessage, setListErrorMessage] = useState<string>("");
  const [infoErrorMessage, setInfoErrorMessage] = useState<string>("");

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setListErrorMessage("Ошибка сервера");
          return;
        }
        const result = await response.json();
        setListErrorMessage("");
        setList(result);
      } catch (error) {
        console.error(error.message);
        setListErrorMessage("Ошибка сервера");
      }
    }

    getUsers();
  }, []);

  useEffect(() => {
    if (selectedId === null) return;

    async function getUsersDetails(id: number) {
      setLoading(true);
      const url = `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${id}.json`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setLoading(false);
          setInfoErrorMessage("Ошибка сервера. Попробуйте позже.");
          return;
        }
        const result = await response.json();
        setInfoErrorMessage("");
        setInfo(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error.message);
        setInfoErrorMessage("Ошибка сервера. Попробуйте позже.");
      }
    }

    getUsersDetails(selectedId);
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
