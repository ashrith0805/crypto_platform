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
import { register } from "@/State/Auth/Action";
import { DialogClose } from "@radix-ui/react-dialog";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: "",
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
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
    dispatch(register({ data, navigate }));
  };
  /*

  dispatching send ACTION to the redux store which will then using the reducers trigger the 
  appropriate state update
  */
  return (
    <div>
      <h1 className="text-xl font-bold text-center pb-3">Sign Up</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="idk@gmail.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="border w-full border-gray-700 p-5"
                    placeholder="idk"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full py-5">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default Signup;
