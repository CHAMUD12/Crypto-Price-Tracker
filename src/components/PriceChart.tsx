// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
//
// interface PriceChartProps {
//     coinId: string;
// }
//
// const PriceChart: React.FC<PriceChartProps> = ({ coinId }) => {
//     const [chartData, setChartData] = useState<{ date: string; price: number }[]>([]);
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         const fetchChartData = async () => {
//             try {
//                 const response = await axios.get(
//                     `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
//                     { params: { vs_currency: "usd", days: 7, interval: "daily" } }
//                 );
//
//                 const formattedData = response.data.prices.map((entry: [number, number]) => ({
//                     date: new Date(entry[0]).toLocaleDateString(),
//                     price: entry[1],
//                 }));
//
//                 setChartData(formattedData);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching chart data:", error);
//                 setLoading(false);
//             }
//         };
//
//         fetchChartData();
//     }, [coinId]);
//
//     return (
//         <div className="bg-gray-800 p-4 rounded-lg shadow-md">
//             <h2 className="text-white text-center mb-2">Price Trend (7 Days)</h2>
//             {loading ? (
//                 <p className="text-center text-white">Loading...</p>
//             ) : (
//                 <ResponsiveContainer width="100%" height={200}>
//                     <LineChart data={chartData}>
//                         <XAxis dataKey="date" tick={{ fill: "white" }} />
//                         <YAxis tick={{ fill: "white" }} />
//                         <Tooltip />
//                         <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} />
//                     </LineChart>
//                 </ResponsiveContainer>
//             )}
//         </div>
//     );
// };
//
// export default PriceChart;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Currency } from "../features/currencySlice";

interface PriceChartProps {
    coinId: string;
    currency: Currency;
}

const PriceChart: React.FC<PriceChartProps> = ({ coinId, currency }) => {
    const [chartData, setChartData] = useState<{ timestamp: number; date: string; price: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get(
                    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
                    { params: { vs_currency: currency, days: 7, interval: "daily" } }
                );

                const formattedData = response.data.prices.map((entry: [number, number]) => ({
                    timestamp: entry[0], // Keep the timestamp for precise positioning
                    date: new Date(entry[0]).toLocaleDateString(),
                    price: entry[1],
                }));

                setChartData(formattedData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching chart data:", error);
                setLoading(false);
            }
        };

        fetchChartData();
    }, [coinId, currency]);

    // Get currency symbol
    const getCurrencySymbol = () => {
        switch (currency) {
            case "usd": return "$";
            case "eur": return "€";
            case "gbp": return "£";
            case "jpy": return "¥";
            case "aud": return "A$";
            case "cad": return "C$";
            case "chf": return "Fr";
            default: return "$";
        }
    };

    // Custom tick formatter to show dates nicely
    const formatXAxis = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString(undefined, {
            month: 'numeric',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full">
            <h2 className="text-white text-center mb-2">Price Trend (7 Days)</h2>
            {loading ? (
                <p className="text-center text-white">Loading...</p>
            ) : (
                <ResponsiveContainer width="95%" height={250}>
                    <LineChart data={chartData}>
                        <XAxis
                            dataKey="timestamp"
                            tick={{ fill: "white" }}
                            tickFormatter={formatXAxis}
                            type="number"
                            domain={['dataMin', 'dataMax']}
                            scale="time"
                        />
                        <YAxis tick={{ fill: "white" }} />
                        <Tooltip
                            labelFormatter={(value) => new Date(value).toLocaleDateString()}
                            formatter={(value) => [`${getCurrencySymbol()}${value.toLocaleString()}`, 'Price']}
                        />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#10b981"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default PriceChart;
