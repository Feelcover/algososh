import { FC } from "react";
import { Route, Switch } from "react-router-dom";
import { FibonacciPage } from "../fibonacci-page/fibonacci-page";
import { ListPage } from "../list-page/list-page";
import { MainPage } from "../main-page/main-page";
import { QueuePage } from "../queue-page/queue-page";
import { StringPage } from "../string-page/string-page";
import { SortingPage } from "../sorting-page/sorting-page";
import { StackPage } from "../stack-page/stack-page";
import styles from "./app.module.css";

const App: FC = () => {
  return (
    <div className={styles.app}>
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/recursion">
            <StringPage />
          </Route>
          <Route path="/fibonacci">
            <FibonacciPage />
          </Route>
          <Route path="/sorting">
            <SortingPage />
          </Route>
          <Route path="/stack">
            <StackPage />
          </Route>
          <Route path="/queue">
            <QueuePage />
          </Route>
          <Route path="/list">
            <ListPage />
          </Route>
        </Switch>
    </div>
  );
};

export default App;
