import React from "react";
import "./Auth.css";
import Signup from "./Signup";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ForgotPassword from "./ForgotPassword";
import { LogIn } from "lucide-react";
import Signin from "./Signin";
//utility class used to center and constrain the width of content within the container toa  predefined maximum, commonly used for layouts to esnure the content is not too large
const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <div className="h-screen relative authContainer">
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#030712] bg-opacity-50">
          <div className="bgBlure absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 box flex flex-col justify-center items-center  h-[35rem] w-[30rem]  rounded-md z-50 bg-black bg-opacity-50 shadow-2xl shadow-white px-10 py-2">
            <h1 className="text-6xl font-bold pb-9">CrypChant</h1>
            {location.pathname == "/signup" ? (
              <section className="w-full">
                <Signup />
                <div className="flex items-center justify-center mt-5">
                  <span> Already have an account?</span>
                  <Button onClick={() => navigate("signin")} varaint="ghost">
                    Sign In
                  </Button>
                </div>
              </section>
            ) : location.pathname == "/forgot-password" ? (
              <section className="w-full">
                <ForgotPassword />
                <div className="flex items-center justify-center mt-10">
                  <span> Log In</span>
                  <Button onClick={() => navigate("signin")} varaint="outline">
                    Sign In
                  </Button>
                </div>
              </section>
            ) : (
              <section className="w-full">
                <Signin />
                <div className="flex items-center justify-center mt-10">
                  <span> Do not have an account?</span>
                  <Button onClick={() => navigate("signup")} varaint="outline">
                    Sign Up
                  </Button>
                </div>
                <div className="mt-10">
                  <span> </span>
                  <Button
                    className="w-full py-5"
                    onClick={() => navigate("forgot-password")}
                    varaint="outline"
                  >
                    Forgot Password
                  </Button>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Auth;
