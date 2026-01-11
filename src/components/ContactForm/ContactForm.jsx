import { nanoid } from "nanoid";
import { Field, Form, Formik, ErrorMessage } from "formik";
import clsx from "clsx";
import css from "./ContactForm.module.css";
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

const ContactForm = () => {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const numberFieldId = useId();

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z+\-\s()]+$/, "Only letters")
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .matches(/^[0-9+\-\s()]+$/, "Only digits and phone symbols")
      .min(3, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    dispatch(addContact(newContact));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
      validateOnChange
      validateOnBlur
    >
      <Form className={clsx(css.formContainer)}>
        <label htmlFor={nameFieldId}>Name</label>
        <Field
          type="text"
          name="name"
          id={nameFieldId}
          className={clsx(css.field)}
        />
        <ErrorMessage name="name" component="p" className={clsx(css.error)} />

        <label htmlFor={numberFieldId}>Number</label>
        <Field
          type="text"
          name="number"
          id={numberFieldId}
          className={clsx(css.field)}
        />
        <ErrorMessage name="number" component="p" className={clsx(css.error)} />

        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
