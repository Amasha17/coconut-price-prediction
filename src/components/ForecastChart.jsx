import {
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from "recharts";
import { recentPrices, forecastPrices } from "../data/priceData";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#fff",
        border: "1px solid #dde4ee",
        borderRadius: "8px",
        padding: "10px 14px",
        fontSize: "13px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}>
        <p style={{ fontWeight: "600", marginBottom: "6px", color: "#1a3a6b" }}>{label}</p>
        {payload.map((entry, i) => (
          <p key={i} style={{ color: entry.color, margin: "2px 0" }}>
            {entry.name}: LKR {entry.value?.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function ForecastChart() {
  // Combine recent known + forecast for one continuous chart
  const recentData = recentPrices.map((d) => ({
    date: d.date,
    actual: d.price,
    forecast: null,
  }));

  const forecastData = forecastPrices.map((d) => ({
    date: d.date,
    actual: null,
    forecast: d.price,
  }));

  // Connect the last actual to the first forecast point
  const connectPoint = {
    date: recentPrices[recentPrices.length - 1].date,
    actual: recentPrices[recentPrices.length - 1].price,
    forecast: recentPrices[recentPrices.length - 1].price,
  };

  const combined = [...recentData.slice(0, -1), connectPoint, ...forecastData];

  return (
    <div style={{
      background: "#fff",
      borderRadius: "12px",
      border: "1px solid #dde4ee",
      padding: "24px",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <div>
          <h2 style={{ fontSize: "17px", fontWeight: "600", color: "#1a3a6b", margin: 0 }}>
            📉 5-Week Future Price Forecast
          </h2>
          <p style={{ fontSize: "12px", color: "#888", margin: "4px 0 0" }}>
            GRU model (Method 2 — cleaned data) &nbsp;·&nbsp; MAPE ≈ 3.7%
          </p>
        </div>
        <div style={{
          background: "#eafaf1",
          color: "#1a8048",
          fontSize: "11px",
          fontWeight: "600",
          padding: "4px 12px",
          borderRadius: "20px",
        }}>
          ★ Best model
        </div>
      </div>

      {/* Forecast stat cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "10px",
        marginBottom: "20px",
      }}>
        {forecastPrices.map((item, i) => (
          <div key={i} style={{
            background: "#f0fff5",
            border: "1px solid #b7ebd0",
            borderRadius: "8px",
            padding: "10px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#1a8048" }}>
              LKR {item.price.toLocaleString()}
            </div>
            <div style={{ fontSize: "10px", color: "#555", marginTop: "3px" }}>
              {item.date}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={combined} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "#888" }}
            angle={-30}
            textAnchor="end"
            height={45}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#888" }}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            label={{
              value: "LKR per 1,000 nuts",
              angle: -90,
              position: "insideLeft",
              offset: 10,
              style: { fontSize: 11, fill: "#aaa" }
            }}
            domain={["auto", "auto"]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
          <ReferenceLine
            x={connectPoint.date}
            stroke="#aaa"
            strokeDasharray="4 4"
            label={{ value: "Forecast →", fill: "#aaa", fontSize: 10, position: "top" }}
          />
          <Line
            type="monotone"
            dataKey="actual"
            name="Known prices"
            stroke="#185FA5"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#185FA5" }}
            activeDot={{ r: 5 }}
            connectNulls={false}
          />
          <Line
            type="monotone"
            dataKey="forecast"
            name="GRU forecast"
            stroke="#27ae60"
            strokeWidth={2.5}
            strokeDasharray="6 4"
            dot={{ r: 5, fill: "#27ae60", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
            connectNulls={false}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Footer note */}
      <p style={{ fontSize: "11px", color: "#aaa", textAlign: "center", marginTop: "12px" }}>
        * Replace forecast values in <code>src/data/priceData.js</code> with your actual GRU model output from Google Colab
      </p>
    </div>
  );
}

export default ForecastChart;