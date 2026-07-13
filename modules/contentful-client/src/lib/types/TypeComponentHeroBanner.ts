import type { Asset, Entry, EntryFields } from "contentful";
import type { WithContentTypeLink } from "./WithContentTypeLink";

export interface TypeComponentHeroBannerFields {
    title?: EntryFields.Symbol;
    description?: EntryFields.Symbol;
    backgroundImage?: Asset;
}

export type TypeComponentHeroBanner = Entry<TypeComponentHeroBannerFields>;

export function isTypeComponentHeroBanner(entry: WithContentTypeLink): entry is TypeComponentHeroBanner {
    return entry?.sys?.contentType?.sys?.id === 'componentHeroBanner'
}
