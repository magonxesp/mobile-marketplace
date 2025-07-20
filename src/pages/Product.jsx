import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Product() {
    const params = useParams()
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedStorage, setSelectedStorage] = useState('');

    const { data, isPending } = useQuery({
        queryKey: ['product', params.productId],
        queryFn: () => fetch(`https://itx-frontend-test.onrender.com/api/product/${params.productId}`)
            .then(response => response.json())
    })

    useEffect(() => {
        if (data == null) {
            return
        }

        if (data.options.colors != null && data.options.colors.length > 0) {
            setSelectedColor(data.options.colors[0].code)
        }

        if (data.options.storages != null && data.options.storages.length > 0) {
            setSelectedStorage(data.options.storages[0].code)
        }
    }, [data])

    if (isPending) {
        return <p>Loading...</p>
    }

    return (
        <div className="container mx-auto py-4">
            <h1>{data.brand} {data.model}</h1>
            <div className="flex justify-center">
                <Card>
                    <CardContent>
                        <img src={data.imgUrl} />
                    </CardContent>
                </Card>
                <div className="ml-10">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Description
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul>
                                {[
                                    'networkTechnology',
                                    'networkSpeed',
                                    'sim',
                                    'displayType',
                                    'displayResolution',
                                    'displaySize',
                                    'cpu',
                                    'os',
                                    'battery'
                                ].map((key, index) => (
                                    <li key={index}>{data[key]}</li>
                                ))}
                            </ul>
                            <p className="text-lg font-semibold mt-4">{data.price ?? 0} €</p>
                        </CardContent>
                    </Card>
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>
                                Options
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm leading-none font-medium mb-2">Color</p>
                            {data.options.colors.map((color) => (
                                <Toggle 
                                    className="mr-2 last:mr-0" 
                                    active={selectedColor === color.code}
                                    key={color.code} 
                                    variant="outline"
                                    onClick={() => setSelectedColor(color.code)}
                                >
                                    {color.name}
                                </Toggle>
                            ))}
                            <p className="text-sm leading-none font-medium mt-4 mb-2">Storage</p>
                            {data.options.storages.map((storage) => (
                                <Toggle 
                                    className="mr-2 last:mr-0" 
                                    active={selectedStorage === storage.code}
                                    key={storage.code} 
                                    variant="outline"
                                    onClick={() => setSelectedStorage(storage.code)}
                                >
                                    {storage.name}
                                </Toggle>
                            ))}                            
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}