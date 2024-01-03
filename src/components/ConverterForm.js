import React, { useState, useEffect } from "react";
import axios from "axios";
import ResultDisplay from "./ResultDisplay";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Grid,
  TextField,
} from "@mui/material";
import "./convert.css";
import data from '../data/data';

const ConverterForm = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const BACKEND_URL = 'https://currency-converter-komn.onrender.com/api/';
 // const BACKEND_URL = 'http://localhost:3001/api/';

  console.log("data**************  ", data)

  useEffect(() => {
    setCurrencies(data);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${BACKEND_URL}convert`, {
        params: {
          amount,
          convert_id: fromCurrency,
          id: toCurrency,
        },
      });

      const result = await response.data;
      //setConvertedAmount(result.data.quote[0].price);
      setConvertedAmount(Number(result));
    } catch (error) {
      console.error("Error converting currency:", error.message);
    }
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const bitcoinOptions = [
    {
      "symbol": "BTC",
      "symbol_id": "Bitcoin"
    },
    {
      "symbol": "ETH",
      "symbol_id": "Ethereum"
    },
    {
      "symbol": "USDT",
      "symbol_id": "Tether"
    },
    {
      "symbol": "BNB",
      "symbol_id": "BNB"
    },
    {
      "symbol": "SOL",
      "symbol_id": "Solana"
    },
    {
      "symbol": "XRP",
      "symbol_id": "XRP"
    },
    {
      "symbol": "USDC",
      "symbol_id": "USDC"
    },
    {
      "symbol": "ADA",
      "symbol_id": "Cardano"
    },
    {
      "symbol": "AVAX",
      "symbol_id": "Avalanche"
    },
    {
      "symbol": "DOGE",
      "symbol_id": "Dogecoin"
    }
  ];

  return (
    <div>
      <p1 className="mainText">Cryptocurrency Converter Calculator</p1>
      <Box
        sx={{ flexGrow: 1 }}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          className="outerBox"
        >
          <Grid item xs={12} sm={4} md={4} key={1} fullWidth>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} key={2}></Grid>
          <Grid item xs={12} sm={4} md={4} key={3}></Grid>
          <Grid item xs={12} sm={4} md={4} key={4}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">From</InputLabel>
                <Select 
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  label="from"
                >
                  {bitcoinOptions.map((item) => {
                    return (
                      <MenuItem value={item.symbol}>
                        <span>
                          <p style={{fontSize:'16px', fontWeight: '600'}}>{item.symbol}</p>
                          <p style={{fontSize:'16px', color: 'grey', fontWeight: '400'}}>{item.symbol_id}</p>
                        </span>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            key={5}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              data-qa-id="swap-currencies"
              type="button"
              className="sc-243a694b-0 csKxwY cmc-button cmc-button--color-blue button-exchange"
              style={{ backgroundColor: "rgb(16, 112, 224)" }}
              fdprocessedid="dh0r6q"
              onClick={() => {
                setFromCurrency(toCurrency);
                setToCurrency(fromCurrency);
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  height="16px"
                  width="16px"
                  viewBox="0 0 24 24"
                  class="sc-aef7b723-0 fINSSs"
                >
                  <path
                    d="M6 16H20M20 16L17 19M20 16L17 13"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M18 8H4M4 8L7 11M4 8L7 5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>
            </button>
          </Grid>

          <Grid item xs={12} sm={4} md={4} key={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">To</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  label="To"
                >
                  {currencies.map((item) => {
                    return (
                      <MenuItem value={item.symbol}>
                        {item.currency}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        <Button
          onClick={handleSubmit}
          style={{
            padding: "5px",
            margin: "5px",
            backgroundColor: "rgb(16, 112, 224)",
            color: "white",
          }}
        >
          {" "}
          Convert{" "}
        </Button>
      </Box>
      {convertedAmount !== null && (
        <ResultDisplay convertedAmount={convertedAmount} style={{padding: '10px', margin: '10px'}}/>
      )}
    </div>
  );
};

export default ConverterForm;
