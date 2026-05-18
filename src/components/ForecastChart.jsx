import { useState } from "react";
import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from "recharts";
import { recentPrices } from "../data/priceData";

// All 5 weeks of GRU forecast — real values from notebook
const allForecastWeeks = [
  { week: "Week +1", date: "30 Apr 2026", price: 83038 },
  { week: "Week +2", date: "07 May 2026", price: 81723 },
  { week: "Week +3", date: "14 May 2026", price: 80531 },
  { week: "Week +4", date: "21 May 2026", price: 79409 },
  { week: "Week +5", date: "28 May 2026", price: 78339 },
];

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

function ForecastChart() {
  const [selectedWeeks, setSelectedWeeks] = useState(5);

  // Only show selected number of weeks
  const forecastPrices = allForecastWeeks.slice(0, selectedWeeks);

  // Build chart data — last 8 known + selected forecast weeks
  const recentData = recentPrices.map((d) => ({
    label: d.date, actual: d.price, forecast: null,
  }));

  const forecastData = forecastPrices.map((d) => ({
    label: d.week, actual: null, forecast: d.price,
  }));

  const connectPoint = {
    label: recentPrices[recentPrices.length - 1].date,
    actual: recentPrices[recentPrices.length - 1].price,
    forecast: recentPrices[recentPrices.length - 1].price,
  };

  const combined = [...recentData.slice(0, -1), connectPoint, ...forecastData];

  // Trend calculation
  const first = forecastPrices[0].price;
  const last  = forecastPrices[forecastPrices.length - 1].price;
  const diff  = last - first;
  const pct   = Math.abs((diff / first) * 100).toFixed(1);
  const isDown = diff < 0;

  return (
    <div style={{
      background: "#fff", borderRadius: "16px",
      border: "1px solid #e8f5e9", padding: "28px",
      boxShadow: "0 4px 24px rgba(46,125,50,0.08)",
    }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "linear-gradient(135deg, #1b5e20, #2e7d32)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
            }}>🔮</div>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1b5e20", margin: 0 }}>
              Future Price Forecast
            </h2>
          </div>
          <p style={{ fontSize: "12px", color: "#888", margin: "0 0 0 46px" }}>
            GRU model · Method 2 (cleaned data) · MAPE ≈ 3.79% · look_back = 15
          </p>
        </div>
        <div style={{
          background: "linear-gradient(135deg, #1b5e20, #2e7d32)",
          color: "#fff", fontSize: "12px", fontWeight: "600",
          padding: "6px 16px", borderRadius: "20px",
          boxShadow: "0 2px 8px rgba(27,94,32,0.3)",
        }}>
          ★ Best Model
        </div>
      </div>

      {/* ── WEEK SELECTOR ── */}
      <div style={{
        background: "linear-gradient(135deg, #f1f8e9, #e8f5e9)",
        border: "1px solid #c8e6c9", borderRadius: "12px",
        padding: "16px 20px", marginBottom: "20px",
      }}>
        <p style={{ fontSize: "13px", fontWeight: "600", color: "#1b5e20", margin: "0 0 12px" }}>
          📅 Select Forecast Period
        </p>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {[1, 2, 3, 4, 5].map((w) => (
            <button
              key={w}
              onClick={() => setSelectedWeeks(w)}
              style={{
                padding: "10px 22px",
                borderRadius: "25px",
                border: selectedWeeks === w ? "none" : "1px solid #a5d6a7",
                background: selectedWeeks === w
                  ? "linear-gradient(135deg, #2e7d32, #43a047)"
                  : "#fff",
                color: selectedWeeks === w ? "#fff" : "#2e7d32",
                fontWeight: "600",
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: selectedWeeks === w
                  ? "0 3px 10px rgba(46,125,50,0.35)"
                  : "none",
                transition: "all 0.2s",
              }}
            >
              {w} {w === 1 ? "Week" : "Weeks"}
            </button>
          ))}
        </div>
        <p style={{ fontSize: "11px", color: "#888", margin: "10px 0 0" }}>
          Showing forecast for next <strong>{selectedWeeks}</strong> {selectedWeeks === 1 ? "week" : "weeks"}
          &nbsp;·&nbsp; Based on CDA data up to 23 April 2026
        </p>
      </div>

      {/* Trend banner */}
      <div style={{
        background: isDown
          ? "linear-gradient(135deg, #e8f5e9, #f1f8e9)"
          : "linear-gradient(135deg, #fff3e0, #fffde7)",
        border: `1px solid ${isDown ? "#a5d6a7" : "#ffe082"}`,
        borderRadius: "12px", padding: "12px 20px", marginBottom: "20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "22px" }}>{isDown ? "📉" : "📈"}</span>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "700", color: isDown ? "#1b5e20" : "#e65100" }}>
              Prices forecast to {isDown ? "decrease" : "increase"} over next {selectedWeeks} {selectedWeeks === 1 ? "week" : "weeks"}
            </div>
            <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
              {isDown ? "▼" : "▲"} {pct}% change · LKR {Math.abs(diff).toLocaleString()} {isDown ? "lower" : "higher"} by Week {selectedWeeks}
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "11px", color: "#888" }}>Model Accuracy</div>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#2e7d32" }}>MAPE ≈ 3.79%</div>
        </div>
      </div>

      {/* Forecast week cards — only show selected weeks */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${selectedWeeks}, 1fr)`,
        gap: "10px", marginBottom: "24px",
      }}>
        {forecastPrices.map((item, i) => (
          <div key={i} style={{
            background: "linear-gradient(135deg, #e8f5e9, #f9fbe7)",
            border: "1px solid #a5d6a7", borderRadius: "12px",
            padding: "14px 10px", textAlign: "center",
            boxShadow: "0 2px 8px rgba(46,125,50,0.08)",
          }}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#2e7d32",
              textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
              {item.week}
            </div>
            <div style={{ fontSize: "10px", color: "#888", marginBottom: "6px" }}>
              {item.date}
            </div>
            <div style={{ fontSize: "16px", fontWeight: "700", color: "#1b5e20" }}>
              LKR {item.price.toLocaleString()}
            </div>
            <div style={{ fontSize: "10px", marginTop: "4px",
              color: i === 0 ? "#888" : item.price < forecastPrices[i-1].price ? "#c62828" : "#2e7d32" }}>
              {i === 0 ? "↔ Starting point"
                : item.price < forecastPrices[i-1].price
                  ? `▼ LKR ${(forecastPrices[i-1].price - item.price).toLocaleString()}`
                  : `▲ LKR ${(item.price - forecastPrices[i-1].price).toLocaleString()}`}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={combined} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>

          <CartesianGrid strokeDasharray="3 3" stroke="#f1f8e9" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: "#888" }}
            angle={-30} textAnchor="end" height={50}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "#888" }}
            tickFormatter={(v) => `${(v/1000).toFixed(0)}k`}
            label={{
              value: "LKR per 1,000 nuts", angle: -90,
              position: "insideLeft", offset: 15,
              style: { fontSize: 11, fill: "#aaa" }
            }}
            domain={["auto", "auto"]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            formatter={(value) => <span style={{ color: "#444" }}>{value}</span>}
          />
          <ReferenceLine
            x={connectPoint.label}
            stroke="#bdbdbd" strokeDasharray="4 4"
            label={{ value: "→ Forecast", fill: "#999", fontSize: 10, position: "insideTopRight" }}
          />
          <Line
            type="monotone" dataKey="actual" name="Known prices"
            stroke="#1565c0" strokeWidth={2.5}
            dot={{ r: 4, fill: "#1565c0", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 6 }} connectNulls={false}
          />
          <Line
            type="monotone" dataKey="forecast" name="GRU forecast"
            stroke="#2e7d32" strokeWidth={2.5} strokeDasharray="7 4"
            dot={{ r: 6, fill: "#2e7d32", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 7 }} connectNulls={false}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Footer note */}
      <div style={{
        marginTop: "16px", padding: "10px 16px",
        background: "#f9fbe7", borderRadius: "8px",
        border: "1px solid #dcedc8",
        fontSize: "11px", color: "#558b2f",
        display: "flex", alignItems: "center", gap: "8px",
      }}>
        <span>ℹ️</span>
        <span>
          Predictions generated by GRU model trained on Method 2 cleaned dataset (CDA data up to 23 April 2026).
          Forecast values: {forecastPrices.map(f => `LKR ${f.price.toLocaleString()}`).join(" → ")}.
        </span>
      </div>

    </div>
  );
}

export default ForecastChart;