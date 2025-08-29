import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../shared/types';
 

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const badgeColor = product.isAvailable ? 'bg-green-500' : 'bg-gray-500';
  const badgeText = product.isAvailable ? 'En stock' : 'Sin stock';

  return (
    <Link href={`/products/${product.id}`} className="block">
      <div className="border rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-base font-semibold text-gray-800">{product.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs text-white ${badgeColor}`}>
              {badgeText}
            </span>
          </div>
          <p className="text-gray-600 text-sm">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};