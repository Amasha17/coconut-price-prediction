function Navbar() {
  return (
    <nav style={{
      background: "#ffffff",
      borderBottom: "1px solid #e8f5e9",
      padding: "0 40px",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 2px 12px rgba(34,139,34,0.07)",
    }}>
      {/* Brand only */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: "40px", height: "40px", borderRadius: "10px",
          background: "linear-gradient(135deg, #2e7d32, #66bb6a)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "20px", boxShadow: "0 2px 8px rgba(46,125,50,0.3)",
        }}>🥥</div>
        <div>
          <div style={{ fontSize: "15px", fontWeight: "700", color: "#1b5e20", lineHeight: 1.2 }}>
            CoconutForecast.lk
          </div>
          <div style={{ fontSize: "10px", color: "#66bb6a", letterSpacing: "0.5px" }}>
            Wholesale Price Prediction · Sri Lanka
          </div>
        </div>
      </div>

      {/* Right side — just a simple label */}
      <div style={{
        fontSize: "12px", color: "#888",
        display: "flex", alignItems: "center", gap: "6px",
      }}>
        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4caf50", display: "inline-block" }}/>
        Data: Coconut Development Authority (CDA), Sri Lanka
      </div>
    </nav>
  );
}

export default Navbar;