export const API_BASE_URL =
  "https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products";

export const fetchProducts = async (page, search, category) => {
  const params = new URLSearchParams();

  params.append("page", page > 0 ? page : 1);
  if (search) params.append("search", search);
  if (category) params.append("category", category);

  const url = `https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  return await response.json();
};

export const fetchProductDetails = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  return response.json();
};
