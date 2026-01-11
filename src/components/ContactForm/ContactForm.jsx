import { nanoid } from "nanoid";
import { Field, Form, Formik, ErrorMessage } from "formik";
import clsx from "clsx";
import css from "./ContactForm.module.css";
import { useId } from "react";
import * as Yup from "yup";

const ContactForm = ({ onAdd, initialValues = { name: "", number: "" } }) => {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-z A-Z+\-\s()]+$/, "Only letters")
      .min(3, "To Short!")
      .max(50, "To Long!")
      .required("Required"),
    number: Yup.string()
      .min(3, "To Short!")
      .max(20, "To Long!")
      .required("Required")
      .matches(/^[0-9+\-\s()]+$/, "Only digits and phone symbols"),
  });

  const handleSubmit = (values, actions) => {
    onAdd({
      id: nanoid(),
      name: values.name,
      number: values.number,
    });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
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
        <ErrorMessage
          name="name"
          component="p"
          id={nameFieldId}
          className={clsx(css.error)}
        />
        <label htmlFor={numberFieldId}>Number</label>
        <Field type="text" name="number" id={numberFieldId} />
        <ErrorMessage
          name="number"
          component="p"
          id={numberFieldId}
          className={clsx(css.error)}
        />
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
