import { PageProps, Product } from "@/types";
import React from "react";

const Show = ({
    auth,
    product,
    variationOptions,
}: PageProps<{ product: Product; variationOptions: number[] }>) => {
    console.log(product);
    return <div>Show</div>;
};

export default Show;
