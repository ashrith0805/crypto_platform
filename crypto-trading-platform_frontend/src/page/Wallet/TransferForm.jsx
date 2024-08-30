import { RadioGroup } from "@radix-ui/react-radio-group";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { transferMoney } from "@/State/Wallet/Action";
import { DialogClose } from "@radix-ui/react-dialog";
const TransferForm = () => {
  const dispatch = useDispatch();
  const wallet = useSelector((store) => store);

  const [formData, setFormData] = React.useState({
    amount: "",
    walletId: "",
    purpose: "",
  });
  /*
  This is object based state all the form fields are grouped into one single state object
  When you update state you generally update the entire object using the spread operator
  */
  /*
  formDAta is the current state which holds three properties amount,walletId and purpose
  all initially set to empty string. handleChange is an event handler function used to update the state
  of formData when one of these prperties change. e is the event that triggered the function,
  this function is taking in an event as paremeter. setFormData creates a new form state object, the ...
  spread operator copies all the unchanged properties. e is the event, e.target is the element triggering the change
  e.target.name is the name of the input field, e.target.value is the new value in that filed that needs to be updated



  */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, //key value pair update the appropriate key with the value
    });
    // setAmount(e.target.value);
  };
  /* Create state variable amount with initial value of empty string applied
  to all components in the page, setAmount is a setter function to set the state to anything
  onChange is an event handler so that whenever the input is changed the handleChange function is called.
  Which extracts the event as e, e.target as the element triggering the change and the e.target.value as the value of that element. 
  KEY IDEA KEEP THE STATE IN SYNC WITH EVERY SINGLE UPDATE SO THE VALUE OF THE INPUT FIELD
  WILL BE THE UPDATED STATE ALWAYS  
   */
  const handleSubmit = () => {
    dispatch(
      transferMoney({
        jwt: localStorage.getItem("jwt"),
        walletId: formData.walletId,
        reqData: {
          amount: formData.amount,
          purpose: formData.purpose,
        },
      })
    );
  };

  return (
    <>
      <div className="pt-10 space-y-5">
        <div>
          <h1 className="pb-1">Enter Amount</h1>
          <Input
            name="amount"
            onChange={handleChange}
            value={formData.amount}
            className="py-7 text-lg"
            placeholder="$2333"
          ></Input>
        </div>

        <div>
          <h1 className="pb-1">Enter Wallet ID</h1>
          <Input
            name="walletId"
            onChange={handleChange}
            value={formData.walletId}
            className="py-7 text-lg"
            placeholder="#DEHEWP234"
          ></Input>
        </div>

        <div>
          <h1 className="pb-1">Purpose</h1>
          <Input
            name="purpose"
            onChange={handleChange}
            value={formData.purpose}
            className="py-7 text-lg"
            placeholder="friends gift"
          ></Input>
        </div>

        <div>
          <DialogClose>
            <Button onClick={handleSubmit} className="w-full py-7">
              Submit
            </Button>
          </DialogClose>
        </div>
      </div>
    </>
  );
};
export default TransferForm;
