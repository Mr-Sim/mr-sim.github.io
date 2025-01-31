export interface AccordionSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  backgroundColor: string;
  children: React.ReactNode;
}

export interface Section {
  title: string;
  backgroundColor: string;
  content: React.ReactNode;
}