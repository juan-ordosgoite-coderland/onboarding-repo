import { Tabs } from '@base-ui/react/tabs';
import './tabs.css';

interface CustomTabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

export function MyTabs({ defaultValue, children }: CustomTabsProps) {
  return (
    <Tabs.Root defaultValue={defaultValue} className="tabs-root">
      {children}
    </Tabs.Root>
  );
}

MyTabs.List = function MyTabsList({ children }: { children: React.ReactNode }) {
  return <Tabs.List className="tabs-list">{children}</Tabs.List>;
};

MyTabs.Trigger = function MyTabsTrigger({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <Tabs.Tab value={value} className="tabs-trigger">
      {children}
    </Tabs.Tab>
  );
};

MyTabs.Panel = function MyTabsPanel({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <Tabs.Panel value={value} className="tabs-panel">
      {children}
    </Tabs.Panel>
  );
};
