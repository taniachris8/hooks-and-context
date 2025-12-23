import type { UserProps } from "../App";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

type ListProps = {
    list: UserProps[];
    onSelect: (id: number) => void;
};

export function List({ list, onSelect }: ListProps) {
  return (
    <>
      <Form.Select
        onChange={(e) => onSelect(Number(e.target.value))}
        className=""
        aria-label="Default select example">
        {list &&
          list.map((user: UserProps) => (
            <option key={user.id} value={user.id} className="user">
              {user.name}
            </option>
          ))}
      </Form.Select>
    </>
  );
}
