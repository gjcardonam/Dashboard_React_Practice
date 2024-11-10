import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCategoryForm from "./CreateCategoryForm";

export default function AddCategory() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="category-form">
          <Button>Agregar una Categoría Nueva</Button>
        </Modal.Open>
        <Modal.Window name="category-form">
          <CreateCategoryForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
