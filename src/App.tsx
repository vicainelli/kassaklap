import { Button } from "@/components/ui/button";
import "./index.css";
import { ProductSearch } from "@/components/product-search";

const popularSearches = ["Milk", "Bread", "Eggs", "Bananas", "Chicken breast", "Rice", "Pasta", "Tomatoes"]

const setSearchQuery = (item: string) => console.log(`Search for: ${item}`);

export function App() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header>
        <div>
          <code>kassaklap</code>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-[family-name:var(--font-space-grotesk)]">
              Find the Best Grocery Prices
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Compare prices across multiple stores and discover the best deals per unit. Save money on your weekly
              shopping with real-time price comparisons.
            </p>
          </div>
          {/* comming soon message */}
          <p>
            <code>kassaklap</code> is coming soon!
          </p>
        </div>
      </main>


      {/* <div className="max-w-xl mx-auto">
        <ProductSearch />
      </div> */}

          {/* Popular Searches */}
          {/* <div className="mb-12">
            <h3 className="text-lg font-semibold text-center text-foreground mb-4 font-[family-name:var(--font-space-grotesk)]">
              Popular Searches
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSearches.map((item) => (
                <Button
                  key={item}
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery(item)}
                  className="rounded-full hover:bg-accent hover:text-accent-foreground"
                >
                  {item}
                </Button>
              ))}
            </div>
          </div> */}
    </div>
  );
}

export default App;
