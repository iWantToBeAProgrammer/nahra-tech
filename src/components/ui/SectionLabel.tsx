interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[13px] leading-none tracking-wide text-[rgba(39,35,35,0.64)] ${className}`}
    >
      {children}
    </span>
  );
}
