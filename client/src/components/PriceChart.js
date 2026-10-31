import React from 'react';

import {

    LineChart,

    Line,

    XAxis,

    YAxis,

    CartesianGrid,

    Tooltip,

    ResponsiveContainer

} from 'recharts';

function PriceChart({

    history,

    darkMode

}) {

    const data = history.map(
        (item) => ({

            price: item.price,

            date:

                new Date(
                    item.date
                ).toLocaleDateString()

        })
    );

    return (

        <div
            style={{
                width: '100%',
                height: 300
            }}
        >

            <ResponsiveContainer>

                <LineChart data={data}>

                    <CartesianGrid
                        stroke={
                            darkMode
                                ? '#555'
                                : '#ccc'
                        }
                    />

                    <XAxis

                        dataKey="date"

                        stroke={
                            darkMode
                                ? 'white'
                                : 'black'
                        }

                    />

                    <YAxis

                        stroke={
                            darkMode
                                ? 'white'
                                : 'black'
                        }

                    />

                    <Tooltip />

                    <Line

                        type="monotone"

                        dataKey="price"

                        stroke={
                            darkMode
                                ? '#00ff99'
                                : '#8884d8'
                        }

                        strokeWidth={3}

                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}

export default PriceChart;