import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik"
import type { FormikHelpers } from "formik"
import css from "./OrderForm.module.css"
import * as Yup from "yup"


interface OrderFormValues {
  username: string;
  email: string;
  deliveryTime: string;
}

const initialValues: OrderFormValues = {
  username: "",
  email: "",
  deliveryTime: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name is too long")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  deliveryTime: Yup.string().required('Select delivery time'),
});


export default function OrderForm() {
    const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) => {
    console.log("Order data:", values);
    actions.resetForm();
  };

  const fieldId = useId();

  return (
    <Formik initialValues={initialValues} 
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
      <Form className={css.form}>
        <fieldset className={css.fieldset}>
          <legend className={css.legend}>Client Info</legend>

          <label className={css.label} htmlFor={`${fieldId}-username`}>Name</label>
          <Field className={css.field} type="text" name="username" id={`${fieldId}-username`} />
          <ErrorMessage name="username" component="span" className={css.error} />

          <label className={css.label} htmlFor={`${fieldId}-email`}>Email</label>
          <Field className={css.field} type="email" name="email" id={`${fieldId}-email`} />

          <label htmlFor={`${fieldId}-deliveryTime`}>Preferred delivery time</label>
        <Field as="select" name="deliveryTime" id={`${fieldId}-deliveryTime`}>
          <option value="">-- Choose delivery time --</option>
          <option value="morning">Morning (8:00-12:00)</option>
          <option value="afternoon">Afternoon (12:00-16:00)</option>
          <option value="evening">Evening (16:00-20:00)</option>
        </Field>
        </fieldset>


        <button className={css.btn} type="submit">Place order</button>
      </Form>
    </Formik>
  );
}

