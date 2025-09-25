// src/features/books/components/CategoryCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

type CategoryCardProps = {
  label: string;
  icon?: React.ReactNode;
  color?: string;
};

export const CategoryCard = ({ label, icon, color = "bg-gray-100" }: CategoryCardProps) => {
  return (
    <Link to={`/categories/${encodeURIComponent(label)}`} className="block">
      <Card className={`${color} p-3 hover:shadow-md transition text-center`}>
        {icon && <div className="text-2xl mb-1">{icon}</div>}
        <p className="text-xs mt-1">{label}</p>
      </Card>
    </Link>
  );
};
