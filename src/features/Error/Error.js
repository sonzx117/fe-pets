import { Link } from "@material-ui/core";
import React from "react";

export default function Error() {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          loading="lazy"
          src="https://t3.ftcdn.net/jpg/03/56/19/18/360_F_356191845_Uf1HSScTIHcxXeK1UXuEn0rdAzMvTfxo.jpg"
          width={"100%"}
          alt=""
        />

        <Link
          href="/"
          style={{
            position: "absolute",
            cursor: "pointer",
            bottom: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "blue",
            color: "white",
            width: "30%",
            padding: "1rem",
            borderRadius: "10px",
            fontSize: "1.2rem",
            fontWeight: "500",
          }}
        >
          {" "}
          Back Home
        </Link>
      </div>
    </div>
  );
}
