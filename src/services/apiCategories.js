import axios from "axios";

axios.defaults.withCredentials = true;

const apiUrl = "https://apimana.onrender.com/api/categories";

export async function getCategories() {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los categorias");
  }
}

export async function createEditCategory(newCategory, id = null) {
  try {
    const response = await axios({
      method: id ? "put" : "post",
      url: id ? `${apiUrl}/${id}` : apiUrl,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name: newCategory.name,
        description: newCategory.description
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error al ${id ? "editar" : "crear"} la categoria`);
  }
}

// Eliminar un categoryo
export async function deleteCategory(id) {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al eliminar la categoria");
  }
}
