import ProductTable from "../features/products/ProductTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddProduct from "../features/products/AddProduct";

function Products() {

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Todos los Productos</Heading>
      </Row>

      <Row>
        <ProductTable />

        <AddProduct />
      </Row>
    </>
  );
}

export default Products;
