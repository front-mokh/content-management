import { Category } from "@prisma/client";
import Link from "next/link";
import React from "react";
//create a component that displays a card for the category with the thumbnail as the background, and overlay over it to keep the text readable, the title and under it the discription in white / gray. the card must be eye appealing  and clean

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <div
      className="relative bg-cover bg-center h-36 rounded-lg shadow-lg"
      style={{ backgroundImage: `url(${category.thumbnail})` }}
    >
      <Link href={`/media-library/${category.id}`}>
        <div className="absolute inset-0 bg-website-secondary    opacity-50 rounded-lg" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 py-4">
          <h2 className="text-2xl font-bold text-white">{category.label}</h2>
          <p className="text-white">{category.description}</p>
        </div>
      </Link>
    </div>
  );
}
