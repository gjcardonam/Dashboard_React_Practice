import axios from "axios";

axios.defaults.withCredentials = true;

const apiUrl = "http://localhost:8080/api/products";

// Obtener productos
export async function getProducts() {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los productos");
  }
}

export async function createEditProduct(newProduct, id = null) {

  try {
    const response = await axios({
      method: id ? "put" : "post",
      url: id ? `${apiUrl}/${id}` : apiUrl,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
        stockQuantity: newProduct.stockQuantity,
      },
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error al ${id ? "editar" : "crear"} el producto`);
  }
}

// Eliminar un producto
export async function deleteProduct(id) {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar el producto");
  }
}
