import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import { ethers } from "ethers";
import Axios from "axios";
import { THENTIC_API_KEY, NFT_CONTRACT } from "./secrete.json";

interface Props {
  handlePay: React.FormEventHandler;
  bill: Number;
  cash: React.MouseEventHandler<HTMLButtonElement>;
  connectWallet: React.MouseEventHandler<HTMLButtonElement>;
  userAccount: string;
  walletConnected: boolean;
  txnHash: string;
}

export const TokenContext = React.createContext({} as Props);

function App() {
  let [bill, setBill] = useState(0);
  let [userAccount, setUserAccount] = useState("");
  let [walletConnected, setWalletConnected] = useState(false);
  let [txnHash, setTxnHash] = useState("");
  const merchant = "0x2F3f14252F0c31aE2dB57dbDF59a263c38d4fc2D";

  const mintNftOp = {
    method: "POST",
    url: "https://thentic.p.rapidapi.com/nfts/mint",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": THENTIC_API_KEY,
      "X-RapidAPI-Host": "thentic.p.rapidapi.com",
    },
    data: {
      key: THENTIC_API_KEY,
      chain_id: 97,
      contract: NFT_CONTRACT,
      nft_id: 0,
      nft_data: "<Data>",
      to: `${userAccount}`,
    },
  };

  const mintNFT = async () => {
    let mint = await Axios.request(mintNftOp);
    alert(`Minting NFT, ID = ${mint.data.request_id}`);
  };

  const connectWallet: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
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
      let payment = await window.ethereum.request({
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
      await payment;
      setTxnHash(payment.toString());
      console.log(payment);
      alert("Payment successful. Click Ok to get an NFT reward.");
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
        txnHash,
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
