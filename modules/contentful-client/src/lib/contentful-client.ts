import { createClient } from 'contentful';

const space = process.env.CONTENTFUL_SPACE_ID || '6jmt7rvzai2t';
const accessToken = process.env.CONTENTFUL_PREVIEW_TOKEN || 'IxJ7siJouquqXnKYY8UwCS9ZLIwiUoFhkYLKVO2RVQ0'; 
const host = process.env.CONTENTFUL_PREVIEW_TOKEN ? 'preview.contentful.com' : 'cdn.contentful.com';

export const contentfulClient = createClient({
  space: space,
  accessToken: accessToken,
  host: host,
  environment: 'master'
});

/**
 * Función reutilizable para obtener una página por su id
 */
export async function getLandingPage(id: string) {
  try {
    // Buscamos usando el filtro general del sistema por ID
    const response = await contentfulClient.getEntries({
      'sys.id': id,
      include: 3
    });
    
    // Si encuentra la entrada en el array de items, la devuelve
    if (response && response.items.length > 0) {
      return response.items[0];
    }
    
    return null;
  } catch (error) {
    console.error("Error cargando la entrada de Contentful:", error);
    return null;
  }
}