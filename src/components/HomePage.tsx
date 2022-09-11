import { FaBtc, FaDollarSign } from "react-icons/fa";
import item from "../items/item.png";
import { TokenContext } from "../App";
import { useContext } from "react";

const HomePage = () => {
  const { handlePay, bill, cash, userAccount, walletConnected, connectWallet } =
    useContext(TokenContext);
  const dollarSign = " ETH ";
  return (
    <div className="bg-gray-200">
      <div className="flex flex-col justify-center items-center">
        {!walletConnected && (
          <button
            onClick={connectWallet}
            className="py-3 px-3 rounded-lg bg-blue-500 m-3 font-bold text-2xl text-white"
          >
            Connect Wallet
          </button>
        )}
        {walletConnected && (
          <button
            disabled
            className="py-3 px-3 rounded-lg bg-blue-800 m-3 font-bold text-2xl text-white"
          >
            {`${userAccount.slice(0, 5)}...${userAccount.slice(-4)}`}
          </button>
        )}
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 pb-5 pt-5">
        <div className="rounded overflow-hidden shadow-lg bg-white w-48 h-59 justify-self-center items-center">
          <img src={item} className="w-full h-32" alt="item 1" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">item1</div>
          </div>
          <div className="px-6 pt-2 pb-1">
            <span className="self-end inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              <input className="item-input" type="checkbox" value={0.001} />
              {`${dollarSign}0.001`}
            </span>
          </div>
        </div>
        <div className="rounded overflow-hidden shadow-lg bg-white w-48 h-59 justify-self-center items-center">
          <img src={item} className="w-full h-32" alt="item 2" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">item2</div>
          </div>
          <div className="px-6 pt-2 pb-1">
            <span className="self-end inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              <input className="item-input" type="checkbox" value={0.002} />
              {`${dollarSign}0.002`}
            </span>
          </div>
        </div>
        <div className="rounded overflow-hidden shadow-lg bg-white w-48 h-59 justify-self-center items-center">
          <img src={item} className="w-full h-32" alt="item 3" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">item3</div>
          </div>
          <div className="px-6 pt-2 pb-1">
            <span className="self-end inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              <input className="item-input" type="checkbox" value={0.001} />
              {`${dollarSign}0.001`}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          className=" rounded-lg bg-green-800 p-3 font-bold text-white"
          onClick={cash}
        >
          GET TOTAL
        </button>
      </div>
      <form className="flex justify-center items-center p-4">
        <div className="grid grid-cols-2 pt-2 gap-3">
          <div className="flex justify-right items-right">
            <label className="grid grid-cols-2 font-bold bg-blue-500 text-xl text-center text-white p-2 rounded-lg">
              <h3 className="text-white justify-self-center">Eth:</h3>
              {bill?.toString()}
            </label>
          </div>
          <div className="flex justify-left items-left">
            <button
              type="button"
              onClick={handlePay}
              className=" bg-yellow-500 rounded-lg"
            >
              <h1 className="font-bold text-2xl text-blue-700 ml-5 mr-5">
                PAY
              </h1>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HomePage;
