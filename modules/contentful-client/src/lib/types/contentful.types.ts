import { EntryFields, Entry, EntrySkeletonType } from 'contentful';

// 1. Modelo SEO
export interface TypeComponentSeoSkeleton extends EntrySkeletonType {
  contentTypeId: 'componentSeo';
  fields: {
    title: EntryFields.Symbol;
    description: EntryFields.Text;
    keywords?: EntryFields.Symbol[];
  };
}
export type TypeComponentSeo = Entry<TypeComponentSeoSkeleton>;

// 2. Modelo Hero Banner
export interface TypeComponentHeroBannerSkeleton extends EntrySkeletonType {
  contentTypeId: 'componentHeroBanner';
  fields: {
    title: EntryFields.Symbol;
    description: EntryFields.Text;
    backgroundImage: any;
  };
}
export type TypeComponentHeroBanner = Entry<TypeComponentHeroBannerSkeleton>;

// 3. Modelo Landing Page
export interface TypePageLandingSkeleton extends EntrySkeletonType {
  contentTypeId: 'pageLanding';
  fields: {
    slug: EntryFields.Symbol;
    title: EntryFields.Symbol;
    seo?: TypeComponentSeo;
    sections?: Array<TypeComponentHeroBanner | any>;
  };
}
export type TypePageLanding = Entry<TypePageLandingSkeleton>;

// 4. Modelo Product Page
export interface TypePageProductSkeleton extends EntrySkeletonType {
  contentTypeId: 'pageProduct';
  fields: {
    slug: EntryFields.Symbol;
    productName: EntryFields.Symbol;
    price: EntryFields.Number;
    description: EntryFields.Text;
    seo?: TypeComponentSeo;
  };
}
export type TypePageProduct = Entry<TypePageProductSkeleton>;