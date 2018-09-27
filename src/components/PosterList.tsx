import * as React from "react";
import { Poster } from "src/App";
import SearchField from "./SearchField";
import { Link } from "react-router-dom";
import "./PosterList.css";
import * as queryString from "query-string";
import Footer from "./Footer";

interface Props {
  location: { search: string };
}

interface State {
  posters: Poster[];
  query: string;
  pageNum: number;
}

export const BASE_PATH = "/events_manager/v3/posters/search";
const LIMIT = 2;

export default class PosterList extends React.PureComponent<Props, State> {
  state = {
    posters: [],
    query: "",
    pageNum: 0
  };

  search = () => {
    if (this.state.query !== "") {
      fetch(
        `${BASE_PATH}?query=${this.state.query}&limit=${LIMIT}&offset=${this
          .state.pageNum * LIMIT}`
      )
        .then(res => res.json())
        .then(json => this.setState({ posters: json.posters }))
        .catch(console.log);
    }
  };

  prevClicked = (e: any) => {
    e.preventDefault();
    this.setState(function(prevState: State) {
      return { pageNum: Math.max(0, prevState.pageNum - 1) };
    });
  };

  nextClicked = (e: any) => {
    e.preventDefault();
    this.setState(function(prevState: State) {
      return { pageNum: prevState.pageNum + 1 };
    });
  };

  onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  componentDidMount() {
    if (this.props.location.search !== "") {
      const q = queryString.parse(this.props.location.search);
      this.setState({ query: q.query }, this.search);
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.location.search !== this.props.location.search) {
      if (this.props.location.search !== "") {
        this.search();
      } else {
        this.setState({ query: "", posters: [] });
      }
    }
    if (prevState.pageNum !== this.state.pageNum) this.search();
  }

  render() {
    return (
      <>
        <SearchField
          query={this.state.query}
          onInputChange={this.onInputChange}
        />
        <ul className="poster-list">{this.state.posters.map(renderItem)}</ul>
        {this.state.posters.length != 0 && (
          <Footer
            pageNum={this.state.pageNum}
            prevClicked={this.prevClicked}
            nextClicked={this.nextClicked}
          />
        )}
      </>
    );
  }
}

function renderItem(poster: Poster) {
  return (
    <>
      <li key={poster.id} className="poster-list__item poster">
        {poster.thumb_url && (
          <img
            className="poster__img"
            src={poster.thumb_url}
            alt={`${poster.title} image`}
          />
        )}
        <Link to={`/posters/${poster.id}`}>
          <p className="poster__title">{poster.title}</p>
        </Link>
        <ul className="poster__author">
          {!!poster.author_names &&
            poster.author_names.constructor === Array &&
            poster.author_names.map((author, idx) => (
              <li key={idx} className="poster__author--list">
                authors: {author}
              </li>
            ))}
        </ul>
        <p className="poster__event">event: {poster.event}</p>
        <ul className="poster__keywords">
          keywords:
          {!!poster.keywords &&
            poster.keywords.constructor === Array &&
            poster.keywords.map((keyword, idx) => (
              <li key={idx} className="poster__keyword--list">
                {keyword}
              </li>
            ))}
        </ul>
      </li>
    </>
  );
}
