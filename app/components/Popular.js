import React from "react";
import { stringify } from "querystring";
import { fetchPopularRepos } from "./utils/api";
import NavPopular from "./common/NavPopular";
import ReposGrid from "./common/ReposGrid";
import Loading from "./common/Loading";

export default class Popular extends React.Component {
  state = {
    selectedLanguage: "All",
    error: null,
    repos: {}
  };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = selectedLanguage => {
    this.setState({
      selectedLanguage,
      error: null
    });

    if (!this.state.repos[selectedLanguage]) {
      this.setState({
        repos: {
          [selectedLanguage]: null
        }
      });

      const repos = { ...this.state.repos };
      fetchPopularRepos(selectedLanguage)
        .then(data => {
          console.log(data);
          this.setState({
            repos: {
              ...repos,
              [selectedLanguage]: data
            }
          });
        })
        .catch(() => {
          console.warn("Error fetch repos: ", error);

          this.setState({
            error: "Error: There was an error fetching the repositories"
          });
        });
    }
  };

  isLoading = () => {
    const { repos, selectedLanguage, error } = this.state;
    return repos[selectedLanguage] === null && error === null;
  };

  render() {
    const { selectedLanguage, error, repos } = this.state;

    return (
      <React.Fragment>
        <NavPopular
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <Loading content="Fetching repos" />}
        {error && <p className="center-text error">{error}</p>}
        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </React.Fragment>
    );
  }
}
