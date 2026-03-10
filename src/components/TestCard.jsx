function TestCard({ title, price, time }) {
    return (
      <div className="test-card">
  
        <h3>{title}</h3>
  
        <p>From {price}</p>
  
        <p>{time}</p>
  
        <button className="book-btn">
          Book Now
        </button>
  
      </div>
    );
  }
  
  export default TestCard;