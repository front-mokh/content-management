"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(
        `/media-library/search?q=${encodeURIComponent(query.trim())}`
      );
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative flex w-full max-w-xl">
        <Input
          type="text"
          placeholder="Search for texts, audio, videos, or images..."
          className="pr-10 bg-white/90 backdrop-blur-sm border-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-0"
          variant="ghost"
        >
          <Search className="h-5 w-5 text-gray-500" />
        </Button>
      </div>
    </form>
  );
}
