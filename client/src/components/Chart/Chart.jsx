import "./Chart.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart() {

    const data = [
        {
          name: 'Jan',
          Revenue: 310,
          Customers: 10,
        },
        {
          name: 'Feb',
          Revenue: 500,
          Customers: 16,
        },
        {
          name: 'Mar',
          Revenue: 430,
          Customers: 13,
        },
        {
          name: 'Apr',
          Revenue: 200,
          Customers: 9,
        },
        {
          name: 'Mai',
          Revenue: 180,
          Customers: 11,
        },
        {
          name: 'Jun',
          Revenue: 310,
          Customers: 12,
        },
        {
          name: 'Jul',
          Revenue: 360,
          Customers: 14,
        },
        {
          name: 'Aug',
          Revenue: 480,
          Customers: 15,
        },
        {
          name: 'Sep',
          Revenue: 390,
          Customers: 13,
        },
        {
          name: 'Oct',
          Revenue: 400,
          Customers: 9,
        },
        {
          name: 'Nov',
          Revenue: 285,
          Customers: 8,
        },
        {
          name: 'Dec',
          Revenue: 320,
          Customers: 14,
        },
      ];
      
    return (
        <div className="chart">
            <span className="chartTitle">Revenue Analysis for 2020</span>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data} margin={{top: 35, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Revenue" stroke="#1877f2" activeDot={{ r: 8 }}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}