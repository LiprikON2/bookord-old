import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import LibraryView from './components/library/LibraryView';
import ReadView from './components/read/ReadView';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LibraryView} />
                <Route path="/read/:id/" component={ReadView} />
            </Switch>
        </Router>
    );
}
