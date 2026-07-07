import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, describe } from 'vitest';
import { MyTabs } from './tabs/tabs';
import { MyAccordion } from './accordion/accordion';
import { MyDialog } from './dialog/dialog';

describe('UI Components Suite', () => {
  // 1. TEST PARA TABS
  test('MyTabs: debe cambiar de panel al hacer clic en la pestaña correspondiente', async () => {
    render(
      <MyTabs defaultValue="tab1">
        <MyTabs.List>
          <MyTabs.Trigger value="tab1">Pestaña 1</MyTabs.Trigger>
          <MyTabs.Trigger value="tab2">Pestaña 2</MyTabs.Trigger>
        </MyTabs.List>
        <MyTabs.Panel value="tab1">Contenido Uno</MyTabs.Panel>
        <MyTabs.Panel value="tab2">Contenido Dos</MyTabs.Panel>
      </MyTabs>,
    );

    expect(screen.getByText('Contenido Uno')).toBeDefined();

    const segundaTab = screen.getByRole('tab', { name: 'Pestaña 2' });
    await userEvent.click(segundaTab);

    expect(screen.getByText('Contenido Dos')).toBeDefined();
  });

  // 2. TEST PARA ACCORDION
  test('MyAccordion: debe expandir el contenido al hacer clic en el trigger', async () => {
    render(
      <MyAccordion>
        <MyAccordion.Item value="item-1">
          <MyAccordion.Trigger>Mostrar más</MyAccordion.Trigger>
          <MyAccordion.Panel>Contenido Oculto</MyAccordion.Panel>
        </MyAccordion.Item>
      </MyAccordion>,
    );

    const trigger = screen.getByRole('button', { name: 'Mostrar más' });
    await userEvent.click(trigger);

    expect(screen.getByText('Contenido Oculto')).toBeDefined();
  });

  // 3. TEST PARA DIALOG (MODAL)
  test('MyDialog: debe abrir el modal al pulsar el trigger y cerrarlo al pulsar close', async () => {
    render(
      <MyDialog>
        <MyDialog.Trigger>Abrir Modal</MyDialog.Trigger>
        <MyDialog.Portal>
          <MyDialog.Popup>
            <MyDialog.Title>Título del Modal</MyDialog.Title>
            <MyDialog.Close>Cerrar</MyDialog.Close>
          </MyDialog.Popup>
        </MyDialog.Portal>
      </MyDialog>,
    );

    const botonAbrir = screen.getByRole('button', { name: 'Abrir Modal' });
    await userEvent.click(botonAbrir);

    expect(screen.getByText('Título del Modal')).toBeDefined();

    const botonCerrar = screen.getByRole('button', { name: 'Cerrar' });
    await userEvent.click(botonCerrar);
  });
});
