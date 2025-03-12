import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favoritesSlice";
import { RootState } from "../store";
import PriceChart from "./PriceChart";

interface CryptoCardProps {
    id: string;
    name: string;
    image: string;
    price: number;
    symbol: string;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ id, name, image, price, symbol }) => {
    const [showChart, setShowChart] = useState(false);
    const dispatch = useDispatch();
    const favoriteIds = useSelector((state: RootState) => state.favorites.favoriteIds);
    const isFavorite = favoriteIds.includes(id);

    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(id));
    };

    return (
        <div className="bg-gray-800 text-white p-4 rounded-xl shadow-md flex flex-col">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img src={image} alt={name} className="w-10 h-10" />
                    <div>
                        <h3 className="text-lg font-bold">{name} ({symbol.toUpperCase()})</h3>
                        <p className="text-green-400">${price.toLocaleString()}</p>
                    </div>
                </div>
                <button
                    onClick={handleToggleFavorite}
                    className="p-2 rounded-full hover:bg-gray-700"
                >
                    {isFavorite ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                    )}
                </button>
            </div>
            <div className="flex justify-center mt-2">
                <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                    onClick={() => setShowChart(!showChart)}
                >
                    {showChart ? "Hide Chart" : "Show Chart"}
                </button>
            </div>
            {showChart && <PriceChart coinId={id} />}
        </div>
    );
};

export default CryptoCard;
