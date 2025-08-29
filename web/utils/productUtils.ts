import { Product } from "../../shared/types";



/**
 * Filtra los productos disponibles y devuelve los N más baratos.
 * @param products - Array de productos.
 * @param top - Número de productos a devolver (por defecto 3).
 * @returns Los N productos disponibles más baratos.
 */
export const getTopCheapestAvailable = (products: Product[], top: number = 3): Product[] => {
  const availableProducts = products.filter(p => p.isAvailable);
  const sortedProducts = availableProducts.sort((a, b) => a.price - b.price);
  return sortedProducts.slice(0, top);
};