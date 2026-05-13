import Navbar from "./components/Navbar";
import HistoricalChart from "./components/HistoricalChart";
import ForecastChart from "./components/ForecastChart";

function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f9fdf9", fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <Navbar />

      {/* Hero banner */}
      <div style={{
        background: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%)",
        padding: "44px 40px 52px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{
          position: "absolute", top: "-50px", right: "-50px",
          width: "220px", height: "220px", borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
        }}/>
        <div style={{
          position: "absolute", bottom: "-70px", right: "220px",
          width: "180px", height: "180px", borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
        }}/>
        <div style={{
          position: "absolute", top: "20px", right: "300px",
          width: "100px", height: "100px", borderRadius: "50%",
          background: "rgba(255,255,255,0.03)",
        }}/>

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Title */}
          <h1 style={{
            fontSize: "30px", fontWeight: "800", color: "#fff",
            margin: "0 0 10px", lineHeight: 1.3,
          }}>
            🥥 Coconut Price Prediction in Sri Lanka
          </h1>
          <p style={{
            fontSize: "14px", color: "#c8e6c9",
            margin: "0 0 28px", maxWidth: "560px", lineHeight: 1.7,
          }}>
            Using machine learning models to forecast weekly wholesale coconut prices.
            Historical price data sourced from the Coconut Development Authority (CDA) of Sri Lanka.
          </p>

          {/* Quick stat pills */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { label: "Best Model", value: "GRU", icon: "🤖" },
              { label: "Accuracy", value: "MAPE ≈ 3.7%", icon: "🎯" },
              { label: "Data Period", value: "2021 – 2026", icon: "📅" },
              { label: "Weekly Records", value: "236", icon: "📊" },
              { label: "Forecast Horizon", value: "5 Weeks", icon: "🔮" },
            ].map((item, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.13)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "12px", padding: "10px 18px",
                display: "flex", alignItems: "center", gap: "10px",
              }}>
                <span style={{ fontSize: "18px" }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#fff" }}>{item.value}</div>
                  <div style={{ fontSize: "10px", color: "#a5d6a7" }}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "32px 24px" }}>

        {/* Section label 1 */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <div style={{ width: "4px", height: "24px", background: "linear-gradient(180deg,#2e7d32,#66bb6a)", borderRadius: "4px" }}/>
          <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#1b5e20", margin: 0 }}>
            Historical Price Analysis
          </h2>
          <div style={{ flex: 1, height: "1px", background: "#e8f5e9" }}/>
        </div>
        <HistoricalChart />

        {/* Section label 2 */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <div style={{ width: "4px", height: "24px", background: "linear-gradient(180deg,#1b5e20,#2e7d32)", borderRadius: "4px" }}/>
          <h2 style={{ fontSize: "16px", fontWeight: "700", color: "#1b5e20", margin: 0 }}>
            Future Price Forecast
          </h2>
          <div style={{ flex: 1, height: "1px", background: "#e8f5e9" }}/>
        </div>

        <ForecastChart />

        {/* Simple bottom note */}
        <div style={{
          marginTop: "32px", textAlign: "center",
          fontSize: "12px", color: "#aaa", paddingBottom: "24px",
        }}>
          Data source: Coconut Development Authority (CDA), Sri Lanka &nbsp;·&nbsp;
          PUSL3190 Computing Project &nbsp;·&nbsp; BSc (Hons) Data Science
        </div>

      </div>
    </div>
  );
}

export default App;