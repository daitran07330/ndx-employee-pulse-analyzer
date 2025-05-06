
import React, { ReactNode } from "react";

interface PageTitleProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, description, action }) => {
  return (
    <div className="mb-8 flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-2">{description}</p>
        )}
      </div>
      {action && (
        <div className="ml-4">
          {action}
        </div>
      )}
    </div>
  );
};

export default PageTitle;
