# @org/ui-components

Librería de componentes UI accesibles y agnósticos desarrollada con **Base UI** y estilizada mediante **CSS puro** para el onboarding técnico.

## Componentes Disponibles (Compound Pattern)

### 1. MyTabs

Permite organizar contenido en pestañas accesibles.

```tsx
//Tabs
import { MyTabs } from '@org/ui-components';

export default function Ejemplo() {
  return (
    <MyTabs defaultValue="tab1">
      <MyTabs.List>
        <MyTabs.Trigger value="tab1">Perfil</MyTabs.Trigger>
        <MyTabs.Trigger value="tab2">Ajustes</MyTabs.Trigger>
      </MyTabs.List>
      <MyTabs.Panel value="tab1">Contenido de tu Perfil.</MyTabs.Panel>
      <MyTabs.Panel value="tab2">Contenido de tus Ajustes.</MyTabs.Panel>
    </MyTabs>
  );
}

//Accordion
import { MyAccordion } from '@org/ui-components';

export default function EjemploAccordion() {
  return (
    <MyAccordion>
      <MyAccordion.Item value="item-1">
        <MyAccordion.Trigger>¿Qué es NX Workspace?</MyAccordion.Trigger>
        <MyAccordion.Panel>
          Es una herramienta de gestión de monorepos inteligente, rápida y
          extensible que optimiza flujos de trabajo en equipos modernos.
        </MyAccordion.Panel>
      </MyAccordion.Item>

      <MyAccordion.Item value="item-2">
        <MyAccordion.Trigger>¿Por qué usamos Base UI?</MyAccordion.Trigger>
        <MyAccordion.Panel>
          Porque nos provee componentes sin estilos con excelente comportamiento
          de accesibilidad, permitiéndonos acoplar cualquier solución estética
          como CSS puro.
        </MyAccordion.Panel>
      </MyAccordion.Item>
    </MyAccordion>
  );
}

//Dialog
import { MyDialog } from '@org/ui-components';

export default function EjemploDialog() {
  return (
    <MyDialog>
      <MyDialog.Trigger>
        <button className="btn-open">Eliminar Cuenta</button>
      </MyDialog.Trigger>

      <MyDialog.Portal>
        <MyDialog.Popup>
          <MyDialog.Title>Confirmar Acción</MyDialog.Title>
          <MyDialog.Description>
            Esta acción es irreversible. ¿Estás completamente seguro de que
            deseas eliminar tu cuenta del sistema?
          </MyDialog.Description>

          <div
            style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}
          >
            <MyDialog.Close>
              <button className="btn-cancel">Cancelar</button>
            </MyDialog.Close>
            <button className="btn-confirm-danger">Sí, eliminar</button>
          </div>
        </MyDialog.Popup>
      </MyDialog.Portal>
    </MyDialog>
  );
}
```
