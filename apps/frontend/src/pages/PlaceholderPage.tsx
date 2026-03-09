import React from "react";
import { useDocumentTitle } from "@/src/hooks/useDocumentTitle";

interface PlaceholderPageProps {
  title: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  useDocumentTitle(title);
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
      <p className="text-slate-400">PÃ¡gina en construcciÃ³n.</p>
    </div>
  );
};

export default PlaceholderPage;
