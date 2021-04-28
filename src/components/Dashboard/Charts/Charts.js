import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
function Charts() {
    const data = [
        {
            name: "Jan",
            questions: 4,
            answers: 2,
        },
        {
            name: "Feb",
            questions: 3,
            answers: 1,
        },
        {
            name: "Mar",
            questions: 2,
            answers: 7,
        },
        {
            name: "Apr",
            questions: 2,
            answers: 3,
        },
        {
            name: "May",
            questions: 1,
            answers: 4,
        },
        {
            name: "Jun",
            questions: 2,
            answers: 3,
        },
        {
            name: "July",
            questions: 3,
            answers: 4,
        },
    ];

    return (
        <LineChart
            width={1000}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="answers" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="questions" stroke="#82ca9d" />
        </LineChart>
    );
}

export default Charts;