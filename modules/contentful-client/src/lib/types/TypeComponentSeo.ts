import type { Asset, Entry, EntryFields } from "contentful";
import type { WithContentTypeLink } from "./WithContentTypeLink.js";

export interface TypeComponentSeoFields {
    internalName: EntryFields.Symbol;
    pageTitle: EntryFields.Symbol;
    pageDescription?: EntryFields.Text;
    canonicalUrl?: EntryFields.Symbol;
    nofollow: EntryFields.Boolean;
    noindex: EntryFields.Boolean;
    shareImages?: Asset[];
}

export type TypeComponentSeo = Entry<{ contentTypeId: 'componentSeo', fields: TypeComponentSeoFields }>;

export function isTypeComponentSeo(entry: WithContentTypeLink): entry is TypeComponentSeo {
    return entry?.sys?.contentType?.sys?.id === 'componentSeo'
}
