import CategoryTable from "../features/categories/CategoryTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCategory from "../features/categories/AddCategory";

function Categories() {

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Todas las Categorias</Heading>
      </Row>

      <Row>
        <CategoryTable />

        <AddCategory />
      </Row>
    </>
  );
}

export default Categories;
