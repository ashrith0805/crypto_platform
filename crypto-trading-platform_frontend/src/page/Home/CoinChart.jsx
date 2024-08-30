import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { getMarketChart } from "@/State/Coin/Action";

const timeSeries = [
  {
    keyword: "DIGITAL_CURRENCY_DAILY",
    key: "Time Series (Daily)",
    label: "1 Day",
    value: 1,
  },
  {
    keyword: "DIGITAL_CURRENCY_WEEKLY",
    key: "Weekly Time Series",
    label: "1 Week",
    value: 7,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY",
    key: "Monthly Time Series",
    label: "1 Month",
    value: 30,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY_3",
    key: "3 Month Time Series",
    label: "3 Month",
    value: 90,
  },
  {
    keyword: "DIGITAL_CURRENCY_MONTHLY_6",
    key: "6 Month Time Series",
    label: "6 Month",
    value: 180,
  },
  {
    keyword: "DIGITAL_CURRENCY_YEARLY",
    key: "Yearly Time Series",
    label: "1 year",
    value: 365,
  },
];

const CoinChart = ({ id }) => {
  const dispatch = useDispatch();
  const [activeType, setActiveType] = useState(timeSeries[0]);
  useEffect(() => {
    dispatch(
      getMarketChart({
        coinId: id,
        days: activeType.value,
        jwt: localStorage.getItem("jwt"),
      })
    );
  }, [id, activeType.value]);
  const { coin } = useSelector((store) => store);
  const series = [{ data: coin.marketChart.data }];
  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 700,
      zoom: {
        autoScaleYaxis: true,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      type: "datetime",
      tickAmount: 6,
    },
    markers: {
      colors: ["#fff"],
      strokeColor: "#fff",
      size: 0,
      strokeOpacity: 0.2,
      strokeWidth: 1,
      style: "hollow",
    },
    tooltip: {
      theme: "dark",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.8,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    grid: {
      borderColor: "#47535E",
      strokeDashArray: 4,
      show: true,
    },
  };

  return (
    <div>
      <div className="space-x-3">
        {timeSeries.map((item, index) => (
          <Button
            onClick={() => setActiveType(item)}
            variant={activeType.label === item.label ? "default" : "outline"}
            key={index}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div id="chart-timelines">
        <ReactApexChart
          options={options}
          series={series}
          height={600}
          type="area"
        ></ReactApexChart>
      </div>
    </div>
  );
};

export default CoinChart;
