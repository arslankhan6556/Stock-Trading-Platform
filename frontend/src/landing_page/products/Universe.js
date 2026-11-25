import React from "react";
import { useNavigate } from "react-router-dom";

function Universe() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1>The Zerodha Universe</h1>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>

        <div className="col-4 p-5">
          <img
            src="media/images/smallcaseLogo.png"
            alt="smallcase"
            style={{ height: "40px", objectFit: "contain" }}
          />
          <p className="text-small text-muted">Thematic investing platform</p>
        </div>
        <div className="col-4 p-5">
          <img
            src="media/images/streakLogo.png"
            alt="Streak"
            style={{ height: "40px", objectFit: "contain" }}
          />
          <p className="text-small text-muted">Thematic investing platform</p>
        </div>
        <div className="col-4 p-5">
          <img
            src="media/images/sensibullLogo.svg"
            alt="Sensibull"
            style={{ height: "40px", objectFit: "contain" }}
          />
          <p className="text-small text-muted">Thematic investing platform</p>
        </div>
        <div className="col-4 p-5">
          <img
            src="media/images/zerodhaFundhouse.png"
            alt="Zerodha Fund House"
            style={{ height: "40px", objectFit: "contain" }}
          />
          <p className="text-small text-muted">Thematic investing platform</p>
        </div>
        <div className="col-4 p-5">
          <img
            src="media/images/goldenpiLogo.png"
            alt="GoldenPi"
            style={{ height: "40px", objectFit: "contain" }}
          />
          <p className="text-small text-muted">Thematic investing platform</p>
        </div>
        <div className="col-4 p-5">
          <img
            src="media/images/dittoLogo.png"
            alt="Ditto"
            style={{ height: "40px", objectFit: "contain" }}
          />
          <p className="text-small text-muted">Thematic investing platform</p>
        </div>
        <button
          type="button"
          onClick={() => {
            navigate("/signup");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="btn btn-primary p-2 fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
        >
          Signup Now
        </button>
      </div>
    </div>
  );
}

export default Universe;
