import type { Asset, Entry, EntryFields } from "contentful";
import type { WithContentTypeLink } from "./WithContentTypeLink";

export interface TypeComponentSeoFields {
    internalName: EntryFields.Symbol;
    pageTitle: EntryFields.Symbol;
    pageDescription?: EntryFields.Text;
    canonicalUrl?: EntryFields.Symbol;
    nofollow: EntryFields.Boolean;
    noindex: EntryFields.Boolean;
    shareImages?: Asset[];
}

export type TypeComponentSeo = Entry<TypeComponentSeoFields>;

export function isTypeComponentSeo(entry: WithContentTypeLink): entry is TypeComponentSeo {
    return entry?.sys?.contentType?.sys?.id === 'componentSeo'
}
