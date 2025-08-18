import Fuse, { type IFuseOptions } from 'fuse.js';
import productsData from '@/data/supermarkets.json';

const fuseOptions: IFuseOptions<ProductsData> = {
  keys: [
    'd.n' // search within product names
  ],
  includeScore: true,
  threshold: 0.4, // adjust sensitivity of search
  shouldSort: true
};

function searchProducts(searchTerm: string) {
  // Perform Fuse search across all supermarkets
  const searchResults = fuse.search(searchTerm);

  // Process and log search results
  searchResults.forEach(result => {
    const supermarketData = result.item;
    const matchedProducts = result.item.d.filter(product =>
      product.n.toLowerCase().includes(searchTerm.toLowerCase())
    );

    matchedProducts.forEach(product => {
      console.log(`Supermarket: ${supermarketData.n}, Product: ${product.n}, Link: ${product.l}`);
    });
  });
}

// Example usage
const SEARCH_TERM = 'sukade';

interface Product {
  n: string;  // product Name
  p: number;  // Price
  s: string;  // Size/Serving
  l: string;  // Location/Link/ID
}

interface ProductsData {
  n: string; // supermarket name
  d: Product[]
}

// Type assertion for productsData
const typedProductsData: ProductsData[] = productsData as ProductsData[];

const fuse = new Fuse(typedProductsData, fuseOptions);


// Search and log products
searchProducts(SEARCH_TERM);
