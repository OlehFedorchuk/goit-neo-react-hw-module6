import clsx from "clsx";
import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";

const ContactList = ({ tasks, onDelete }) => {
  return (
    <ul className={clsx(css.list)}>
      {tasks.map((task) => (
        <li key={task.id} className={clsx(css.item)}>
          <Contact data={task} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
