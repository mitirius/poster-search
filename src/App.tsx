import * as React from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import PosterDetails from "./components/PosterDetails";
import PosterList from "./components/PosterList";

export interface Poster {
  title: string;
  author_names: string[];
  event: string;
  keywords: string[];
  thumb_url: string;
  thumb_url_large: string;
  id: string;
}

export const BASE_PATH = "/events_manager/v3/posters/search";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Link to="/">
          <h1 className="app-title">poster search</h1>
        </Link>
        <Switch>
          <Route path="/posters/:id" component={PosterDetails} />
          <Route path="/" component={PosterList} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
