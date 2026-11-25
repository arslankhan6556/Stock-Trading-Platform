import React from "react";

const partnerApps = [
  {
    name: "Smallcase",
    code: "SC",
    tag: "Thematic Investing",
    img: "/media/images/smallcaseLogo.png",
    desc: "Invest in curated baskets of stocks backed by research and market themes.",
  },
  {
    name: "Streak",
    code: "ST",
    tag: "Algo & Strategy",
    img: "/media/images/streakLogo.png",
    desc: "Create, backtest, and deploy trading strategies without coding.",
  },
  {
    name: "Sensibull",
    code: "SB",
    tag: "Options Trading",
    img: "/media/images/sensibullLogo.svg",
    desc: "Options trading platform with strategy builder, payoff graphs, and analytics.",
  },
  {
    name: "Zerodha Fund House",
    code: "ZF",
    tag: "Mutual Funds",
    img: "/media/images/zerodhaFundhouse.png",
    desc: "Simple, low-cost index funds and passive investment options.",
  },
  {
    name: "GoldenPi",
    code: "GP",
    tag: "Bonds & Fixed Income",
    img: "/media/images/goldenpiLogo.png",
    desc: "Discover and invest in corporate bonds, NCDs, and debentures.",
  },
  {
    name: "Ditto",
    code: "DT",
    tag: "Insurance Advisory",
    img: "/media/images/dittoLogo.png",
    desc: "Unbiased guidance to understand and choose term and health insurance.",
  },
];

const Apps = () => {
  return (
    <div style={{ padding: "24px", paddingTop: "32px" }}>
      <h2 style={{ marginTop: 0, marginBottom: "6px" }}>Apps</h2>
      <p style={{ color: "#666", marginTop: 0, marginBottom: "20px" }}>
        Explore partner platforms and investment tools
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "18px",
        }}
      >
        {partnerApps.map((app) => (
          <div
            key={app.name}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "18px",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div>
              <div
                style={{
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <img
                  src={app.img}
                  alt={app.name}
                  style={{
                    maxHeight: "36px",
                    maxWidth: "150px",
                    objectFit: "contain",
                  }}
                  onError={(e) => {
                    const parent = e.currentTarget.parentElement;
                    e.currentTarget.style.display = "none";
                    if (parent && !parent.querySelector(".fallback-badge")) {
                      const badge = document.createElement("div");
                      badge.className = "fallback-badge";
                      badge.textContent = app.code;
                      badge.style.cssText =
                        "width:38px;height:38px;border-radius:8px;background:#387ed1;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;";
                      parent.appendChild(badge);
                    }
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <h4 style={{ margin: 0 }}>{app.name}</h4>
                <span
                  style={{
                    fontSize: "12px",
                    background: "#eef4fc",
                    color: "#387ed1",
                    padding: "3px 8px",
                    borderRadius: "12px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {app.tag}
                </span>
              </div>

              <p style={{ color: "#555", fontSize: "14px", margin: 0 }}>
                {app.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
