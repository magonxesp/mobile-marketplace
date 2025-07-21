import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { useCart } from "@/context/cart";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function Product() {
  const params = useParams();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const { addItems } = useCart()

  const { data, isPending } = useQuery({
    queryKey: ["product", params.productId],
    queryFn: () =>
      fetch(
        `https://itx-frontend-test.onrender.com/api/product/${params.productId}`
      ).then((response) => response.json()),
  });

  useEffect(() => {
    if (data == null) {
      return;
    }

    if (data.options.colors != null && data.options.colors.length > 0) {
      setSelectedColor(data.options.colors[0].code);
    }

    if (data.options.storages != null && data.options.storages.length > 0) {
      setSelectedStorage(data.options.storages[0].code);
    }
  }, [data]);

  const addToCart = () => {
    const request = fetch("https://itx-frontend-test.onrender.com/api/cart", {
      method: 'POST',
      body: JSON.stringify({
        id: data.id,
        colorCode: selectedColor,
        storageCode: selectedStorage
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    request
      .then(response => response.json())
      .then(response => addItems(response.count))
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.brand} {data.model}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-fit mx-auto p-4 flex flex-col items-center">
        <h2 className="self-start scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mb-4">
          {data.brand} {data.model}
        </h2>
        <div className="flex flex-col md:flex-row">
          <Card className="h-fit mb-4">
            <CardContent className="flex justify-center">
              <img src={data.imgUrl} />
            </CardContent>
          </Card>
          <div className="md:ml-4">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <ul>
                  {[
                    "networkTechnology",
                    "networkSpeed",
                    "sim",
                    "displayType",
                    "displayResolution",
                    "displaySize",
                    "cpu",
                    "os",
                    "battery",
                  ].map((key, index) => (
                    <li key={index}>{data[key]}</li>
                  ))}
                </ul>
                <p className="text-lg font-semibold mt-4">{data.price ?? 0} €</p>
              </CardContent>
            </Card>
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Options</CardTitle>
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
                <p className="text-sm leading-none font-medium mt-4 mb-2">
                Storage
                </p>
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
            <Button className="mt-4 w-full" onClick={addToCart}>Add to cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
