import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

/**
 * @typedef {Object} Item
 * @property {string} id
 * @property {string} brand
 * @property {string} model
 * @property {string} price
 * @property {string} imgUrl
 */

/**
 * Item Card component to display item details.
 * 
 * @param {Object} param0
 * @param {Item} param0.item
 */
export default function ItemCard({ item }) {
    const brand = item?.brand ?? 'unknown'
    const model = item?.model ?? 'unknown'

    return (
        <Card>
            <CardContent>
                <div className="flex justify-center w-full h-24 mb-4">
                    <img className="h-full" src={item?.imgUrl} alt={`${brand} ${model}`} />
                </div>  
                <CardTitle>{brand} {model}</CardTitle>
                {item?.price && (
                    <CardDescription>{item.price} €</CardDescription>
                )}
            </CardContent>
        </Card>
    )
}