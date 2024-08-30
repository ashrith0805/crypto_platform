import React from "react";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { withdrawalRequest } from "@/State/Withdrawal/Action";
import { useNavigate } from "react-router-dom";

const WithdrawalForm = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = React.useState("");
  /*
  this is primitive based state  when only a single piece of data needs to be managedd
  When updating you only need to update this single piece of data
  */
  const handleSubmit = () => {
    dispatch(
      withdrawalRequest({ amount: amount, jwt: localStorage.getItem("jwt") })
    );
    useNavigate("/wallet");
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const withdrawal = useSelector((store) => store.withdrawal);
  const wallet = useSelector((store) => store.wallet);
  return (
    <div className="pt-10 space-y-5">
      <div className="flex justify-between items-center rounded-md bg-slate-900 text-xl font-bold px-5 py-4">
        <p> Available balance</p>
        <p>$ {wallet.userWallet.balance}</p>
      </div>
      <div className="flex flex-col items-center">
        <h1> Enter Withdrawal amount</h1>
        <div className="flex items-center justify-center">
          <Input
            onChange={handleAmount}
            value={amount}
            className=" py-7 border-none outline-none focus:outline-none px-0 text-2xl text-center "
            placeholder="$9999"
            type="number"
          />
        </div>
      </div>
      <div>
        <p className="pb-2">Transfer to</p>
        <div className="flex items-center gap-5 border px-5 py-2 rounded-md">
          <img
            className="h-8 w-8"
            src="https://cdn.pixabay.com/photo/2017/03/17/13/03/bank-2151492_640.png"
          />
          <div>
            <p className="text-xl font-bold">
              {withdrawal.paymentDetails?.bankName}
            </p>
            <p className="text-xs">
              {withdrawal.paymentDetails?.accountNumber}
            </p>
          </div>
        </div>
      </div>
      <div>
        <DialogClose className="w-full">
          <Button onClick={handleSubmit} className="w-full py-7">
            Request
          </Button>
        </DialogClose>
      </div>
    </div>
  );
};
export default WithdrawalForm;
