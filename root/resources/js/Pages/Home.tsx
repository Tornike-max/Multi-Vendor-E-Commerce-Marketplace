import ProductItem from "@/Components/App/ProductItem";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, PaginationProps, Product } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Home({
    auth,
    products,
}: PageProps<{ products: PaginationProps<Product> }>) {
    console.log(products);

    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <AuthenticatedLayout>
            <Head title="Home" />
            <div className="hero bg-gray-800 min-h-[300px]">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
            <div className="w-full grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 p-8">
                {products.data.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
