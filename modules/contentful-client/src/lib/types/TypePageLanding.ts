import type { Asset, Entry, EntryFields } from "contentful";
import type { TypeComponentSeoFields } from "./TypeComponentSeo";
import type { TypePageProductFields } from "./TypePageProduct";
import type { WithContentTypeLink } from "./WithContentTypeLink";

export interface TypePageLandingFields {
    internalName: EntryFields.Symbol;
    seoFields?: Entry<TypeComponentSeoFields>;
    heroBannerHeadline: EntryFields.Symbol;
    heroBannerHeadlineColor?: EntryFields.Symbol;
    heroBannerImage: Asset;
    products?: Entry<TypePageProductFields>[];
}

export type TypePageLanding = Entry<TypePageLandingFields>;

export function isTypePageLanding(entry: WithContentTypeLink): entry is TypePageLanding {
    return entry?.sys?.contentType?.sys?.id === 'pageLanding'
}
