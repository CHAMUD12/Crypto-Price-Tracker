import React, { useState } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch} className="flex gap-2">
            <input
                type="text"
                placeholder="Search cryptocurrency..."
                className="p-2 rounded-lg border"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
