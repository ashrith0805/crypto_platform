import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { BookmarkFilledIcon, DotIcon } from "@radix-ui/react-icons";
import { BookmarkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TradingForm from "./TradingForm";
import CoinChart from "./Home/CoinChart";
import { useDispatch, useSelector } from "react-redux";
import { getCoinById, getCoinDetails } from "@/State/Coin/Action";
import { useParams } from "react-router-dom";
import { getUserWallet } from "@/State/Wallet/Action";
import { getAssetsByIdAndUser } from "@/State/Asset/Action";
import {
  addCoinToWatchList,
  getUserWatchList,
  removeCoinFromWatchList,
} from "@/State/WatchList/Action";
const StockDetails = () => {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserWallet(auth.jwt || localStorage.getItem("jwt")));
  }, [auth.jwt]);
  useEffect(() => {
    dispatch(getUserWatchList(auth.jwt || localStorage.getItem("jwt")));
  }, []);
  const watchlist = useSelector((store) => store.watchlist);
  const { id } = useParams();
  const containsCoin = () => {
    let list = watchlist.watchlist.coins;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        return true;
      }
    }
    return false;
  };
  useEffect(() => {
    dispatch(
      getAssetsByIdAndUser({ jwt: localStorage.getItem("jwt"), coinId: id })
    );
  }, []);
  const asset = useSelector((store) => store.asset);
  const addToWatchList = () => {
    dispatch(addCoinToWatchList({ jwt: auth.jwt, coinId: id }));
  };
  const removeCoin = () => {
    dispatch(
      removeCoinFromWatchList({ jwt: localStorage.getItem("jwt"), coinId: id })
    );
  };
  /*
  this is how to extract the query paramters from the url by destructuring the object
  */
  useEffect(() => {
    dispatch(getCoinDetails({ coinId: id, jwt: localStorage.getItem("jwt") }));
  }, [id]);
  // this is executed whenver page is refreshed or id changed
  /*
  Add conditional is null check before rednering  {details ? ( to prevent null accesses
  the component attempted to render the coin details beofe they were actually available.
  so you must put this check into to delay until it is available
  */

  // const { coin } = useSelector((store) => store);
  const coin = useSelector((state) => state.coin);
  const details = coin.coinDetails;
  return (
    <div className="p-5 mt-5">
      {details ? (
        <div className="flex justify-between">
          <div className="flex gap-5 items-center">
            <div>
              <Avatar>
                <AvatarImage src={details.image?.small} />
              </Avatar>
            </div>
            <div className="flex items-center gap-2">
              <p>{details.symbol.toUpperCase()}</p>
              <DotIcon className="text-gray-400"></DotIcon>
              <p>{details?.id}</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">
                ${details.market_data.current_price.usd}
              </p>
              <p>
                <span
                  className={
                    details.market_data.market_cap_change_percentage_24h < 0
                      ? "text-red-600"
                      : "text-green-600"
                  }
                >
                  <span>{details.market_data.market_cap_change_24h}</span>
                  <span>
                    ({details.market_data.market_cap_change_percentage_24h}%)
                  </span>
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button onClick={containsCoin() ? removeCoin : addToWatchList}>
              {containsCoin() ? (
                <BookmarkFilledIcon className="h-6 w-6" />
              ) : (
                <BookmarkIcon className="h-6 w-6" />
              )}
            </Button>
            <Dialog>
              <DialogTrigger>
                <Button size="lg">Trade</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Trade</DialogTitle>
                </DialogHeader>
                <TradingForm details={details} asset={asset} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <p></p>
      )}
      <div className="mt-14">
        <CoinChart id={id} />
      </div>
    </div>
  );
};
export default StockDetails;
