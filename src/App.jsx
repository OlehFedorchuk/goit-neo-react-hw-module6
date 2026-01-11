import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";

function App() {
  const initData = [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ];
  const [tasks, setTasks] = useState(() => {
    const saveContacts = localStorage.getItem("contacts");
    return saveContacts ? JSON.parse(saveContacts) : initData;
  });

  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const visibleTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addTask} />
      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList tasks={visibleTasks} onDelete={deleteTask} />
    </div>
  );
}

export default App;
