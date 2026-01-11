import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { deleteContact } from "../../redux/contactsSlice";

const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.filters.name);

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={clsx(css.list)}>
      {visibleContacts.map((contact) => (
        <li key={contact.id} className={clsx(css.item)}>
          <Contact
            data={contact}
            onDelete={() => dispatch(deleteContact(contact.id))}
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
