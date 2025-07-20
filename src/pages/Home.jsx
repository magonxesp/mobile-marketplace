import ItemGrid from "@/components/ItemGrid";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
    const [search, setSearch] = useState('');

    const searchItems = (items) => {
        if (search === '') {
            return items
        }

        return items.filter(item => {
            const brand = item.brand.toLowerCase()
            const model = item.model.toLowerCase()
            const itemName = `${brand} ${model}`

            return itemName.includes(search)
        });
    } 

    const { data, isPending } = useQuery({
        queryKey: ['products', search],
        queryFn: async () => 
            fetch('https://itx-frontend-test.onrender.com/api/product')
                .then(response => response.json())
                .then(searchItems)
    })

    const Loading = () => (
        <p>Loading...</p>
    )

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-end w-full mb-4">
                <Input
                    type="text"
                    placeholder="Search items..."
                    className="w-full md:w-1/3 "
                    onChange={(event) => setSearch(event.target.value)}
                />
            </div>
            {isPending ? (
                <Loading />
            ) : (
                <ItemGrid items={data ?? []} />
            )}
        </div>
    );
}