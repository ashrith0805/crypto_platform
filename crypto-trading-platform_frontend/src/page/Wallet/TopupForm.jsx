import { RadioGroup } from "@radix-ui/react-radio-group";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { useDispatch } from "react-redux";
import { paymentHandler } from "@/State/Wallet/Action";
const TopupForm = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = React.useState("");
  /* Create state variable amount with initial value of empty string applied
  to all components in the page, setAmount is a setter function to set the state to anything
  onChange is an event handler so that whenever the input is changed the handleChange function is called.
  Which extracts the event as e, e.target as the element triggering the change and the e.target.value as the value of that element. 
  KEY IDEA KEEP THE STATE IN SYNC WITH EVERY SINGLE UPDATE SO THE VALUE OF THE INPUT FIELD
  WILL BE THE UPDATED STATE ALWAYS  
   */
  const handleSubmit = () => {
    console.log(amount);
    dispatch(
      paymentHandler({ jwt: localStorage.getItem("jwt"), amount: amount })
    );
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  return (
    <>
      <div className="pt-10 space-y-5">
        <div>
          <h1 className="pb-1">Enter Amount</h1>
          <Input
            onChange={handleAmount}
            value={amount}
            className="py-7 text-lg"
            placeholder="$2333"
          ></Input>
        </div>
        <div>
          <DialogClose className="w-full">
            <Button onClick={handleSubmit} className="w-full py-7">
              Submit
            </Button>
          </DialogClose>
        </div>
      </div>
    </>
  );
};
export default TopupForm;
