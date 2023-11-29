import { ReactElement, ReactNode } from 'react';

export interface AccordionProps {
  open?: boolean;
  children: [ReactElement<AccordionHeaderProps>, ReactElement<AccordionBodyProps>];
}

export interface AccordionHeaderProps {
  children: ReactNode;
  onClick?: () => void;
  expanded?: boolean;
}

export interface AccordionBodyProps {
  children: ReactNode;
  expanded?: boolean;
}
