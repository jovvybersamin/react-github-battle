import React from "react";
import PropTypes from "prop-types";

const styles = {
  content: {
    fontSize: "35px",
    position: "absolute",
    left: "0",
    right: "0",
    marginTop: "20px",
    textAlign: "center"
  }
};

export default function Loading({ content, speed }) {
  console.log(content);
  const [text, setText] = React.useState(content);
  const intervalId = React.useRef(null);
  React.useEffect(() => {
    intervalId.current = setInterval(() => {
      setText(text => (text === `${content}...` ? content : text + "."));
    }, speed);

    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  return <p style={styles.content}>{text}</p>;
}

Loading.defaultProps = {
  content: "Loading",
  speed: 300
};

Loading.propTypes = {
  content: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
};
