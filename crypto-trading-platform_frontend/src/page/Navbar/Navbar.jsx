import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DragHandleHorizontalIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import React from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Navbar = () => {
  // const { auth } = useSelector((store) => store);
  const auth = useSelector((state) => state.auth);
  return (
    //tailiwind utility classes when they are ysed as classname the styles
    //are automatically applied
    <div className="px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-11 w-11"
            >
              <DragHandleHorizontalIcon className="h-7 w-7"></DragHandleHorizontalIcon>
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-72  border-r-0 flex flex-col  justify-center"
            side="left"
          >
            <SheetHeader>
              <SheetTitle>
                <div className="text-3xl flex justify-center items-center gap-1">
                  <Avatar>
                    <AvatarImage src="https://cdn.pixabay.com/photo/2019/09/16/19/20/bitcoin-4481815_640.jpg" />
                  </Avatar>

                  <div>
                    <span className="font-bold text-red-700">Cryp</span>
                    <span>chant</span>
                  </div>
                </div>
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <Sidebar />
          </SheetContent>
        </Sheet>
        <p className="text-sm lg:text-base cursor pointer ">
          Crypchant trading
        </p>
        <div className="p-0 ml-9">
          <Button varaint="outline" className="flex items-center gap-3">
            <MagnifyingGlassIcon />
            <span>Search </span>
          </Button>
        </div>
      </div>
      <div>
        <Avatar>
          <AvatarFallback>{auth.user?.fullName[0]}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
export default Navbar;
