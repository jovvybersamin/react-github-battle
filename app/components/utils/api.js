const CLIENT_ID = "9d01d171533c96b5ded1";
const CLIENT_SECRET = "53619ed958043c02592be0db5344d57b7d4f13a6";
const PARAMS = `?${CLIENT_ID}&{CLIENT_SECRET}`;

function getErrorMsg(message, username) {
  if (message === "Not Found") {
    return `${username} doesn't exist!`;
  }

  return message;
}

function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}${PARAMS}`)
    .then(res => res.json())
    .then(profile => {
      if (profile.message) {
        throw new Error(getErrorMsg(profile.message, username));
      }
      return profile;
    });
}

function getRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos${PARAMS}&per_page=100`
  )
    .then(res => res.json())
    .then(repos => {
      if (repos.message) {
        throw new Error(getErrorMsg(repos.message, username));
      }
      return repos;
    });
}

function getStarCount(repos) {
  return repos.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

function getUserData(player) {
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile.followers, repos)
    })
  );
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

export function battle(players) {
  return Promise.all([getUserData(players[0]), getUserData(players[1])]).then(
    results => sortPlayers(results)
  );
}

export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return fetch(endpoint)
    .then(result => {
      return result.json();
    })
    .then(data => {
      console.log(data);
      if (!data.items) {
        throw new Error(data.message);
      }
      return data.items;
    });
}
