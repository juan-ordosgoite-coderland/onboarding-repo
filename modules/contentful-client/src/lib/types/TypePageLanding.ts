import type { Asset, Entry, EntryFields } from "contentful";
import type { TypeComponentSeoFields } from "./TypeComponentSeo.js";
import type { TypePageProductFields } from "./TypePageProduct.js";
import type { WithContentTypeLink } from "./WithContentTypeLink.js";

export interface TypePageLandingFields {
    internalName: EntryFields.Symbol;
    seoFields?: Entry<{ contentTypeId: 'componentSeo', fields: TypeComponentSeoFields }>;
    heroBannerHeadline: EntryFields.Symbol;
    heroBannerHeadlineColor?: EntryFields.Symbol;
    heroBannerImage: Asset;
    products?: Entry<{ contentTypeId: 'pageProduct', fields: TypePageProductFields }>[];
}

export type TypePageLanding = Entry<{ contentTypeId: 'pageLanding', fields: TypePageLandingFields }>;

export function isTypePageLanding(entry: WithContentTypeLink): entry is TypePageLanding {
    return entry?.sys?.contentType?.sys?.id === 'pageLanding'
}
