import type { Asset, Entry, EntryFields } from "contentful";
import type { TypeComponentSeoFields } from "./TypeComponentSeo";
import type { WithContentTypeLink } from "./WithContentTypeLink";

export interface TypePageProductFields {
    internalName: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    seoFields?: Entry<TypeComponentSeoFields>;
    name: EntryFields.Symbol;
    description?: EntryFields.Text;
    price: EntryFields.Number;
    featuredProductImage: Asset;
    productImages?: Asset[];
    relatedProducts?: Entry<TypePageProductFields>[];
}

export type TypePageProduct = Entry<TypePageProductFields>;

export function isTypePageProduct(entry: WithContentTypeLink): entry is TypePageProduct {
    return entry?.sys?.contentType?.sys?.id === 'pageProduct'
}
