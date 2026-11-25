import React, { useState } from "react";

const Funds = () => {
  const [availableMargin, setAvailableMargin] = useState(3740);
  const [amount, setAmount] = useState("");
  const [actionType, setActionType] = useState(null); // "ADD" | "WITHDRAW" | null
  const [message, setMessage] = useState("");

  const handleConfirm = (e) => {
    e.preventDefault();
    const num = Number(amount);

    if (!num || num <= 0) {
      setMessage("Please enter a valid positive amount.");
      return;
    }

    if (actionType === "ADD") {
      setAvailableMargin((prev) => prev + num);
      setMessage(`₹${num} added to available margin.`);
    } else if (actionType === "WITHDRAW") {
      if (num > availableMargin) {
        setMessage("Insufficient available margin to withdraw.");
        return;
      }
      setAvailableMargin((prev) => prev - num);
      setMessage(`₹${num} withdrawn from available margin.`);
    }

    setAmount("");
    setActionType(null);
  };

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        <span style={{ color: "#666", fontSize: "14px" }}>
          Instant, zero-cost fund transfers with UPI
        </span>

        <button
          type="button"
          onClick={() => {
            setActionType("ADD");
            setMessage("");
          }}
          style={{
            background: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Add funds
        </button>

        <button
          type="button"
          onClick={() => {
            setActionType("WITHDRAW");
            setMessage("");
          }}
          style={{
            background: "#387ed1",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Withdraw
        </button>
      </div>

      {actionType && (
        <form
          onSubmit={handleConfirm}
          style={{
            maxWidth: "360px",
            marginLeft: "auto",
            marginBottom: "20px",
            padding: "16px",
            border: "1px solid #e0e0e0",
            borderRadius: "6px",
            background: "#fafafa",
          }}
        >
          <h4 style={{ marginTop: 0, marginBottom: "10px" }}>
            {actionType === "ADD" ? "Add Funds" : "Withdraw Funds"}
          </h4>
          <input
            type="number"
            placeholder="Enter amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              boxSizing: "border-box",
            }}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="submit"
              style={{
                background: actionType === "ADD" ? "#4caf50" : "#387ed1",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "6px 14px",
                cursor: "pointer",
              }}
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setActionType(null)}
              style={{
                background: "#eee",
                color: "#333",
                border: "none",
                borderRadius: "4px",
                padding: "6px 14px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {message && (
        <p style={{ color: "#1b5e20", fontWeight: 500 }}>{message}</p>
      )}

      <div
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: "6px",
          padding: "20px",
          maxWidth: "420px",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Available Margin</h3>
        <p style={{ fontSize: "24px", fontWeight: 600, margin: 0 }}>
          ₹{availableMargin.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default Funds;
