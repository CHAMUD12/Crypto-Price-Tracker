import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCryptos } from "../features/cryptoSlice";
import { RootState, AppDispatch } from "../store";
import CryptoCard from "../components/CryptoCard";
import SearchBar from "../components/SearchBar";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { coins, status } = useSelector((state: RootState) => state.crypto);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchCryptos());
    }, [dispatch]);

    const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Crypto Price Tracker</h1>
            <SearchBar onSearch={setSearchTerm} />
            {status === "loading" ? (
                <p className="text-center">Loading...</p>
            ) : (
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
            )}
        </div>
    );
};

export default Home;
