import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import Selection from "../../ui/Select";
import FormRow from "../../ui/FormRow";
import { useCategories } from "../categories/useCategories";

import { useCreateProduct } from "./useCreateProduct";
import { useEditProduct } from "./useEditProduct";

function CreateProductForm({ productToEdit = {}, onCloseModal }) {
  const { isCreating, createProduct } = useCreateProduct();
  const { isEditing, editProduct } = useEditProduct();
  const { isLoadingCategories, categories = [], errorCategories } = useCategories()
  const isWorking = isCreating || isEditing || isLoadingCategories;

  const { id: editId, ...editValues } = productToEdit;
  const isEditSession = Boolean(editId);

  const defaultValues = isEditSession
    ? {
      ...editValues,
      category: editValues.category.id,
    }
    : {};

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues
  });

  const { errors } = formState;

  function onSubmit(data) {

    const processedData = {
      ...data,
      price: Number(data.price),
      stockQuantity: Number(data.stockQuantity),
    };

    const selectedCategoryId = data.category;

    const selectedCategory = categories.find(category => category.id == selectedCategoryId)
    
    if (isEditSession)
      editProduct(
        { newProductData: { ...processedData, category: selectedCategory }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createProduct(
        { ...processedData, category: selectedCategory },
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

      <FormRow label="Categoría" error={errors?.category?.message}>
        <Selection
          disabled={isWorking}
          id="category"
          {...register("category", {
            required: "Este campo es requerido",
          })}
        >
          <option value="">Seleccione una categoría</option>
          {isLoadingCategories ? (
            <option value="">Loading categories...</option>
          ) : (
            categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))
          )}
        </Selection>
      </FormRow>

      <FormRow label="Precio" error={errors?.price?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="price"
          {...register("price", {
            required: "Este campo es requerido",
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow label="Cantidad en Bodega" error={errors?.stockQuantity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="stockQuantity"
          {...register("stockQuantity", {
            required: "Este campo es requerido",
          })}
          defaultValue={0}
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
          {isEditSession ? "Editar Producto" : "Crear Producto"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateProductForm;
