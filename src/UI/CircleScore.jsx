import styled from "styled-components";

// Styles for IMDb logo circle and score
const ScoreCircle = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 10rem;
  margin-bottom: 5rem;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(-90deg);
  }

  .imdb-logo {
    position: absolute;
    width: 4rem;
    height: 2rem;
    background-color: #f5c518;
    color: black;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-size: 1rem;
    z-index: 1;
  }

  .score {
    position: absolute;
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--color-text);
    z-index: 2;
    bottom: -3rem;
  }
`;

// Circle component
const CircularProgress = ({ score, link }) => {
  // Score is out of 10, so we'll convert it to a percentage out of 100
  const normalizedScore = Math.min(Math.max(score, 0), 10); // Ensure it's between 0 and 10
  const percentage = (normalizedScore / 10) * 100;
  const strokeDasharray = `${percentage} 100`;

  // Dynamic color based on score
  const getColor = (score) => {
    if (score >= 8) return "#4ea351"; // Green for high scores
    if (score >= 5) return "#bea14a"; // Yellow for medium scores
    return "#ae4840"; // Red for low scores
  };

  return (
    <ScoreCircle>
      {/* SVG for progress circle */}
      <svg width="100" height="100" viewBox="0 0 36 36">
        {/* Background Circle */}
        <path
          stroke="rgba(128, 128, 128, 0.3)" // Light transparent gray
          strokeWidth="3.8"
          fill="none"
          d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        {/* Colored Circle */}
        <path
          stroke={getColor(normalizedScore)}
          strokeDasharray={strokeDasharray}
          strokeWidth="3.8"
          strokeLinecap="round" // Rounded corners for the stroke
          fill="none"
          d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>

      {/* IMDb logo in center */}
      <a className="imdb-logo" href={link}>
        IMDb
      </a>

      {/* Display the score below the logo */}
      <div className="score">{score}/10</div>
    </ScoreCircle>
  );
};

export default CircularProgress;
