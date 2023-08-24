'use client'
import { yearlySalesChartOptions } from "@/utils/config";
import { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

const monthsArray = ['jan', 'feb', 'mar', 'apr', 'may','jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];


export default function SalesChart() {
    const [orders, setOrders] = useState("");
    console.log("Orders", orders)

    useEffect(() => {
        fetch("api/orders")
        .then(response => response.json())
            .then(data => {
                setOrders(data);
        })
        .catch(error => console.error(error))
    }, [])
    
    
    function getSales(myOrders, getMonth) {

        if (orders.length === 0) {
            return 0;
        } else {

            return myOrders
                .filter((item) => monthsArray[(new Date(item.createdAt)).getMonth()] === getMonth)
                .reduce((acc, productItem) => acc + (productItem.line_items[0].price_data.unit_amount/100), 0)
        }
    }


    const series = [ {
        name: "sales",
        data: monthsArray.map(item => getSales(orders, item)),
    }];
console.log("series", series)

    return <div className="w-full bg-white rounded p-3 mt-3 md:w-full lg:w-full shadow">
        <div className="flex-wrap items-start justify-between gap-3 sm-flex-nowrap flex-1 w-full md:w-full">
            <p className="font-bold">Monthly Sales</p>
            <div className="w-full">
                <div id="YearlyAnalyticsChartOptions" className="-ml-5">
                    <ReactApexChart 
                        options={yearlySalesChartOptions} 
                        series={series}
                        type="area"
                        height={350} 
                        width="100%"
                    /> 
                </div>
            </div>
        </div>
    </div>
}