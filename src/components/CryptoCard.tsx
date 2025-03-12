import React from "react";

interface CryptoCardProps {
    name: string;
    image: string;
    price: number;
    symbol: string;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ name, image, price, symbol }) => {
    return (
        <div className="bg-gray-800 text-white p-4 rounded-xl shadow-md flex items-center gap-4">
            <img src={image} alt={name} className="w-10 h-10" />
            <div>
                <h3 className="text-lg font-bold">{name} ({symbol.toUpperCase()})</h3>
                <p className="text-green-400">${price.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default CryptoCard;
