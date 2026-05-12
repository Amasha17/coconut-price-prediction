function Navbar() {
  return (
    <nav style={{
      background: "#1a3a6b",
      padding: "14px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "22px" }}>🥥</span>
        <span style={{ color: "#fff", fontSize: "17px", fontWeight: "600", letterSpacing: "0.3px" }}>
          CoconutForecast.lk
        </span>
      </div>
      <div style={{ color: "#90b8e8", fontSize: "13px" }}>
        Wholesale Price Prediction &nbsp;·&nbsp; Data: CDA Sri Lanka &nbsp;·&nbsp; GRU Model
      </div>
    </nav>
  );
}

export default Navbar;