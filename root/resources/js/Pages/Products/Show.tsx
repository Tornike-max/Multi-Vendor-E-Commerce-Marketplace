import Carousel from "@/Components/Core/Carousel";
import CurrencyFormatter from "@/Components/Core/CurrencyFormatter";
import { arraysAreEqual } from "@/Helpers/helpers";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Image,
    PageProps,
    Product,
    VariationType,
    VariationTypeOption,
} from "@/types";
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
            if (option?.images?.length > 0) return option?.images;
        }
        return product?.images;
    }, [product, selectedOptions]);

    const computedProduct: any = useMemo(() => {
        const selectedOptionIds = Object.values(selectedOptions)
            ?.map((op) => op?.id)
            ?.sort();

        for (let variation of product?.variations) {
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
        for (let type of product?.variationTypes) {
            const selectedOptionId: number = variationOptions[type.id];
            console.log(selectedOptionId, type.options);
            chooseOption(
                type.id,
                type?.options?.find(
                    (op: { id: number }) => op.id == selectedOptionId
                ) as VariationTypeOption,
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

    const renderProductVariationTypes = () => {
        return product?.variationTypes.map(
            (type: {
                id: React.Key | null | undefined;
                name:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                type: string;
                options: any[];
            }) => (
                <div key={type.id} className="my-2">
                    <b>{type.name}</b>
                    {type.type === "Image" && (
                        <div className="flex gap-2 mb-4">
                            {type.options.map(
                                (option: {
                                    id: number;
                                    images: Image[];
                                    name?: string;
                                    type?: VariationType;
                                }) => (
                                    <div
                                        onClick={() =>
                                            chooseOption(type?.id as number, {
                                                ...option,
                                                name: option.name || "",
                                            })
                                        }
                                        key={option.id}
                                    >
                                        {option.images && (
                                            <img
                                                src={option.images[0].thumb}
                                                alt=""
                                                className={`w-[50px] ${
                                                    selectedOptions[
                                                        type?.id as number
                                                    ]?.id === option?.id
                                                        ? "outline outline-4 outline-primary"
                                                        : ""
                                                }`}
                                            />
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    )}
                    {type.type === "Radio" && (
                        <div className="flex join mb-4">
                            {type.options.map(
                                (option: {
                                    id: number;
                                    name: any;
                                    images?: Image[];
                                    type?: VariationType;
                                }) => (
                                    <input
                                        onChange={() =>
                                            chooseOption(type?.id, option)
                                        }
                                        key={option.id}
                                        className="join-item btn"
                                        type="radio"
                                        value={option.id}
                                        checked={
                                            selectedOptions[type.id]?.id ===
                                            option.id
                                        }
                                        name={"variation_type_" + type.id}
                                        aria-label={option.name}
                                    />
                                )
                            )}
                        </div>
                    )}
                </div>
            )
        );
    };

    const renderAddToCartButton = () => {
        return (
            <div className="my-6 flex gap-4">
                <select
                    value={data.quantity}
                    onChange={onQuantityChange}
                    className="select select-bordered w-full"
                >
                    {Array.from({
                        length: Math.min(10, computedProduct.quantity),
                    }).map((el, i) => (
                        <option key={i + 1} value={i + 1}>
                            quantity {i + 1}
                        </option>
                    ))}
                </select>
                <button className="btn btn-primary" onClick={addToCart}>
                    Add to Cart
                </button>
            </div>
        );
    };

    useEffect(() => {
        const idsMap = Object.fromEntries(
            Object.entries(selectedOptions).map(
                ([typeId, option]: [string, VariationTypeOption]) => [
                    typeId,
                    option?.id,
                ]
            )
        );
        console.log(idsMap);
        setData("option_ids", idsMap);
    }, [selectedOptions]);

    return (
        <AuthenticatedLayout>
            <Head title={product.title} />
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

                        {renderProductVariationTypes()}

                        {computedProduct.quantity != undefined &&
                            computedProduct.quantity < 10 && (
                                <div className="text-error my-4">
                                    <span>
                                        Only {computedProduct.quantity} left
                                    </span>
                                </div>
                            )}
                        {renderAddToCartButton()}

                        <b className="text-xl">About the Item</b>
                        <div
                            className="wysiwyg-output"
                            dangerouslySetInnerHTML={{
                                __html: product.description,
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
