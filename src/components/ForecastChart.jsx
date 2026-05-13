import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from "recharts";
import { recentPrices, forecastPrices } from "../data/priceData";

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

  const recentData = recentPrices.map((d) => ({
    date: d.date, actual: d.price, forecast: null,
  }));

  const forecastData = forecastPrices.map((d) => ({
    date: d.date, actual: null, forecast: d.price,
  }));

  
  const connectPoint = {
    date: recentPrices[recentPrices.length - 1].date,
    actual: recentPrices[recentPrices.length - 1].price,
    forecast: recentPrices[recentPrices.length - 1].price,
  };

  const combined = [...recentData.slice(0, -1), connectPoint, ...forecastData];

  // trend direction
  const first = forecastPrices[0].price;
  const last = forecastPrices[forecastPrices.length - 1].price;
  const trend = last > first ? "up" : "down";
  const trendPct = Math.abs(((last - first) / first) * 100).toFixed(1);

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
              5-Week Future Price Forecast
            </h2>
          </div>
          <p style={{ fontSize: "12px", color: "#888", margin: "0 0 0 46px" }}>
            GRU model (Method 2 — cleaned data) &nbsp;·&nbsp; MAPE ≈ 3.7% &nbsp;·&nbsp; look_back = 15
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

      {/* Trend banner */}
      <div style={{
        background: trend === "down"
          ? "linear-gradient(135deg, #e8f5e9, #f1f8e9)"
          : "linear-gradient(135deg, #fff3e0, #fffde7)",
        border: `1px solid ${trend === "down" ? "#a5d6a7" : "#ffe082"}`,
        borderRadius: "12px", padding: "12px 20px", marginBottom: "20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "22px" }}>{trend === "down" ? "📉" : "📈"}</span>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "700", color: trend === "down" ? "#1b5e20" : "#e65100" }}>
              Prices forecast to {trend === "down" ? "decrease" : "increase"} over next 5 weeks
            </div>
            <div style={{ fontSize: "11px", color: "#666", marginTop: "2px" }}>
              {trend === "down" ? "▼" : "▲"} {trendPct}% change from Week 1 to Week 5
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "11px", color: "#888" }}>Model Accuracy</div>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#2e7d32" }}>MAPE ≈ 3.7%</div>
        </div>
      </div>

      {/* Forecast week cards */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(5,1fr)",
        gap: "10px", marginBottom: "24px",
      }}>
        {forecastPrices.map((item, i) => (
          <div key={i} style={{
            background: "linear-gradient(135deg, #e8f5e9, #f9fbe7)",
            border: "1px solid #a5d6a7", borderRadius: "12px",
            padding: "14px 10px", textAlign: "center",
            boxShadow: "0 2px 8px rgba(46,125,50,0.08)",
            transition: "transform 0.2s",
          }}>
            <div style={{ fontSize: "10px", color: "#888", marginBottom: "6px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {item.date}
            </div>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#1b5e20" }}>
              LKR {item.price.toLocaleString()}
            </div>
            <div style={{ fontSize: "10px", color: "#66bb6a", marginTop: "4px" }}>
              {i === 0 ? "↔ Baseline" : item.price < forecastPrices[i-1].price ? "▼ Lower" : "▲ Higher"}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={combined} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
          <defs>
            <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2e7d32" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#2e7d32" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f8e9" />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#888" }} angle={-30} textAnchor="end" height={50} />
          <YAxis
            tick={{ fontSize: 10, fill: "#888" }}
            tickFormatter={(v) => `${(v/1000).toFixed(0)}k`}
            label={{ value: "LKR per 1,000 nuts", angle: -90, position: "insideLeft", offset: 15, style: { fontSize: 11, fill: "#aaa" } }}
            domain={["auto", "auto"]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            formatter={(value) => <span style={{ color: "#444" }}>{value}</span>}
          />
          <ReferenceLine x={connectPoint.date} stroke="#bdbdbd" strokeDasharray="4 4"
            label={{ value: "→ Forecast", fill: "#999", fontSize: 10, position: "insideTopRight" }}
          />
          <Line type="monotone" dataKey="actual" name="Known prices"
            stroke="#1565c0" strokeWidth={2.5}
            dot={{ r: 4, fill: "#1565c0", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 6 }} connectNulls={false}
          />
          <Line type="monotone" dataKey="forecast" name="GRU forecast"
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
        border: "1px solid #dcedc8", fontSize: "11px", color: "#558b2f",
        display: "flex", alignItems: "center", gap: "8px",
      }}>
        <span>ℹ️</span>
        <span>
          Predictions generated by GRU model trained on Method 2 (interpolation-corrected) dataset.
          Forecast values: LKR {forecastPrices.map(f => f.price.toLocaleString()).join(" → ")}.
        </span>
      </div>
    </div>
  );
}

export default ForecastChart;