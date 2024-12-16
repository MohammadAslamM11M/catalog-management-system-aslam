import axios from "axios";

export const API_BASE_URL =
  "https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products";

export const fetchProducts = async (page, search, category) => {
  const params = {
    page: page > 0 ? page : 1,
    ...(search && { search }),
    ...(category && { category }),
  };

  try {
    const response = await axios.get(API_BASE_URL, {
      params,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch products: ${error.response?.statusText || error.message}`
    );
  }
};

export const fetchProductDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch product details: ${error.response?.statusText || error.message}`
    );
  }
};
