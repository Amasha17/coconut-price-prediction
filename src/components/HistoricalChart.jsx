import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from "recharts";
import { historicalPrices, cleanedPrices } from "../data/priceData";


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#fff", border: "1px solid #c8e6c9",
        borderRadius: "10px", padding: "12px 16px",
        boxShadow: "0 4px 16px rgba(46,125,50,0.15)", fontSize: "13px",
      }}>
        <p style={{ fontWeight: "700", color: "#1b5e20", marginBottom: "8px", fontSize: "12px" }}>
          📅 {label}
        </p>
        {payload.map((entry, i) => entry.value != null && (
          <p key={i} style={{ color: entry.color, margin: "3px 0", fontWeight: "500" }}>
            {entry.name}: <strong>LKR {Number(entry.value).toLocaleString()}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};


function HistoricalChart() {
  const merged = historicalPrices.map((item, i) => ({
    date: item.date,
    original: item.price,
    cleaned: cleanedPrices[i]?.price ?? null,
  }));

  const stats = [
    { label: "Total Records", value: "236", icon: "📊", color: "#e8f5e9", border: "#a5d6a7", text: "#1b5e20" },
    { label: "Min Price", value: "LKR 45,242", icon: "📉", color: "#fce4ec", border: "#f48fb1", text: "#b71c1c" },
    { label: "Max Price (Spike)", value: "LKR 181,916", icon: "⚠️", color: "#fff3e0", border: "#ffcc02", text: "#e65100" },
    { label: "Latest Price", value: "LKR 84,433", icon: "📌", color: "#e3f2fd", border: "#90caf9", text: "#0d47a1" },
  ];

  return (
    <div style={{
      background: "#fff", borderRadius: "16px",
      border: "1px solid #e8f5e9", padding: "28px",
      marginBottom: "28px",
      boxShadow: "0 4px 24px rgba(46,125,50,0.08)",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "linear-gradient(135deg, #2e7d32, #66bb6a)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
            }}>📈</div>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1b5e20", margin: 0 }}>
              Historical Weekly Wholesale Coconut Prices
            </h2>
          </div>
          <p style={{ fontSize: "12px", color: "#888", margin: "0 0 0 46px" }}>
            13 May 2021 – 23 April 2026 &nbsp;·&nbsp; 236 weekly records &nbsp;·&nbsp; LKR per 1,000 coconuts
          </p>
        </div>
        <div style={{
          background: "linear-gradient(135deg, #e8f5e9, #f1f8e9)",
          border: "1px solid #a5d6a7", color: "#2e7d32",
          fontSize: "11px", fontWeight: "600", padding: "5px 14px",
          borderRadius: "20px", whiteSpace: "nowrap",
        }}>
          📍 Source: CDA Sri Lanka
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", marginBottom: "20px" }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            background: s.color, border: `1px solid ${s.border}`,
            borderRadius: "12px", padding: "12px 14px",
          }}>
            <div style={{ fontSize: "18px", marginBottom: "4px" }}>{s.icon}</div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: s.text }}>{s.value}</div>
            <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Spike warning */}
      <div style={{
        background: "linear-gradient(135deg, #fff8e1, #fffde7)",
        border: "1px solid #ffe082", borderRadius: "10px",
        padding: "10px 16px", marginBottom: "20px",
        display: "flex", alignItems: "center", gap: "10px",
        fontSize: "12px", color: "#e65100",
      }}>
        <span style={{ fontSize: "16px" }}>⚠️</span>
        <span>
          <strong>Abnormal price spike detected:</strong> Nov 2024 – Jan 2026 (max LKR 181,916).
          &nbsp;🔴 Red dashed = original data (Method 1) &nbsp;|&nbsp; 🟢 Green = corrected data (Method 2)
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={merged} margin={{ top: 10, right: 30, left: 10, bottom: 60 }}>
          <defs>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2e7d32" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#2e7d32" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f8e9" />
          <XAxis
            dataKey="date" tick={{ fontSize: 9, fill: "#888" }}
            interval={11} angle={-45} textAnchor="end" height={65}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#888" }}
            tickFormatter={(v) => `${(v/1000).toFixed(0)}k`}
            label={{ value: "LKR per 1,000 nuts", angle: -90, position: "insideLeft", offset: 15, style: { fontSize: 11, fill: "#aaa" } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            formatter={(value) => <span style={{ color: "#444" }}>{value}</span>}
          />
          <ReferenceLine x="13-Nov-24" stroke="#ff6f00" strokeDasharray="5 4"
            label={{ value: "Spike ⚠️", fill: "#e65100", fontSize: 10, position: "top" }}
          />
          <Line type="monotone" dataKey="original" name="Original (Method 1)"
            stroke="#ef5350" strokeWidth={1.5} dot={false}
            strokeOpacity={0.6} strokeDasharray="5 3"
          />
          <Line type="monotone" dataKey="cleaned" name="Cleaned (Method 2)"
            stroke="#2e7d32" strokeWidth={2.5} dot={false}
            activeDot={{ r: 5, fill: "#2e7d32", stroke: "#fff", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HistoricalChart;