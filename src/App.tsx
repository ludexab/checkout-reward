import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { ethers } from "ethers";
import Axios from "axios";

interface Props {
  handlePay: React.FormEventHandler;
  bill: Number;
  cash: React.MouseEventHandler<HTMLButtonElement>;
  connectWallet: React.MouseEventHandler<HTMLButtonElement>;
  userAccount: string;
  walletConnected: boolean;
}

export const TokenContext = React.createContext({} as Props);

function App() {
  let [bill, setBill] = useState(0);
  let [userAccount, setUserAccount] = useState("");
  let [walletConnected, setWalletConnected] = useState(false);
  const merchant = "0xf40072D5D56dd8C6964a11a23D0186c2b64491DF";

  const mintNftOp = {
    method: "POST",
    url: "https://thentic.p.rapidapi.com/nfts/mint",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "SmyxNsnYro8cvpqVBYD4Qrc8lORKW69C",
      "X-RapidAPI-Host": "thentic.p.rapidapi.com",
    },
    data: `{"key":"SmyxNsnYro8cvpqVBYD4Qrc8lORKW69C","chain_id":97,"contract":"0x68ae8a934ada6018888486609e40e6144e22f701","nft_id":0,"nft_data":"<Data>","to":"0xf40072D5D56dd8C6964a11a23D0186c2b64491DF"}`,
  };

  const mintNFT = async () => {
    Axios.request(mintNftOp)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  // const options = {
  //   method: "GET",
  //   url: "https://thentic.p.rapidapi.com/contracts",
  //   params: { key: "SmyxNsnYro8cvpqVBYD4Qrc8lORKW69C", chain_id: "97" },
  //   headers: {
  //     "X-RapidAPI-Key": "SmyxNsnYro8cvpqVBYD4Qrc8lORKW69C",
  //     "X-RapidAPI-Host": "thentic.p.rapidapi.com",
  //   },
  // };

  // Axios.request(options)
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });

  //0x68ae8a934ada6018888486609e40e6144e22f701

  const connectWallet: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      console.log("connecting waallet");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAccount(accounts[0]);
      setWalletConnected(true);
    } else {
      setWalletConnected(false);
      alert("Please install MetaMask");
    }
  };

  const cash: React.MouseEventHandler = (e) => {
    e.preventDefault();
    let items = document.querySelectorAll<HTMLInputElement>("input.item-input");
    let price = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].checked) {
        price += Number(items[i].value);
      }
    }
    setBill(price);
  };

  const payBill = async (amount: number) => {
    try {
      const pAmount = ethers.utils.parseEther(amount.toString());
      await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: userAccount,
            to: merchant,
            gas: "0x5208",
            value: pAmount._hex,
          },
        ],
      });
    } catch (error) {
      console.log(error);
      alert("Error making payment, please try again.");
      // process.exit(1);
    }
  };

  const handlePay: React.FormEventHandler = async (e) => {
    e.preventDefault();
    await payBill(bill);
    mintNFT();
  };

  return (
    <TokenContext.Provider
      value={{
        bill,
        cash,
        userAccount,
        walletConnected,
        connectWallet,
        handlePay,
      }}
    >
      <div>
        <Header />
        <HomePage />
      </div>
    </TokenContext.Provider>
  );
}

export default App;
