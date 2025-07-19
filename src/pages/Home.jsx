import ItemGrid from "@/components/ItemGrid";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function Home() {
    const [allItems, setAllItems] = useState([]);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch('https://itx-frontend-test.onrender.com/api/product')
            .then(response => response.json())
            .then(data => {
                setItems(data)
                setAllItems(data)
                setIsLoading(false)
            })
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    const handleSearch = (event) => {
        const searchTerms = event.target.value.trim().toLowerCase();

        if (searchTerms === "") {
            setItems(allItems);
            return;
        }

        const searchResult = allItems.filter(item => {
            const brand = item.brand.toLowerCase()
            const model = item.model.toLowerCase()
            const itemName = `${brand} ${model}`

            return itemName.includes(searchTerms)
        })

        setItems(searchResult);
    }

    const Loading = () => (
        <p>Loading...</p>
    )

    const Items = () => (
        <>
            <div className="flex justify-end w-full mb-4">
                <Input
                    type="text"
                    placeholder="Search items..."
                    className="w-full md:w-1/3 "
                    onChange={handleSearch}
                />
            </div>
            <ItemGrid items={items} />
        </>
    )

    return (
        <div className="container mx-auto p-4">
            {isLoading ? <Loading /> : <Items />}
        </div>
    );
}