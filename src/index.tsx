import ReactDOM from "react-dom";
import "./index.css";
import "./fonts/fonts.css";
import "./components/ui/common.css";
import "./components/ui/box.css";
import App from "./components/app/app";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router basename={window.location.pathname || ''}>
    <App />
  </Router>,
  document.getElementById("root")
);
