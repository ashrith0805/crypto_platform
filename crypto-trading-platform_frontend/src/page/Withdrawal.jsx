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
import { getWithdrawalHistory } from "@/State/Withdrawal/Action";
const Withdrawal = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWithdrawalHistory({ jwt: localStorage.getItem("jwt") }));
  }, []);
  const withdrawal = useSelector((store) => store.withdrawal);
  console.log(withdrawal.history);
  return (
    <div className="p-5 lg:px-20">
      <h1 className="font-bold text-3xl pb-5">Withdrawal Log</h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="py-8">Date</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawal.history.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <p>{item.date}</p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2">
                <span>Bank Account</span>
              </TableCell>
              <TableCell>${item.amount}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default Withdrawal;
