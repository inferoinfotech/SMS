import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getchart } from '../../../api/importantNumberApi' // Import the API function

const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload, value } = props;

  return (
    <circle cx={cx} cy={cy} r={5} fill={stroke} />
  );
};

const BalanceChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getchart();
        console.log('API Response:', response); // Log the response to debug
        if (response.success && response.data && response.data.length > 0) {
          const chartData = response.data.map(item => ({
            name: item.date, // Use the date as the X-axis label
            value: item.totalExpenses, // Use totalExpenses as the Y-axis value
          }));
          setData(chartData);
        } else {
          console.warn('No data available for the chart.');
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setError('Failed to fetch chart data. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading chart data...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white-100 pt-4 pr-4">
     
      <div className="flex justify-center">
        {data.length > 0 ? (
          <LineChart width={900} height={320} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" name="Total Expenses" dot={<CustomizedDot />} />
          </LineChart>
        ) : (
          <div className="text-center">No data available for the chart.</div>
        )}
      </div>
    </div>
  );
};

export default BalanceChart;