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
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/State/Asset/Action";
const Portfolio = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAssets({ jwt: localStorage.getItem("jwt") }));
  }, []);
  const asset = useSelector((store) => store.asset);
  return (
    <>
      <div className="p-5 lg:px-20">
        <h1 className="font-bold text-3xl pb-5">Portfolio</h1>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Asset</TableHead>
                <TableHead>Current Quantity</TableHead>
                <TableHead>Buy Price</TableHead>
                <TableHead></TableHead>
                <TableHead>Market Cap Change(%)</TableHead>
                <TableHead className="text-right">Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {asset.userAssets?.map(
                (item, index) =>
                  item.quantity != 0 && (
                    <TableRow key={index}>
                      <TableCell className="font-medium flex items-center gap-2">
                        <Avatar className="-z-50 h-8 w-10">
                          <AvatarImage src={item.coin.image} />
                        </Avatar>
                        <span>{item.coin.symbol.toUpperCase()}</span>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.buyPrice}</TableCell>
                      <TableCell></TableCell>
                      <TableCell
                        className={
                          item.coin.market_cap_change_percentage_24h < 0
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        {item.coin.market_cap_change_percentage_24h}%
                      </TableCell>
                      <TableCell className="text-right">
                        {item.coin.total_volume}
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default Portfolio;
