"use client";

import { useEffect, useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { useProductStore } from "../app/stores/productStore";

export const ProductList = () => {
  const { products, isLoading, error, fetchProducts } = useProductStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAvailable, setIsAvailable] = useState<boolean | "all">("all");
  const [sortBy, setSortBy] = useState<"price" | "name" | "none">("none");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (isAvailable !== "all") {
      result = result.filter((p) => p.isAvailable === isAvailable);
    }

    if (searchTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy !== "none") {
      result = [...result].sort((a, b) => {
        if (sortBy === "price") {
          return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
        } else {
          return sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
      });
    }

    return result;
  }, [products, searchTerm, isAvailable, sortBy, sortOrder]);

  if (isLoading) return <p>Cargando productos...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <span>Disponibilidad:</span>
            <select
              value={isAvailable.toString()}
              onChange={(e) =>
                setIsAvailable(
                  e.target.value === "all" ? "all" : e.target.value === "true"
                )
              }
              className="p-2 border rounded-lg"
            >
              <option value="all">Todos</option>
              <option value="true">En stock</option>
              <option value="false">Sin stock</option>
            </select>
          </label>
          <label className="flex items-center gap-2">
            <span>Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "price" | "name" | "none")
              }
              className="p-2 border rounded-lg"
            >
              <option value="none">Sin ordenar</option>
              <option value="name">Nombre</option>
              <option value="price">Precio</option>
            </select>
          </label>
          <label className="flex items-center gap-2">
            <span>Orden:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="p-2 border rounded-lg"
            >
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
