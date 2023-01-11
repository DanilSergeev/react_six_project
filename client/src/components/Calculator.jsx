import { useState } from "react";

export default function Calculator({ props }) {

    const [fromCurrencyActiv, setFromCurrencyActiv] = useState("RUB");
    const [toCurrencyActiv, setToCurrencyActiv] = useState("USD");
    const defaultCurrency = ["RUB", "USD", "EUR", "BTC", "ETH",];

    const [FromInput, setFromInput] = useState(0);
    const [ToInput, setToInput] = useState(0);


    const FromInputFun = (value) => {
        const endCalc = (value * (props.listMoney[toCurrencyActiv].value / props.listMoney[fromCurrencyActiv].value)).toFixed(6);
        setFromInput(value)
        setToInput(endCalc)
    }

    return (
        <section className="calculatorSection">
            <div className="wrapper">
                <div className="calc">
                    <div>
                        {
                            !props.isLoadingCalc && (
                                <ul>
                                    {
                                        defaultCurrency.map((currency, index) =>
                                            <li onClick={() => setFromCurrencyActiv(currency)} key={index + 1} className={fromCurrencyActiv === currency ? "currencyActiv" : ""} >{currency}</li>
                                        )
                                    }
                                </ul>)
                        }
                        <input type="number" placeholder="Введите число" value={FromInput} onChange={e => FromInputFun(e.target.value)} />
                    </div>
                    <div>
                        {
                            !props.isLoadingCalc && (
                                <ul>
                                    {
                                        defaultCurrency.map((currency, index) =>
                                            <li onClick={() => setToCurrencyActiv(currency)} key={index + 1} className={toCurrencyActiv === currency ? "currencyActiv" : ""} >{currency}</li>
                                        )
                                    }
                                </ul>
                            )
                        }
                        <input type="number" disabled placeholder="Введите число" value={ToInput} />
                    </div>
                </div>
            </div>
        </section>
    )
}