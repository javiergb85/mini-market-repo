import { ProductDetail } from "../../../components/ProductDetail";

 

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {

  const { id } = await params

  
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <ProductDetail productId={id} />
    </main>
  );
}