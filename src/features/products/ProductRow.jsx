import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateProductForm from "./CreateProductForm";
import { useDeleteProduct } from "./useDeleteProduct";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateProduct } from "./useCreateProduct";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Product = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Roboto";
`;

const Description = styled.div`
  font-family: "Roboto";
  font-weight: 500;
`;

const Category = styled.div`
  font-family: "Roboto";
  font-weight: 500;
`;

const Price = styled.div`
  font-family: "Roboto";
  font-weight: 500;
`;

const StockQuantity = styled.div`
  font-family: "Roboto";
  font-weight: 500;
`;

export default function ProductRow({ product }) {
  const { isDeliting, deleteProduct } = useDeleteProduct();
  const { isCreating: isDuplicating, createProduct } = useCreateProduct();

  const {
    id,
    name,
    description,
    category,
    price,
    stockQuantity
  } = product;

  function handleDuplicate() {
    createProduct({
      name: `Copia de ${name}`,
      description,
      category,
      price,
      stockQuantity
    });
  }

  return (
    <TableRow role="row">
      {/* <Img src={image} alt={name} /> */}
      <Product>{name}</Product>
      <Description>{description}</Description>
      <Category>{category.name}</Category>
      <Price>{formatCurrency(price)}</Price>
      <StockQuantity>{stockQuantity}</StockQuantity>
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
            <CreateProductForm productToEdit={product} />
          </Modal.Window>

          <Modal.Open opens="delete">
            <button disabled={isDeliting}>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete resourceName='products'
            disable={isDeliting}
            onConfirm={() => deleteProduct(id)} />
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
  );
}
