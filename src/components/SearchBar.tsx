// import React, { useState } from "react";
//
// interface SearchBarProps {
//     onSearch: (query: string) => void;
// }
//
// const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
//     const [query, setQuery] = useState("");
//
//     const handleSearch = (e: React.FormEvent) => {
//         e.preventDefault();
//         onSearch(query);
//     };
//
//     return (
//         <form onSubmit={handleSearch} className="flex gap-2">
//             <input
//                 type="text"
//                 placeholder="Search cryptocurrency..."
//                 className="p-2 rounded-lg border"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//             />
//             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
//                 Search
//             </button>
//         </form>
//     );
// };
//
// export default SearchBar;
import React, { useState, useEffect } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    // This effect will run whenever the query value changes
    useEffect(() => {
        // Perform search as the user types
        onSearch(query);
    }, [query, onSearch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <div className="flex gap-2">
            <input
                type="text"
                placeholder="Find crypto by name or ticker symbol..."
                className="p-2 rounded-lg border w-full"
                value={query}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchBar;
