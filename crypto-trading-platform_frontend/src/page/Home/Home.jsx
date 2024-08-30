import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import AssetTable from "./AssetTable";
import CoinChart from "./CoinChart";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { DotIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoinById,
  getCoinList,
  getTop50Coin,
  getTrendingCoinList,
} from "@/State/Coin/Action";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeftIcon } from "lucide-react";

const Home = () => {
  const [page, setPage] = React.useState(1);
  const handlePageChange = (p) => {
    setPage(p);
    console.log(page);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoinList(page));
  }, [page]);
  useEffect(() => {
    dispatch(getCoinById("bitcoin"));
  }, []);
  useEffect(() => {
    dispatch(getTop50Coin());
  }, []);

  useEffect(() => {
    dispatch(getTrendingCoinList());
  }, []);
  const [category, setCategory] = React.useState("all");
  const coin = useSelector((state) => state.coin);
  /*
  A state variable is used to track and react to changes in application state
  They hold information that may chnage over the lifetime of a component and trigger 
  rerending of that component
  This is a state hook, whcih initializes a state variable with initial value of
  all. The setCategory function is used to update the value of category. 
  */
  const handleCategory = (category) => setCategory(category);
  /*Function used to update the state */
  return (
    <div className="relative">
      <div className="lg:flex">
        <div className="lg:w-[50%] lg:border-r">
          <div className="p-3 flex items-center gap-4">
            <Button
              onClick={() => handleCategory("all")} // when the button is pressed its state is set to all
              variant={category == "all" ? "default" : "outline"} //ternanry operator if the state is all then set default styling else set outline
              className="rounded-full"
            >
              All
            </Button>

            <Button
              onClick={() => handleCategory("top50")} // when the button is pressed its state is set to all
              variant={category == "top50" ? "default" : "outline"} //ternanry operator if the state is all then set default styling else set outline
              className="rounded-full"
            >
              Top-50
            </Button>

            <Button
              onClick={() => handleCategory("trending")} // when the button is pressed its state is set to all
              variant={category == "trending" ? "default" : "outline"} //ternanry operator if the state is all then set default styling else set outline
              className="rounded-full"
            >
              Trending
            </Button>
          </div>
          <AssetTable
            coin={
              category == "all"
                ? coin.coinList
                : category == "top50"
                ? coin.top50
                : category == "trending"
                ? coin.trending
                : ""
            }
            category={category}
          />
          {category == "all" && (
            <div>
              <Pagination className="border-t py-3">
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      disabled={page == 1}
                      onClick={() => handlePageChange(page - 1)}
                    >
                      <ChevronLeftIcon className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(1)}
                      isActive={page == 1}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(2)}
                      isActive={page == 2}
                    >
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageChange(3)}
                      isActive={page == 3}
                    >
                      3
                    </PaginationLink>
                  </PaginationItem>
                  {page > 3 && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => handlePageChange(3)}
                        isActive
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      className="cursor-pointer"
                      onClick={() => handlePageChange(page + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
        <div className="hidden lg:block lg:w-[50%] p-5">
          <CoinChart id="bitcoin" />
          {coin ? (
            <div className="flex gap-10 items-center">
              <div>
                <Avatar>
                  <AvatarImage
                    className="h-12 w-12"
                    src={coin.coinById?.image}
                  ></AvatarImage>
                </Avatar>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p>{coin.coinById?.id}</p>
                  <DotIcon className="text-gray-400" />
                  <p className="text-gray-400">
                    {coin.coinById?.symbol.toUpperCase()}
                  </p>
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-xl font-bold">
                    {coin.coinById?.current_price}
                  </p>
                  <p
                    className={
                      coin.coinById?.market_cap_change_percentage_24h < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    <span>{coin.coinById?.market_cap}</span>
                    <span>
                      ({coin.coinById?.market_cap_change_percentage_24h})%
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            "hello"
          )}
        </div>
      </div>
    </div>
  ); // allows for relative positioning
};
export default Home;
