import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CategoryRow from "./CategoryRow";
import { useCategories } from "./useCategories";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

export default function CategoryTable() {
  
  const { isLoading, categories, error } = useCategories()

  if (isLoading) return <Spinner />

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>Nombre</div>
        <div>Descripción</div>
        <div></div>
      </TableHeader>
      {categories.map((category) => (
        <CategoryRow key={category.id} category={category} />
      ))}
    </Table>
  )
}
