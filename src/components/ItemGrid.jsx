import { Link } from "react-router";
import ItemCard from "./ItemCard";

export default function ItemGrid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Link to={`/product/${item.id}`} key={item.id}>
          <ItemCard item={item} />
        </Link>
      ))}
    </div>
  );
}
