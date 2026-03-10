import React from "react";

function ServiceCard({ title, description }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
      <a href="#">Learn More →</a>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    width: "250px",
    textAlign: "center"
  }
};

export default ServiceCard;