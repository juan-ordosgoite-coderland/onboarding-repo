# @org/web - Unidad 3: Rendering & Cache (Minimal App)

Este módulo contiene la implementación práctica de las estrategias de renderizado, optimización de rendimiento y gestión del _Data Cache_ en Next.js (App Router) dentro del monorepo de onboarding.

## Estrategias de Renderizado Implementadas

### 1. Static Rendering (SSG) — `/estatica`

- **Concepto:** El HTML y los datos de las APIs se congelan en tiempo de compilación (_build time_).
- **Caché:** Utiliza `{ cache: 'force-cache' }` en la función `fetch`. Next.js almacena la respuesta en el _Data Cache_ de forma indefinida, sirviendo la página instantáneamente a todos los usuarios sin volver a consultar el origen.
- **Componentes:** Integra el componente compuesto `MyAccordion` de la librería `@org/ui-components`.

### 2. Dynamic Rendering (SSR) — `/dinamica`

- **Concepto:** La página se renderiza y los datos se consultan en tiempo de ejecución para cada petición individual (_request time_).
- **Caché:** Se fuerza mediante `export const dynamic = 'force-dynamic'` y `{ cache: 'no-store' }`. Evita por completo el almacenamiento en caché para garantizar datos frescos al segundo.
- **Componentes:** Integra el componente compuesto `MyTabs` de la librería `@org/ui-components`.

### 3. Incremental Static Regeneration (ISR) — `/isr`

- **Concepto:** Enfoque híbrido que permite servir páginas estáticas pero actualizar los datos de forma asíncrona en segundo plano tras una ventana de tiempo predefinida.
- **Caché:** Configurado con `{ next: { revalidate: 10 } }` (ventana de 10 segundos). Al expirar el tiempo, el primer acceso sirve la página guardada e inicia una regeneración silenciosa en el servidor; los accesos posteriores reciben el contenido actualizado.
- **Componentes:** Integra el componente compuesto `MyDialog` de la librería `@org/ui-components`.

### 4. Dynamic Routes — `/tareas/[id]`

- **Concepto:** Captura de parámetros dinámicos mediante segmentos de ruta variables (`[id]`).
- **Optimización:** Utiliza `generateStaticParams()` para pre-renderizar estáticamente en el build los IDs más comunes (1, 2 y 3). Cualquier otro ID se genera de forma dinámica bajo demanda.

## Mecanismos de Revalidación de Caché (Bajo Demanda)

Se implementaron dos vías independientes para purgar manualmente el _Data Cache_ y forzar la regeneración inmediata de los archivos HTML:

1. **Server Action (`/admin-tasks`):** Acción asíncrona que se ejecuta de manera nativa en el servidor mediante la directiva `'use server'`, invocando `revalidatePath()` tras la mutación de un formulario.
2. **Route Handler / API (`/api/revalidate?path=...`):** Endpoint GET accesible de forma externa que permite purgar la caché de cualquier ruta bajo demanda pasando el parámetro `path`.
