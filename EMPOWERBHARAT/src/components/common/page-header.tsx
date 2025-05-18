import type React from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode; // For optional actions like buttons
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6"> {/* Increased mb and pb */}
      <div className="space-y-2"> {/* Increased space-y */}
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2 flex-shrink-0">{children}</div>} {/* Added flex-shrink-0 */}
    </div>
  );
}
