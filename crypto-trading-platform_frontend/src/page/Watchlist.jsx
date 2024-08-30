import React, { useEffect } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@/components/ui/table";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { BookmarkIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserWatchList,
  removeCoinFromWatchList,
} from "@/State/WatchList/Action";
const WatchList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserWatchList(localStorage.getItem("jwt")));
  }, []);
  const watchlist = useSelector((store) => store.watchlist);
  const removeCoin = (id) => {
    dispatch(
      removeCoinFromWatchList({ jwt: localStorage.getItem("jwt"), coinId: id })
    );
  };
  //function reference can be called eg just defining a function reference called removcoin
  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">
        Watchlist
        <BookmarkFilledIcon className="w-6 h-6" />
      </h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Coin</TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead>Volume</TableHead>
            <TableHead>Market cap</TableHead>
            <TableHead>24 H</TableHead>
            <TableHead className>Price</TableHead>
            <TableHead className="text-right text-red-600">REMOVE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlist.watchlist?.coins.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage src={item.image} />
                </Avatar>
                <span>{item.id}</span>
              </TableCell>
              <TableCell>{item.symbol.toUpperCase()}</TableCell>
              <TableCell>{item.total_volume}</TableCell>
              <TableCell>{item.market_cap}</TableCell>
              <TableCell
                className={
                  item.market_cap_change_percentage_24h < 0
                    ? "text-red-600"
                    : "text-green-600"
                }
              >
                {item.market_cap_change_percentage_24h}%
              </TableCell>
              <TableCell>{item.current_price}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => removeCoin(item.id)}
                >
                  <BookmarkFilledIcon className="w-6 h-6" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default WatchList;
