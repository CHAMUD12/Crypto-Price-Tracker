import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptos } from "../features/cryptoSlice";
import { clearFavorites } from "../features/favoritesSlice";
import { RootState, AppDispatch } from "../store";
import CryptoCard from "../components/CryptoCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { coins, status } = useSelector((state: RootState) => state.crypto);
    const { favoriteIds } = useSelector((state: RootState) => state.favorites);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        dispatch(fetchCryptos());
    }, [dispatch]);

    const filteredCoins = coins.filter((coin) => {
        // First apply search filter
        const matchesSearch = coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());

        // Then apply favorites filter if needed
        if (showFavorites) {
            return matchesSearch && favoriteIds.includes(coin.id);
        }

        return matchesSearch;
    });

    const handleClearFavorites = () => {
        if (confirm("Are you sure you want to clear all favorites?")) {
            dispatch(clearFavorites());
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Crypto Price Tracker</h1>

            <div className="flex flex-col gap-4 mb-4">
                <SearchBar onSearch={setSearchTerm} />

                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <button
                            className={`px-4 py-2 rounded-lg ${!showFavorites ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setShowFavorites(false)}
                        >
                            All Coins
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${showFavorites ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            onClick={() => setShowFavorites(true)}
                        >
                            Favorites ({favoriteIds.length})
                        </button>
                    </div>

                    {showFavorites && favoriteIds.length > 0 && (
                        <button
                            className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm"
                            onClick={handleClearFavorites}
                        >
                            Clear All
                        </button>
                    )}
                </div>
            </div>

            {status === "loading" ? (
                <p className="text-center">Loading...</p>
            ) : filteredCoins.length > 0 ? (
                <div className="grid gap-4 mt-4">
                    {filteredCoins.map((coin) => (
                        <CryptoCard
                            key={coin.id}
                            id={coin.id}
                            name={coin.name}
                            image={coin.image}
                            price={coin.current_price}
                            symbol={coin.symbol}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center mt-8">
                    <p className="text-lg">
                        {showFavorites ? "No favorite cryptocurrencies found." : "No cryptocurrencies found."}
                    </p>
                    {showFavorites && (
                        <button
                            className="mt-2 px-4 py-2 rounded-lg bg-blue-500 text-white"
                            onClick={() => setShowFavorites(false)}
                        >
                            View All Coins
                        </button>
                    )}
                </div>
            )}

            {showFavorites && filteredCoins.length > 0 && (
                <div className="mt-6 flex justify-center">
                    <button
                        className="px-4 py-2 rounded-lg bg-gray-200"
                        onClick={() => setShowFavorites(false)}
                    >
                        View All Coins
                    </button>
                </div>
            )}
        </div>
    );
};

export default Home;
