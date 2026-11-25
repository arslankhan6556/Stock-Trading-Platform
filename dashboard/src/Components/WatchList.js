import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Tooltip, Grow } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import GeneralContext from "./GeneralContext";
import { watchlist } from "../data/data";

const Watchlist = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWatchlist = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="counts"> {filteredWatchlist.length} / 50</span>
      </div>

      <ul className="list">
        {filteredWatchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={`${stock.name}-${index}`} />;
        })}
      </ul>
    </div>
  );
};

export default Watchlist;

const WatchListItem = ({ stock }) => {
  const [showWatchlistAction, setShowWatchlistAction] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowWatchlistAction(true)}
      onMouseLeave={() => setShowWatchlistAction(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="item-info">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDownIcon className="down" />
          ) : (
            <KeyboardArrowUpIcon className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>

      {showWatchlistAction && (
        <WatchlistAction
          uid={stock.name}
          onToggleAnalytics={() => {
            setShowAnalytics((prev) => !prev);
            setShowMoreMenu(false);
          }}
          onToggleMore={() => {
            setShowMoreMenu((prev) => !prev);
            setShowAnalytics(false);
          }}
        />
      )}

      {showAnalytics && (
        <div
          style={{
            padding: "8px 14px",
            fontSize: "12px",
            background: "#f8f9fa",
            borderTop: "1px solid #eceff1",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            <strong>{stock.name}</strong> • LTP: ₹{stock.price} ({stock.percent}
            )
          </span>
          <button
            type="button"
            onClick={() => setShowAnalytics(false)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "12px",
              color: "#666",
            }}
          >
            Hide
          </button>
        </div>
      )}

      {showMoreMenu && (
        <div
          style={{
            padding: "8px 14px",
            fontSize: "12px",
            background: "#ffffff",
            borderTop: "1px solid #eceff1",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", gap: "14px" }}>
            <Link
              to="/orders"
              onClick={() => setShowMoreMenu(false)}
              style={{
                textDecoration: "none",
                color: "#387ed1",
                fontWeight: 500,
              }}
            >
              View Orders
            </Link>
            <Link
              to="/holdings"
              onClick={() => setShowMoreMenu(false)}
              style={{
                textDecoration: "none",
                color: "#387ed1",
                fontWeight: 500,
              }}
            >
              View Holdings
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setShowMoreMenu(false)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "12px",
              color: "#666",
            }}
          >
            Close
          </button>
        </div>
      )}
    </li>
  );
};

const WatchlistAction = ({ uid, onToggleAnalytics, onToggleMore }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  const handleSellClick = () => {
    generalContext.openSellWindow(uid);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" placement="top" TransitionComponent={Grow}>
          <button type="button" className="buy" onClick={handleBuyClick}>
            Buy
          </button>
        </Tooltip>

        <Tooltip title="Sell (S)" placement="top" TransitionComponent={Grow}>
          <button type="button" className="sell" onClick={handleSellClick}>
            Sell
          </button>
        </Tooltip>

        <Tooltip
          title="Analytics (A)"
          placement="top"
          TransitionComponent={Grow}
        >
          <button type="button" className="action" onClick={onToggleAnalytics}>
            <BarChartOutlinedIcon className="icon" />
          </button>
        </Tooltip>

        <Tooltip title="More" placement="top" TransitionComponent={Grow}>
          <button type="button" className="action" onClick={onToggleMore}>
            <MoreHorizIcon className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
