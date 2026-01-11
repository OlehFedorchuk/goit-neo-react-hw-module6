import { FaUser, FaPhoneAlt } from "react-icons/fa";
import clsx from "clsx";
import css from "./Contact.module.css";
const Contact = ({ data: { id, name, number }, onDelete }) => {
  return (
    <div className={clsx(css.item)}>
      <div className={clsx(css.info)}>
        <div className={clsx(css.row)}>
          <FaUser className={clsx(css.icon)} />
          <p>{name}</p>
        </div>
        <div className={clsx(css.row)}>
          <FaPhoneAlt className={clsx(css.icon)} />
          <address>{number}</address>
        </div>
      </div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};
export default Contact;
