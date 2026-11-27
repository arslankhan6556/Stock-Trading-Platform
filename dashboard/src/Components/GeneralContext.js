import React, { useState, createContext } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

const GeneralContext = createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid) => {},
  closeSellWindow: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [orderMode, setOrderMode] = useState("BUY");

  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(100);

  const handleOpenBuyWindow = (uid) => {
    setOrderMode("BUY");
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleOpenSellWindow = (uid) => {
    setOrderMode("SELL");
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const handlePlaceOrder = async () => {
    try {
      await axios.post(`${API_URL}/newOrder`, {
        name: selectedStockUID,
        qty: Number(qty),
        price: Number(price),
        mode: orderMode,
      });
      handleCloseBuyWindow();
      alert(`${orderMode} order placed for ${selectedStockUID}!`);
    } catch (err) {
      console.error("Order error:", err);
      alert(
        "Order place karne mein error aaya. Backend /newOrder route check karo.",
      );
    }
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseBuyWindow,
      }}
    >
      {props.children}

      {isBuyWindowOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            zIndex: 9999,
            width: "280px",
          }}
        >
          <h4 style={{ marginTop: 0, marginBottom: "12px" }}>
            {orderMode} — {selectedStockUID}
          </h4>

          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", fontSize: "12px" }}>Qty</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              style={{ width: "100%", padding: "6px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "12px" }}>Price</label>
            <input
              type="number"
              min="1"
              step="0.05"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ width: "100%", padding: "6px", boxSizing: "border-box" }}
            />
          </div>

          <div
            style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}
          >
            <button
              type="button"
              onClick={handleCloseBuyWindow}
              style={{ padding: "6px 12px", cursor: "pointer" }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePlaceOrder}
              style={{
                padding: "6px 12px",
                cursor: "pointer",
                background: orderMode === "BUY" ? "#4184f3" : "#df514c",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
              }}
            >
              {orderMode === "BUY" ? "Buy" : "Sell"}
            </button>
          </div>
        </div>
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
