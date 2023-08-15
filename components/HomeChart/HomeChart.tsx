"use client";
import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { fetchStat } from "../../app/Redux/features/Products/productsSlice";
import { useAppDispatch } from "../../app/Redux/hook";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale);

const HomeChart = () => {
  const dispatch = useAppDispatch();
  const [chartData, setChartData] = useState({
    labels: [],
    // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
    datasets: [
      {
        label: "Average discounts per category",
        data: [],
        // you can set indiviual colors for each bar
        backgroundColor: ["#2B59FF"],
        borderWidth: 1,
        barThickness: 10,
        categoryPercentage: 1,
        borderRadius: 20,
      },
    ],
  });

  const fetchStatData = async () => {
    const resp = await dispatch(fetchStat());
    setChartData({
      labels: resp.payload?.map((item: any) => item._id),
      // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
      datasets: [
        {
          label: "Average discounts per category",
          data: resp.payload?.map((item: any) =>
            Math.ceil(item.averageDiscount)
          ),
          // you can set indiviual colors for each bar
          backgroundColor: ["#2B59FF"],
          borderWidth: 1,
          barThickness: 10,
          categoryPercentage: 1,
          borderRadius: 20,
        },
      ],
    });
  };
  useEffect(() => {
    fetchStatData();
  }, []);

  return (
    <Bar
      data={chartData}
      options={{
        indexAxis: "y",
        plugins: {},
      }}
    />
  );
};

export default HomeChart;
