import React from "react";

interface PlaceholderPageProps {
  title: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => (
  <div className="py-8">
    <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
    <p className="text-slate-400">Página en construcción.</p>
  </div>
);

export default PlaceholderPage;
