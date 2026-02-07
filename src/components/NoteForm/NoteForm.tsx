import css from "./NoteForm.module.css";
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";

type NoteFormValues = {
  title: string;
  content: string;
  tag: string;
};

interface NoteFormProps {
  onClose: () => void;
}

const schema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  content: Yup.string().trim(),
  tag: Yup.string().required("Required"),
});

function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: "Todo",
  };

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  const handleSubmit = async (
    values: NoteFormValues,
    helpers: FormikHelpers<NoteFormValues>,
  ) => {
    try {
      await mutation.mutateAsync(values);
      helpers.resetForm();
    } catch {
      console.log("error");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" type="text" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              onClick={onClose}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={css.submitButton}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create note"}
            </button>
          </div>

          {mutation.isError && (
            <span className={css.error}>Failed to create note. Try again.</span>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default NoteForm;
