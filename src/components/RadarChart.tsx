import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface StatData {
  subject: string;
  user: number;
  avg: number;
}

interface CustomRadarChartProps {
  data: StatData[];
  height?: number;
}

const CustomRadarChart: React.FC<CustomRadarChartProps> = ({
  data,
  height = 400,
}) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid strokeDasharray="6 6" stroke="#fff3" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "#fff", fontSize: 18 }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 100]}
          tick={false}
          axisLine={false}
        />
        <Radar
          name="유저"
          dataKey="user"
          stroke="#ff8800"
          fill="#ff8800"
          fillOpacity={0.5}
        />
        <Radar
          name="평균"
          dataKey="avg"
          stroke="#00eaff"
          fill="#00eaff"
          fillOpacity={0.3}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default CustomRadarChart;
