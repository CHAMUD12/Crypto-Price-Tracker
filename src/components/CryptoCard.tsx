import React, { useState } from "react";
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

    return (
        <div className="bg-gray-800 text-white p-4 rounded-xl shadow-md flex flex-col items-center">
            <div className="flex items-center gap-4">
                <img src={image} alt={name} className="w-10 h-10" />
                <div>
                    <h3 className="text-lg font-bold">{name} ({symbol.toUpperCase()})</h3>
                    <p className="text-green-400">${price.toLocaleString()}</p>
                </div>
            </div>
            <button
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                onClick={() => setShowChart(!showChart)}
            >
                {showChart ? "Hide Chart" : "Show Chart"}
            </button>
            {showChart && <PriceChart coinId={id} />}
        </div>
    );
};

export default CryptoCard;
