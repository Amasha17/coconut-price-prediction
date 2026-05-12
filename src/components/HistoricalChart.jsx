import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from "recharts";
import { historicalPrices, cleanedPrices } from "../data/priceData";

// Custom tooltip
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
            {entry.name}: LKR {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function HistoricalChart() {
  // Merge both datasets for display
  const merged = historicalPrices.map((item, i) => ({
    date: item.date,
    original: item.price,
    cleaned: cleanedPrices[i]?.price ?? null,
  }));

  return (
    <div style={{
      background: "#fff",
      borderRadius: "12px",
      border: "1px solid #dde4ee",
      padding: "24px",
      marginBottom: "24px",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
        <div>
          <h2 style={{ fontSize: "17px", fontWeight: "600", color: "#1a3a6b", margin: 0 }}>
            📈 Historical Weekly Wholesale Coconut Prices
          </h2>
          <p style={{ fontSize: "12px", color: "#888", margin: "4px 0 0" }}>
            May 2021 – April 2026 &nbsp;·&nbsp; 236 weekly records &nbsp;·&nbsp; LKR per 1,000 coconuts
          </p>
        </div>
        <div style={{
          background: "#e8f0fb",
          color: "#185FA5",
          fontSize: "11px",
          fontWeight: "600",
          padding: "4px 12px",
          borderRadius: "20px",
        }}>
          Source: CDA Sri Lanka
        </div>
      </div>

      {/* Spike warning */}
      <div style={{
        background: "#fff3f3",
        border: "1px solid #f5c1c1",
        borderRadius: "8px",
        padding: "8px 14px",
        fontSize: "12px",
        color: "#c0392b",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        ⚠️ Abnormal price spike detected: Nov 2024 – Jan 2026 (max LKR 181,915).
        Red line = original data (Method 1). Blue line = corrected data (Method 2).
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={merged} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "#888" }}
            interval={4}
            angle={-35}
            textAnchor="end"
            height={50}
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
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
          />
          <ReferenceLine x="Nov-24" stroke="#e74c3c" strokeDasharray="4 4" label={{ value: "Spike start", fill: "#e74c3c", fontSize: 10 }} />
          <Line
            type="monotone"
            dataKey="original"
            name="Original price (Method 1)"
            stroke="#e74c3c"
            strokeWidth={1.5}
            dot={false}
            strokeOpacity={0.5}
            strokeDasharray="5 3"
          />
          <Line
            type="monotone"
            dataKey="cleaned"
            name="Cleaned price (Method 2)"
            stroke="#185FA5"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HistoricalChart;