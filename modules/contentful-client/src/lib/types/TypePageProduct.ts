import type { Asset, Entry, EntryFields } from "contentful";
import type { TypeComponentSeoFields } from "./TypeComponentSeo.js";
import type { WithContentTypeLink } from "./WithContentTypeLink.js";

export interface TypePageProductFields {
    internalName: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    seoFields?: Entry<{ contentTypeId: 'componentSeo', fields: TypeComponentSeoFields }>;
    name: EntryFields.Symbol;
    description?: EntryFields.Text;
    price: EntryFields.Number;
    featuredProductImage: Asset;
    productImages?: Asset[];
    relatedProducts?: Entry<{ contentTypeId: 'pageProduct', fields: TypePageProductFields }>[];
}

export type TypePageProduct = Entry<{ contentTypeId: 'pageProduct', fields: TypePageProductFields }>;

export function isTypePageProduct(entry: WithContentTypeLink): entry is TypePageProduct {
    return entry?.sys?.contentType?.sys?.id === 'pageProduct'
}
