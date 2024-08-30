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
import { useDispatch, useSelector } from "react-redux";
import { getOrdersForUser } from "@/State/Order/Action";
const Activity = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getOrdersForUser({
        jwt: localStorage.getItem("jwt"),
        orderType: "ille",
        assetsymbol: "ille",
      })
    );
  }, []);
  const orders = useSelector((store) => store.order);
  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">Activity</h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="py-8">Date & Time</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price at time</TableHead>
            <TableHead>Amount( sale or purchase)</TableHead>
            <TableHead className>TYPE</TableHead>
            <TableHead className=" ">Profit/loss</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.orders?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <p>{item.timestamp.substring(0, 10)}</p>
                <p> {item.timestamp.substring(11, 19)}</p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50 h-10 w-12">
                  <AvatarImage src={item.orderItem.coin?.image} />
                </Avatar>
                <span> {item.orderItem.coin?.id.toUpperCase()}</span>
              </TableCell>
              <TableCell>{item.orderItem?.quantity}</TableCell>
              <TableCell>
                $
                {item.orderType == "SELL"
                  ? item.orderItem.sellPrice
                  : item.orderItem.buyPrice}
              </TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>{item.orderType}</TableCell>
              <TableCell
                className={
                  item.orderItem.sellPrice != 0 &&
                  item.orderItem.quantity *
                    (item.orderItem.sellPrice - item.orderItem.buyPrice) <
                    0
                    ? "text-red-600"
                    : item.orderItem.sellPrice != 0 &&
                      item.orderItem.quantity *
                        (item.orderItem.sellPrice - item.orderItem.buyPrice) >
                        0
                    ? "text-green-600"
                    : ""
                }
              >
                {item.orderItem.sellPrice == 0
                  ? "N/A"
                  : item.orderItem.quantity *
                    (item.orderItem.sellPrice - item.orderItem.buyPrice)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Activity;
