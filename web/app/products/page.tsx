import { ProductList } from "../../components/ProductList";


export default function ProductsPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Catálogo de Productos</h1>
      <ProductList />
    </main>
  );
}