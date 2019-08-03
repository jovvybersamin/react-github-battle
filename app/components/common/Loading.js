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

export default class Loading extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    speed: PropTypes.num
  };

  static defaultProps = {
    content: "Loading",
    speed: 300
  };

  state = {
    content: this.props.content
  };

  intervalRef = React.createRef(null);

  componentDidMount() {
    const { content, speed } = this.props;
    this.intervalRef.current = window.setInterval(() => {
      this.state.content === content + "..."
        ? this.setState({ content })
        : this.setState(({ content }) => ({
            content: content + "."
          }));
    }, speed);
  }

  componentWillUnmount() {
    clearInterval(this.intervalRef.current);
  }

  render() {
    return <p style={styles.content}>{this.state.content}</p>;
  }
}
