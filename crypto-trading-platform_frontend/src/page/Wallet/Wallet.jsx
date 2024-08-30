import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ReloadIcon, UpdateIcon, UploadIcon } from "@radix-ui/react-icons";
import {
  CopyIcon,
  DollarSign,
  DollarSignIcon,
  DownloadIcon,
  PoundSterlingIcon,
  ShuffleIcon,
  WalletIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect } from "react";
import TopupForm from "./TopupForm";
import WithdrawalForm from "./WithdrawalForm";
import TransferForm from "./TransferForm";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  depositMoney,
  getUserWallet,
  getWalletTransactions,
} from "@/State/Wallet/Action";
import { useLocation, useNavigate } from "react-router-dom";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Wallet = () => {
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = useQuery();
  const orderId = query.get("order_id");
  useEffect(() => {
    if (orderId) {
      dispatch(
        depositMoney({
          jwt: auth.jwt || localStorage.getItem("jwt"),
          orderId,
          navigate,
        })
      );
    }
  }, []);
  useEffect(() => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  }, []);
  useEffect(() => {
    dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }));
  }, []);
  const handleFetchWalletTransactions = () => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  };
  const wallet = useSelector((state) => state.wallet);
  //console.log(wallet.transactions);
  return (
    <>
      {wallet ? (
        <div className="flex flex-col items-center">
          <div className="pt-10 w-full lg:w-[60%]">
            <Card>
              <CardHeader className="pb-9">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-5">
                    <WalletIcon size={30} />
                    <div>
                      <CardTitle className="text-2xl">My Wallet</CardTitle>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-200 text-sm">
                          {wallet.userWallet.id}
                        </p>
                        <CopyIcon
                          size={15}
                          className="cursor-pointer hover:text-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <ReloadIcon
                      onClick={() =>
                        dispatch(getUserWallet(localStorage.getItem("jwt")))
                      }
                      className="w-6 h-6 cursor-pointer hover:text-gray-400"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSignIcon />
                  <span className="text-2xl font-semibold">
                    {wallet.userWallet.balance}
                  </span>
                </div>
                <div className="flex gap-7 mt-5">
                  <Dialog className="">
                    <DialogTrigger>
                      <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                        <UploadIcon />
                        <span className="text-sm mt-2 ">Add Money</span>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="p-10">
                      <DialogHeader>
                        <DialogTitle className="text-center text-2xl">
                          Top Up Your Wallet
                        </DialogTitle>
                      </DialogHeader>
                      <TopupForm />
                    </DialogContent>
                  </Dialog>

                  <Dialog className="">
                    <DialogTrigger>
                      <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                        <DownloadIcon size={15} />
                        <span className="text-sm mt-2 ">Withdraw</span>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="p-10">
                      <DialogHeader>
                        <DialogTitle className="text-center text-2xl">
                          Request withdrawal
                        </DialogTitle>
                      </DialogHeader>
                      <WithdrawalForm />
                    </DialogContent>
                  </Dialog>

                  <Dialog className="">
                    <DialogTrigger>
                      <div className="h-24 w-24 hover:text-gray-400 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-800 shadow-md">
                        <ShuffleIcon size={20} />
                        <span className="text-sm mt-2 ">Transfer</span>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="p-10">
                      <DialogHeader>
                        <DialogTitle className="text-center text-2xl">
                          Transfer money to other wallet
                        </DialogTitle>
                      </DialogHeader>
                      <TransferForm />
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>

            <div className="py-5 pt-10">
              <div className="flex gap-2 items-center pb-5">
                <h1 className="text-2xl font-semibold">History</h1>
                <UpdateIcon className="h-7 w-7 p-0 cursor-pointer hover:text-gray-400" />
              </div>
              <div className="space-y-5">
                {wallet.transactions.map((item, index) => (
                  <Card
                    key={index}
                    className="px-5 flex justify-between items-center p-2 "
                  >
                    <div className="flex items-center gap-5">
                      <Avatar onClick={handleFetchWalletTransactions}>
                        <AvatarFallback>
                          <ShuffleIcon className="" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h1>{item.type}</h1>
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </div>
                      <div>
                        <p
                          className={
                            (item.type != "WITHDRAWAL" && item.amount) > 0
                              ? "text-green-500"
                              : "text-red-600"
                          }
                        >
                          {item.type == "WITHDRAWAL" ? "-" : ""} {item.amount}{" "}
                          USD{" "}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Wallet;
