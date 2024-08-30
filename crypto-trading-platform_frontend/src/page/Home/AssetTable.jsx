import React from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
const AssetTable = ({ coin, category }) => {
  const navigate = useNavigate();
  return (
    <>
      <Table className="px-5  border-t relative">
        <ScrollArea className={category == "all" ? "h-[74vh]" : "h-[82vh]"}>
          <TableHeader>
            <TableRow className="sticky top-0 left-0 right-0 bg-background">
              <TableHead className="py-4">Coin</TableHead>
              <TableHead className="text-left">Symbol</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead>Market cap</TableHead>
              <TableHead>
                {category == "trending" ? "24 H Price Change" : "24H"}
              </TableHead>
              <TableHead className="text-right">Price($)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {coin.map((item, index) => (
              <TableRow
                className="cursor-pointer"
                key={index}
                onClick={() =>
                  navigate(
                    `/market/${category == "trending" ? item.item.id : item.id}`
                  )
                }
              >
                <TableCell className="font-medium flex items-center gap-2">
                  <Avatar className="w-8 h-11 -z-50">
                    <AvatarImage
                      src={
                        category == "trending" ? item.item.small : item.image
                      }
                    />
                  </Avatar>
                  <span> {item.id}</span>
                </TableCell>
                <TableCell className="gap-2">
                  {category == "trending"
                    ? item.item.symbol
                    : item.symbol.toUpperCase()}
                </TableCell>
                <TableCell>
                  {category == "trending"
                    ? item.item.data.total_volume
                    : item.total_volume}
                </TableCell>
                <TableCell>
                  {category == "trending"
                    ? item.item.data.market_cap
                    : item.market_cap}
                </TableCell>
                <TableCell
                  className={
                    category === "trending" &&
                    item.item.data.price_change_percentage_24h.usd < 0
                      ? "text-red-600"
                      : category === "trending"
                      ? "text-green-600"
                      : item.market_cap_change_percentage_24h < 0
                      ? "text-red-600"
                      : "text-green-600"
                  }
                >
                  {category == "trending"
                    ? item.item.data.price_change_percentage_24h.usd
                    : item.market_cap_change_percentage_24h}
                  %
                </TableCell>
                <TableCell className="text-right">
                  {category == "trending"
                    ? item.item.data.price
                    : item.current_price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ScrollArea>
      </Table>
    </>
  );
};
export default AssetTable;
