import * as React from "react";
import { match } from "react-router-dom";
import "./PosterDetails.css";

interface Props {
  match: match<{ id: string }>;
}

interface State {
  posterDetails: {
    paper_abstract: string;
    thumb_url_medium: string;
    title: string;
  };
}

const BASE_PATH = "/events_manager/v2/posters";

export default class PosterDetails extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getPosterDetails();
  }

  state = {
    posterDetails: {
      paper_abstract: "",
      thumb_url_medium: "",
      title: ""
    }
  };

  getPosterDetails = (): void => {
    fetch(`${BASE_PATH}\\${this.props.match.params.id}`)
      .then(res => res.json())
      .then(json => this.setState({ posterDetails: json.poster }));
  };

  render() {
    const poster = this.state.posterDetails;
    return (
      <div className="details">
        <img
          className="details__img"
          src={poster.thumb_url_medium}
          alt={`${poster.title} image`}
        />
        <h5 className="details__header">paper abstract</h5>
        <p className="details__paperAbstract">{poster.paper_abstract}</p>
      </div>
    );
  }
}
