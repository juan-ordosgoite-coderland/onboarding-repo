# contentful-client

This library was generated with Nx and serves as the core wrapper around the official Contentful SDK for the organization.

---

## Supported Rendering Patterns

This client is architected to seamlessly support multiple Next.js App Router rendering paradigms while respecting corporate cacheComponents constraints:

* On-Demand Dynamic Server Rendering (SSR): Ideal for previewing draft/changed content in real-time.
* Static Site Generation (SSG): Compatible with generateStaticParams for pre-rendering optimized static pages at build time.
* React Server Components (RSC) Caching: Functions are compatible with React's cache() mechanism to prevent duplicate data-fetching requests across the same render tree.

---

## Building & Development

### Build the Library
To compile the TypeScript definitions and build the module, run:
  npx nx build contentful-client

### Sync Content Models (Types)
To auto-generate or update TypeScript interfaces directly from the Contentful space schema, run the following script from the root workspace:
  npm run contentful:types

---

## Usage Examples

### 1. Fetching a Landing Page Entry
Import getLandingPage inside any async Server Component to fetch data. The client automatically maps the target environment to master and routes through the Preview API.

  import { getLandingPage } from '@org/contentful-client';
  import { notFound } from 'next/navigation';

  interface Props {
    slug: string;
  }

  export default async function CMSPageContent({ slug }: Props) {
    const response = await getLandingPage(slug);

    if (!response) {
      notFound();
    }

    const fields = response.fields as any;
    const title = fields.internalName || 'Untitled Page';

    return (
      <section className="p-6">
        <h1 className="text-2xl font-bold">{title}</h1>
      </section>
    );
  }

### 2. Utilizing with React Cache
To wrap the client in a secure request-memoization layer (avoiding un-cached data build errors), leverage React's native cache:

  import { getLandingPage } from '@org/contentful-client';
  import { cache } from 'react';

  const cachedGetLandingPage = cache(async (slug: string) => {
    return await getLandingPage(slug);
  });