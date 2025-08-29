import { Router, Request, Response } from 'express';
import productsData from '../data/products.json';
import { Product } from '../../../shared/types';

const router = Router();

// GET /api/products
router.get('/', (req: Request, res: Response) => {
  let products: Product[] = productsData;

  const { search, sort, order, page, limit, available } = req.query;

  // Filtro por disponibilidad
  if (available) {
    products = products.filter(p => p.isAvailable === (available === 'true'));
  }

  // Filtro por búsqueda
  if (search) {
    const searchTerm = (search as string).toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  }

  // Ordenación
  if (sort && order) {
    const sortBy = sort as keyof Product;
    products.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return order === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Paginación
  const pageNumber = parseInt(page as string, 10) || 1;
  const pageSize = parseInt(limit as string, 10) || 10;
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedProducts = products.slice(startIndex, endIndex);

  res.json({
    products: paginatedProducts,
    total: products.length,
    page: pageNumber,
    limit: pageSize
  });
});

// GET /api/products/:id
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const product = productsData.find(p => p.id === id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

export default router;