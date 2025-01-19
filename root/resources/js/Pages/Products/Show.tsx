import Carousel from "@/Components/Core/Carousel";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, Product, VariationTypeOption } from "@/types";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useMemo, useState } from "react";

const Show = ({
    auth,
    product,
    variationOptions,
}: PageProps<{ product: Product; variationOptions: number[] }>) => {
    console.log(product);
    const { data, setData, post } = useForm({
        option_ids: {} as Record<string | number, any>,
        quantity: 1,
        price: null,
    });
    const { url } = usePage();
    const [selectedOptions, setSelectedOptions] = useState<
        Record<number, VariationTypeOption>
    >([]);

    const images = useMemo(() => {
        for (let typeId in selectedOptions) {
            let option = selectedOptions[typeId];
            if (option.images.length > 0) return option.images;
        }
        return product.images;
    }, [product, selectedOptions]);

    const computedProduct: any = useMemo(() => {
        const selectedOptionIds = Object.values(selectedOptions)
            .map((op) => op.id)
            .sort();

        for (let variation of product.variations) {
            const optionIdS = variation.variation_type_option_ids.sort();
            if (arraysAreEqual(selectedOptionIds, optionIdS)) {
                return {
                    price: variation.price,
                    quantity:
                        variation.quantity === null
                            ? Number.MAX_VALUE
                            : variation.quantity,
                };
            }
        }
        return {
            price: product.price,
            quantity: product.quantity,
        };
    }, [product, selectedOptions]);

    useEffect(() => {
        for (let type of product.variationTypes) {
            const selectedOptionId: number = variationOptions[type.id];
            console.log(selectedOptionId, type.options);
            chooseOption(
                type.id,
                type.options.find(
                    (op: { id: number }) => op.id == selectedOptionId
                ),
                false
            );
        }
    }, []);

    const getOptionsIdsMap = (newOptions: object) => {
        return Object.fromEntries(
            Object.entries(newOptions).map(([a, b]) => [a, b.id])
        );
    };

    const chooseOption = (
        typeId: number,
        option: VariationTypeOption,
        updateRouter: boolean = true
    ): void => {
        setSelectedOptions((prevSelectedOptions) => {
            const newOptions = {
                ...prevSelectedOptions,
                [typeId]: option,
            };
            if (updateRouter) {
                router.get(
                    url,
                    {
                        options: getOptionsIdsMap(newOptions),
                    },
                    {
                        preserveScroll: true,
                        preserveState: true,
                    }
                );
            }

            return newOptions;
        });
    };
    const onQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData("quantity", parseInt(e.target.value));
    };

    const addToCart = () => {
        post(route("cart.store", product.id), {
            preserveScroll: true,
            preserveState: true,
            onError: (err) => {
                console.log(err);
            },
        });
    };

    const renderProductVariationTypes = () => {};

    const renderAddToCartButton = () => {};

    useEffect(() => {
        const idsMap = Object.fromEntries(
            Object.entries(selectedOptions).map(
                ([typeId, option]: [string, VariationTypeOption]) => [
                    typeId,
                    option.id,
                ]
            )
        );
        console.log(idsMap);
        setData("option_ids", idsMap);
    }, [selectedOptions]);
    return (
        <AuthenticatedLayout>
            <Head title="Home" />
            <div className="container mx-auto p-8">
                <div className="grid gap-8 grid-cols-1 lg:grid-cols-12">
                    <div className="col-span-7">
                        <Carousel images={images} />
                    </div>
                    <div className="col-span-5">
                        <h1 className="text-2xl mb-8">{product.title}</h1>
                        <div>
                            <div className="text-3xl font-semibold">
                                <CurrencyFormatter
                                    amount={computedProduct.price}
                                />
                            </div>
                        </div>

                        {/* {renderProductVariationTypes()} */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
