import { Product } from "../../shared/types";

const API_URL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

/**
 * Fetches product data from the API endpoint.
 * @returns A promise that resolves with an array of products.
 */
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/api/products`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const data = await response.json();

    return data.products;
  } catch (err) {
    console.error("Error fetching products:", err);

    throw new Error("Failed to fetch products");
  }
};

/**
 * Fetches a single product by its ID from the API endpoint.
 * @param id The ID of the product to fetch.
 * @returns A promise that resolves with a single product.
 */
export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch product with ID ${id}: ${response.statusText}`
      );
    }

    const data: Product = await response.json();

    return data;
  } catch (err) {
    console.error(`Error fetching product with ID ${id}:`, err);

    throw new Error("Producto no encontrado");
  }
};
