export interface AccordionSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  backgroundColor: string;
  children: React.ReactNode;
  countdownTime: number;
}

export interface Section {
  title: string;
  backgroundColor: string;
  content: React.ReactNode;
}