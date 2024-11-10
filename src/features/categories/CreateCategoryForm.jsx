import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCategory } from "./useCreateCategory";
import { useEditCategory } from "./useEditCategory";

function CreateCategoryForm({ categoryToEdit = {}, onCloseModal }) {
  const { isCreating, createCategory } = useCreateCategory();
  const { isEditing, editCategory } = useEditCategory();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = categoryToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  function onSubmit(data) {

    if (isEditSession)
      editCategory(
        { newCategoryData: { ...data }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCategory(
        { ...data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.error(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label="Nombre" error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: "Este campo es requerido",
          })}
        />
      </FormRow>

      <FormRow label="Descripción" error={errors?.description?.message}>
        <Textarea
          disabled={isWorking}
          type="text"
          id="description"
          {...register("description", {
            required: "Este campo es requerido",
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Editar Categoría" : "Crear Categoría"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCategoryForm;
