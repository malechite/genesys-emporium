declare module 'react-tabs' {
  import * as React from 'react';

  export interface TabsProps {
    className?: string;
    selectedIndex?: number;
    defaultIndex?: number;
    onSelect?: (index: number, lastIndex: number, event: Event) => boolean | void;
    selectedTabClassName?: string;
    selectedTabPanelClassName?: string;
    disabledTabClassName?: string;
    defaultFocus?: boolean;
    forceRenderTabPanel?: boolean;
    children?: React.ReactNode;
  }

  export interface TabListProps {
    className?: string;
    children?: React.ReactNode;
  }

  export interface TabProps {
    className?: string;
    disabled?: boolean;
    selectedClassName?: string;
    disabledClassName?: string;
    tabIndex?: string;
    children?: React.ReactNode;
  }

  export interface TabPanelProps {
    className?: string;
    selectedClassName?: string;
    forceRender?: boolean;
    children?: React.ReactNode;
  }

  export class Tabs extends React.Component<TabsProps> {}
  export class TabList extends React.Component<TabListProps> {}
  export class Tab extends React.Component<TabProps> {}
  export class TabPanel extends React.Component<TabPanelProps> {}
}
