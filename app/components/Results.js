import React from "react";
import { battle } from "./utils/api";
import {
  FaCompass,
  FaBriefcase,
  FaUsers,
  FaUserFriends,
  FaCode,
  FaUser
} from "react-icons/fa";
import Card from "./Card";
import Loading from "./common/Loading";
import Tooltip from "./common/Tooltip";
import queryString from "query-string";
import { Link } from "react-router-dom";

function resultReducer(state, action) {
  if (action.type === "WINNER") {
    return {
      winner: action.winner,
      loser: action.loser,
      error: null,
      loading: false
    };
  } else if (action.type === "ERROR") {
    return {
      winner: null,
      loser: null,
      error: action.error,
      loading: false
    };
  } else {
    throw new Error(`Action Type: ${action.type} is not supported`);
  }
}

export default function Results({ location }) {
  const [{ winner, loser, error, loading }, dispatch] = React.useReducer(
    resultReducer,
    {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  );

  React.useEffect(() => {
    const { playerOne, playerTwo } = queryString.parse(location.search);
    battle([playerOne, playerTwo])
      .then(players => {
        dispatch({ type: "WINNER", winner: players[0], loser: players[1] });
      })
      .catch(({ message }) => {
        dispatch({ type: "ERROR", error: message });
      });
  }, []);

  if (loading === true) {
    return <Loading content="Battling" speed={300} />;
  }

  if (error) {
    return <p className="center-text error">{error}</p>;
  }

  return (
    <React.Fragment>
      <div className="grid space-around container-sm">
        <Card
          header={winner.score === loser.score ? "Tie" : "Winner"}
          subHeader={`Score: ${winner.score.toLocaleString()}`}
          avatar={winner.profile.avatar_url}
          href={winner.profile.html_url}
          name={winner.profile.login}
        >
          <ProfileList profile={winner.profile} />
        </Card>

        <Card
          header={loser.score === winner.score ? "Tie" : "Loser"}
          subHeader={`Score: ${loser.score.toLocaleString()}`}
          avatar={loser.profile.avatar_url}
          href={loser.profile.html_url}
          name={loser.profile.login}
        >
          <ProfileList profile={loser.profile} />
        </Card>
      </div>
      <Link to="/battle" className="btn btn-dark btn-space">
        Reset
      </Link>
    </React.Fragment>
  );
}

function ProfileList({ profile }) {
  return (
    <ul className="card-list">
      <li>
        <FaUser color="rgb(239, 115, 115)" size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's Location">
            <FaCompass color="rgb(144, 115, 255)" size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's Company">
            <FaBriefcase color="#795548" size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color="rgb(129, 195, 245)" size={22} />
        {profile.followers.toLocaleString()} followers
      </li>
      <li>
        <FaUserFriends color="rgb(64, 183, 95)" size={22} />
        {profile.following.toLocaleString()} following
      </li>
    </ul>
  );
}
