import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import BookList from './components/library/BookList';

const Library = () => {
    return (
        <>
            <h1>Library</h1>
            <img width="100px" alt="icon" src={icon} />
            <BookList />
        </>
    );
};

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Library} />
            </Switch>
        </Router>
    );
}
