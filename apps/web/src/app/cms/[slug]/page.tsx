import { getLandingPage } from '@org/contentful-client';
import { notFound } from 'next/navigation';
import { Suspense, cache } from 'react';

const cachedGetLandingPage = cache(async (slug: string) => {
  return await getLandingPage(slug);
});

// 🚀 TRUCO MAESTRO: Le dice al compilador de la empresa que no intente pre-generar ninguna ruta estática en el build
export async function generateStaticParams() {
  return [
    { slug: '2cayfg7wVF5WezADCHgSgL' }
  ];
}

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function ContentfulDynamicPage({ params }: Props) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  return (
    <Suspense fallback={
      <div className="p-8 text-center text-gray-500 animate-pulse font-medium">
        Cargando contenidos desde Contentful...
      </div>
    }>
      <CMSPageContent slug={slug} />
    </Suspense>
  );
}

async function CMSPageContent({ slug }: { slug: string }) {
  const response = await cachedGetLandingPage(slug);
  console.log("RESPUESTA DE CONTENTFUL ==>", response);

  if (!response) {
    notFound();
  }

  const fields = response.fields as any;
  const title = fields.internalName || 'Página de Contentful';
  const heroHeadline = fields.heroBannerHeadline;
  const heroImage = fields.heroBannerImage?.fields?.file?.url;
  const productsList = fields.products || [];

  return (
    <main className="p-8 max-w-5xl mx-auto space-y-12">
      {/* Cabecera */}
      <div className="border-b pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">CMS Dynamic Route</span>
        <h1 className="text-3xl font-extrabold text-gray-900">{String(title)}</h1>
      </div>

      {/* COMPONENTE 1: Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gray-900 text-white min-h-[350px] flex items-center p-8 md:p-12 shadow-xl">
        {heroImage && (
          <div className="absolute inset-0 z-0 opacity-40">
            <img 
              src={`https:${heroImage}`} 
              alt="Hero Banner Background" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="relative z-10 max-w-2xl space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {String(heroHeadline || 'Headline desde Contentful')}
          </h2>
          <span className="inline-block bg-orange-600 text-xs font-bold uppercase px-3 py-1 rounded-full">
            Colección Disponible
          </span>
        </div>
      </section>

      {/* COMPONENTE 2: Lista de Productos */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 border-b pb-2">Productos Destacados</h3>
        
        {productsList.length === 0 ? (
          <p className="text-gray-500 italic">No hay productos enlazados en este momento.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productsList.map((product: any, index: number) => {
              const pFields = product?.fields || {};
              return (
                <div key={index} className="border border-gray-100 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition">
                  <span className="text-xs font-mono text-gray-400 block mb-1">
                    ID: {product?.sys?.contentType?.sys?.id}
                  </span>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {pFields.productName || pFields.title || 'Producto sin nombre'}
                  </h4>
                  {pFields.price && (
                    <p className="text-xl font-extrabold text-orange-600 mb-2">{pFields.price} €</p>
                  )}
                  {pFields.description && (
                    <p className="text-sm text-gray-600 line-clamp-3">{String(pFields.description)}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}