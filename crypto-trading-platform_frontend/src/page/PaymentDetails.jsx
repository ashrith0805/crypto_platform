import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Paymentdetailsform from "./Paymentdetailsform";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentDetails } from "@/State/Withdrawal/Action";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, []);
  const withdrawal = useSelector((store) => store.withdrawal);

  return (
    <div className="px-20">
      <h1 className="text-3xl font-bold py-10"> Payment details</h1>
      {withdrawal.paymentDetails ? (
        <Card>
          <CardHeader>
            <CardTitle>Bank Name</CardTitle>
            <CardDescription>
              {withdrawal.paymentDetails.bankName}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <p className="w-32">Account holder</p>
              <p className="text-gray-400">
                : {withdrawal.paymentDetails.accountHolderName}
              </p>
            </div>
            <div className="flex items-center">
              <p className="w-32">Account Number</p>
              <p className="text-gray-400">
                : {withdrawal.paymentDetails.accountNumber}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Dialog>
          <DialogTrigger>
            <Button className="py-6">Add payment details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment details</DialogTitle>
            </DialogHeader>
            <Paymentdetailsform />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
export default PaymentDetails;
