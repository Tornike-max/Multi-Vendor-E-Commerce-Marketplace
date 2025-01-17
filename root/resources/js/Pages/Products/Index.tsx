import { PageProps, Product } from "@/types";
import React from "react";

const Index = ({
    auth,
    product,
    variationOptions,
}: PageProps<{ product: Product; variationOptions: number[] }>) => {
    console.log(variationOptions);
    return <div>Index</div>;
};

export default Index;
