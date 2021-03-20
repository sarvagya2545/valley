import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

const Chart = ({ data }) => {
    const [chartData, setChartData] = useState([]);

    const customlabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = (innerRadius + outerRadius) / 2;
        const x = cx + radius * Math.cos(-midAngle * (Math.PI/180));
        const y = cy + radius * Math.sin(-midAngle * (Math.PI/180));

        return (
            <text x={x} y={y} fill="#000000" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    }

    useEffect(() => {
        const COLORS = ['skyblue', 'green', 'orange', '#FF8042', 'red'];
        const parseData = (data) => {
            if(!data || !data.length) return [];
    
            return data.map((dataItem, index) => {
                return {
                    name: dataItem["Department Name"],
                    value: parseInt(dataItem["Percentage"].slice(0,-1)),
                    color: COLORS[index % COLORS.length]
                }
            })
        }

        setChartData(parseData(data));
    },[data]);

    return (
        <>
            <PieChart width={400} height={400}>
                <Pie 
                    data={chartData} 
                    dataKey="value" 
                    cx="200" 
                    cy="200" 
                    outerRadius="100" 
                    fill="#f0f0f0"
                    label={customlabel}
                    labelLine={false}
                    isAnimationActive={false}
                >
                    {
                        chartData.map((item, index) => {
                            return (
                                <Cell key={index} fill={item.color}/>
                            )
                        })
                    }
                </Pie>
                <Legend/>
            </PieChart>
        </>
    );
}
 
export default Chart;