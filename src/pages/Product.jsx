import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function Product() {
    const params = useParams()

    const { data, isPending } = useQuery({
        queryKey: ['product', params.productId],
        queryFn: () => fetch(`https://itx-frontend-test.onrender.com/api/product/${params.productId}`)
            .then(response => response.json())
    })

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
                                <Toggle key={color.code} variant="outline">
                                    {color.name}
                                </Toggle>
                            ))}
                            <p className="text-sm leading-none font-medium mt-4 mb-2">Storage</p>
                            {data.options.storages.map((storage) => (
                                <Toggle key={storage.code} variant="outline">
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