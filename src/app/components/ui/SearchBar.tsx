"use client";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Search } from "lucide-react";
import useDebounce from "@/app/hooks/useDebounce";
import { Input } from "@/components/ui/input";

interface SearchProps {
  onSearch: (events: string) => void;
}

const SearchBar = ({ onSearch }: SearchProps) => {
  const [events, setEvents] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(events, 500);

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSearch(events);
  };

  return (
    <div
      className="container mx-auto flex w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden 
            border border-foreground backdrop-blur-sm"
    >
      <Input
        type="text"
        placeholder="Search for events or categories ..."
        value={events}
        onChange={(e) => setEvents(e.target.value)}
        className="flex-1 px-6 h-14 text-lg placeholder:text-muted"
      />
      <Button
        onClick={handleSearchClick}
        type="submit"
        variant="outline"
        className="px-6 md:px-8 h-14 font-bold text-lg transition duration-300 items-center justify-center"
        aria-label="Search"
      >
        <Search className="w-6 mr-2 h-6 hidden sm:inline"/>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
