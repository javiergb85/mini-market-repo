"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "../../shared/types";
import { useProductStore } from "../app/stores/productStore";
import { getTopCheapestAvailable } from "../utils/productUtils";
import { fetchProductById } from "../lib/api"; // Importación de la nueva función

interface ProductDetailProps {
  productId: string;
}

export const ProductDetail = ({ productId }: ProductDetailProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { products: allProducts, fetchProducts } = useProductStore();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, fetchProducts]);

  if (isLoading) return <p className="text-center">Cargando detalles...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!product)
    return <p className="text-center text-gray-500">Producto no encontrado.</p>;

  const topCheapest = getTopCheapestAvailable(allProducts, 3);
  const isTopCheapest = topCheapest.some((p) => p.id === product.id);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-xl font-semibold text-gray-700">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm text-white font-medium ${
                product.isAvailable ? "bg-green-500" : "bg-gray-500"
              }`}
            >
              {product.isAvailable ? "En stock" : "Sin stock"}
            </span>
            {isTopCheapest && (
              <span className="px-3 py-1 rounded-full text-sm text-white font-medium bg-blue-500 animate-pulse">
                🔥 Más barato
              </span>
            )}
          </div>
          <p className="text-gray-600">
            Categoría: <span className="font-semibold">{product.category}</span>
          </p>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200">
            Agregar a favoritos
          </button>
        </div>
      </div>
    </div>
  );
};
