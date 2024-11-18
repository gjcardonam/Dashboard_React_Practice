import styled from "styled-components";
import CreateCategoryForm from "./CreateCategoryForm";
import { useDeleteCategory } from "./useDeleteCategory";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCategory } from "./useCreateCategory";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Category = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Roboto";
`;

const Description = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--color-grey-600);
  font-family: "Roboto";
`;

export default function CategoryRow({ category }) {
  const { isDeliting, deleteCategory } = useDeleteCategory();
  const { isCreating: isDuplicating, createCategory } = useCreateCategory();

  const {
    id,
    name,
    description
  } = category;

  function handleDuplicate() {
    createCategory({
      name: `Copia de ${name}`,
      description
    });
  }

  return (
    <TableRow role="row">
      {/* <Img src={image} alt={name} /> */}
      <Category>{name}</Category>
      <Description>{description}</Description>
      <div>
        <button onClick={handleDuplicate} disabled={isDuplicating}>
          <HiSquare2Stack />
        </button>
        <Modal>
          <Modal.Open opens="edit">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCategoryForm categoryToEdit={category} />
          </Modal.Window>

          <Modal.Open opens="delete">
            <button disabled={isDeliting}>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete resourceName='categories'
            disable={isDeliting}
            onConfirm={() => deleteCategory(id)} />
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
  );
}
