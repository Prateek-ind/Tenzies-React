import React from "react";

const Die = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59e391" : "white",
  };

  return (
    <button
      onClick={() => props.hold(props.id)}
      style={styles}
      className="die"
      aria-label={`Die with value ${props.value},
      ${props.isHeld ? "held" : "not Held"}`}
    >
      {props.value}
    </button>
  );
};

export default Die;
