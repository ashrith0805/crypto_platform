import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addPaymentDetails } from "@/State/Withdrawal/Action";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Paymentdetailsform = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: "",
    defaultValues: {
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
    },
  });
  /*
  using a useForm hook to manage the state of the form, default values are the initial values
   of the form inputs. onSubmit is a function called wjen the form data is submitted, it takes
   data as an argument which contains the forms submitted values.  


   <Form {...form}> takes the form object and spreads it properties to the form. 
   form.hanldeSubmit to handle the form submission. 

   <FormField> a custom component that likley ties into rwact hook form 
   used to manage the individual form field
   name="username" specifies the name of the field that is inputted to the server.
   This should match the default values object

   control={form.control} crucial for integration complex form fields with the react hook library
   passing the control over to the custom form fields.
   By passing control={form.control} to components lime form field you ensure tgar even 
   custom inputs are integrated into the form
  */
  const onSubmit = (data) => {
    dispatch(
      addPaymentDetails({
        jwt: localStorage.getItem("jwt"),
        paymentDetailsRequest: data,
      })
    );
    navigate("/payment-details");
  };
  return (
    <div className="px-10 py-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input
                    name="accountHolderName"
                    className="border w-full border-gray-700 p-5"
                    placeholder="Ashrith"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input
                    name="accountNumber"
                    className="border w-full border-gray-700 p-5"
                    placeholder="2344344"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input
                    name="accountNumber"
                    className="border w-full border-gray-700 p-5"
                    placeholder="HSBC"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose>
            <Button type="submit" className="w-full py-5">
              Submit
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  );
};
export default Paymentdetailsform;
