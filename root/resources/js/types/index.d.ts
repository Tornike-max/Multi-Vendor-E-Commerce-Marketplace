import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};

export type Product = {
    id: number;
    title: string;
    slug: string;
    price: number;
    quantity: number;
    image: string;
    user: {
        id: number;
        name: string;
    };
    department: {
        id: number;
        name: string;
    };
};

export type Image = {
    id: number;
    thumb: string;
    small: string;
    large: string;
};

export type VariationTypeOptions = {
    images: Image[];
    name: string;
    id: number;
    type: VariationType;
};

export type VariationType = {
    id: number;
    name: string;
    type: "select" | "radio" | "image";
    options: VariationTypeOptions[];
};

export type PaginationProps<T> = {
    data: Array<T>;
};
