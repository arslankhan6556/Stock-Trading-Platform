import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3002/allOrders");
        setOrders(res.data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders" style={{ padding: "24px" }}>
        <p>Loading orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders" style={{ padding: "24px" }}>
      <h3 className="title">Orders ({orders.length})</h3>
      <div
        className="order-table"
        style={{ overflowX: "auto", marginTop: "16px" }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #e0e0e0" }}>
              <th style={{ padding: "10px" }}>Instrument</th>
              <th style={{ padding: "10px" }}>Qty.</th>
              <th style={{ padding: "10px" }}>Price</th>
              <th style={{ padding: "10px" }}>Mode</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={{ borderBottom: "1px solid #f0f0f0" }}>
                <td style={{ padding: "10px" }}>{order.name}</td>
                <td style={{ padding: "10px" }}>{order.qty}</td>
                <td style={{ padding: "10px" }}>
                  {Number(order.price).toFixed(2)}
                </td>
                <td
                  style={{
                    padding: "10px",
                    fontWeight: 600,
                    color: order.mode === "BUY" ? "#2e7d32" : "#c62828",
                  }}
                >
                  {order.mode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
