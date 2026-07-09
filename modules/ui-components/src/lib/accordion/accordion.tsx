import { Accordion } from '@base-ui/react/accordion';
import './accordion.css';

interface CustomAccordionProps {
  children: React.ReactNode;
}

export function MyAccordion({ children }: CustomAccordionProps) {
  return <Accordion.Root className="accordion-root">{children}</Accordion.Root>;
}

MyAccordion.Item = function MyAccordionItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <Accordion.Item value={value} className="accordion-item">
      {children}
    </Accordion.Item>
  );
};

MyAccordion.Trigger = function MyAccordionTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Accordion.Trigger className="accordion-trigger">
      {children}
    </Accordion.Trigger>
  );
};

MyAccordion.Panel = function MyAccordionPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Accordion.Panel className="accordion-panel">{children}</Accordion.Panel>
  );
};
