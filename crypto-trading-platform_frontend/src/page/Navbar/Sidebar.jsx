import {
  ExitIcon,
  HandIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
  PersonIcon,
  DashboardIcon,
  HomeIcon,
  BellIcon,
  ActivityLogIcon,
} from "@radix-ui/react-icons";
import {
  CreditCardIcon,
  LandmarkIcon,
  SettingsIcon,
  WalletIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import React from "react";
import { SheetClose } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/State/Auth/Action";
const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
  {
    name: "Portfolio",
    path: "/portfolio",
    icon: <DashboardIcon className="h-6 w-6" />,
  },

  {
    name: "Watchlist",
    path: "/watchlist",
    icon: <BookmarkIcon className="h-6 w-6" />,
  },
  {
    name: "Activity",
    path: "/activity",
    icon: <ActivityLogIcon className="h-6 w-6" />,
  },
  { name: "Wallet", path: "/wallet", icon: <WalletIcon /> },
  {
    name: "Payment Details",
    path: "/payment-details",
    icon: <LandmarkIcon className="h-6 w-6" />,
  },

  {
    name: "Withdrawal",
    path: "/withdrawal",
    icon: <CreditCardIcon className="h-6 w-6" />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <PersonIcon className="h-6 w-6" />,
  },

  { name: "Logout", path: "/", icon: <ExitIcon className="h-6 w-6" /> },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout());
  };
  // dispatching a function to update the state
  const navigate = useNavigate();
  return (
    <div className="mt-10 space-y-5">
      {menu.map((item, index) => {
        return (
          <div key={index}>
            <SheetClose className="w-full">
              <Button
                key={index}
                onClick={() => {
                  if (item.name == "Logout") {
                    handleLogOut();
                    navigate("/signin");
                  } else navigate(item.path);
                }}
                className="flex itmes-center gap-5 py-6 w-full"
              >
                <span className="w-15 ">{item.icon}</span>
                <p>{item.name}</p>
              </Button>
            </SheetClose>
          </div>
        );
      })}
    </div>
  );
};
export default Sidebar;
