import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Currency, changeCurrency } from "../features/currencySlice";

const CurrencySelector: React.FC = () => {
    const dispatch = useDispatch();
    const { selectedCurrency, lastUpdated, status } = useSelector((state: RootState) => state.currency);

    const currencies: { value: Currency; label: string }[] = [
        { value: "usd", label: "USD ($)" },
        { value: "eur", label: "EUR (€)" },
        { value: "gbp", label: "GBP (£)" },
        { value: "jpy", label: "JPY (¥)" },
        { value: "aud", label: "AUD (A$)" },
        { value: "cad", label: "CAD (C$)" },
        { value: "chf", label: "CHF (Fr)" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeCurrency(e.target.value as Currency));
    };

    // Format the last updated timestamp
    const formatLastUpdated = () => {
        if (!lastUpdated) return "Not updated yet";

        const date = new Date(lastUpdated);
        return date.toLocaleString();
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center">
                <label htmlFor="currency-selector" className="mr-2 text-sm font-medium">
                    Currency:
                </label>
                <select
                    id="currency-selector"
                    value={selectedCurrency}
                    onChange={handleChange}
                    className="bg-gray-700 text-white rounded p-1 text-sm border border-gray-600"
                    disabled={status === "loading"}
                >
                    {currencies.map((currency) => (
                        <option key={currency.value} value={currency.value}>
                            {currency.label}
                        </option>
                    ))}
                </select>
                {status === "loading" && (
                    <span className="ml-2 text-xs text-gray-400">Updating...</span>
                )}
            </div>
            {lastUpdated && (
                <span className="text-xs text-gray-500 mt-1">
                    Rates updated: {formatLastUpdated()}
                </span>
            )}
        </div>
    );
};

export default CurrencySelector;
