import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>This is Home page</h1>

      {/* Sign In Button */}
      <Link to="/signin">
        <button style={{
          padding: "10px 20px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "20px"
        }}>
          Sign In
        </button>
      </Link>
    </div>
  )
}

export default Home
