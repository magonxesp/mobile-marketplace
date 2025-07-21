import { useCart } from "@/context/cart";
import { ShoppingCart } from "lucide-react"
import { Link } from "react-router";

export default function Header() {
  const { items } = useCart()

  return (
    <header className="py-4">
      <div className="container mx-auto flex place-content-between items-center px-4 sm:px-0">
        <Link to="/">
          <h1 className="text-2xl font-bold">Mobile Marketplace</h1>
        </Link>
        <div className="flex items-center">
          <ShoppingCart />
          <span className="text-lg font-semibold ml-2">{items}</span>
        </div>
      </div>
    </header>
  );
}
