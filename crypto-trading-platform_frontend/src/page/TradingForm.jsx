import React, { useEffect } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { BookmarkFilledIcon, DotIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, PoundSterlingIcon } from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { getUserWallet } from "@/State/Wallet/Action";
import { payOrder } from "@/State/Order/Action";
/*
amount represents the total valye of money that the user wants to spend 
on buying or selling a coin
Quantity represents the number of units of the currency
eg if bitcoin is 20,000 and you want to spend 100 then quantity would be
100/20,0000. Calculate just calculate the quantity of the crypto that can be bought with 
the amount. 
*/
const TradingForm = ({ details, asset }) => {
  const dispatch = useDispatch();
  const [orderType, setOrderType] = React.useState("BUY");
  const [amount, setAmount] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const wallet = useSelector((store) => store.wallet);
  const handleOnChange = (e) => {
    if (orderType == "BUY") {
      const a = e.target.value; //e is the event e.target is the element triggering the change and e.target.value is the value of this element
      setAmount(a);
      const volume = calculateCost(a, details.market_data.current_price.usd);
      setQuantity(volume);
    } else {
      setQuantity(e.target.value);
    }
  };
  const calculateCost = (a, price) => {
    let volume = a / price;
    let decimalPlaces = Math.max(2, price.toString().split(".")[0].length);
    return volume.toFixed(decimalPlaces);
  };
  const handleBuyCrypto = () => {
    dispatch(
      payOrder({
        jwt: localStorage.getItem("jwt"),
        request: {
          coinId: details?.id,
          quantity: quantity,
          orderType,
        },
      })
    );
  };
  return (
    <div className="space-y-10 p-5">
      <div>
        <div className="flex gap-4 items-center justify-between">
          <Input
            className="py-7 focus:outline-none"
            placeholder={
              orderType == "BUY" ? "enter amount" : "enter quantity to sell"
            }
            onChange={handleOnChange}
            type="number"
          />
          <div>
            <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">
              {quantity} units
            </p>
          </div>
        </div>
        {orderType === "BUY" && amount > wallet?.userWallet?.balance ? (
          <h1 className="text-red-800 text-center pt-4">
            Insufficient Wallet Balance To Buy
          </h1>
        ) : orderType === "SELL" && quantity > asset?.assetDetails?.quantity ? (
          <h1 className="text-red-800 text-center pt-4">
            Insufficient quantity to Sell
          </h1>
        ) : (
          ""
        )}
      </div>

      <div className="flex gap-5 items-center">
        <div>
          <Avatar>
            <AvatarImage src={details.image?.small} />
          </Avatar>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p>{details.symbol.toUpperCase()}</p>
            <DotIcon className="text-gray-400" />
            <p className="text-gray-400">{details?.id}</p>
          </div>
          <div className="flex items-end gap-2">
            <p className="text-xl font-bold">
              ${details.market_data.current_price.usd}
            </p>
            <p>
              <span>{details.market_data.market_cap_change_24h}</span>
              <span
                className={
                  details.market_data.market_cap_change_percentage_24h > 0
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                ({details.market_data.market_cap_change_percentage_24h}%)
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p>Order Type</p>
        <p>Market Order</p>
      </div>
      <div className="flex items-center justify-between">
        <p>{orderType === "BUY" ? "Available Case" : "Available Quantity"}</p>
        <div>
          {orderType === "BUY" ? (
            <div className="flex items-center">
              <DollarSign />
              {wallet?.userWallet?.balance}
            </div>
          ) : (
            <p>{asset.assetDetails ? asset.assetDetails.quantity : 0}</p>
          )}
        </div>
      </div>
      <div>
        <DialogClose className="w-full">
          <Button
            onClick={handleBuyCrypto}
            className={`w-full py-6 ${
              orderType === "SELL" ? "bg-red-600 text-white" : ""
            }`}
          >
            {orderType}
          </Button>
        </DialogClose>

        <Button
          onClick={() => setOrderType(orderType === "BUY" ? "SELL" : "BUY")}
          className="w-full mt-5 text-xl"
          variant="link"
        >
          {orderType === "BUY" ? "Or Sell" : "Or Buy"}
        </Button>
      </div>
    </div>
  );
};
export default TradingForm;
