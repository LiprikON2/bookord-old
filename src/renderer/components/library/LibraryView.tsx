import BookList from './BookList';
import BookUpload from './BookUpload';
import icon from '../../../../assets/icon.svg';

const Library = () => {
    return (
        <>
            <h1>Library</h1>
            <img width="100px" alt="icon" src={icon} />
            <BookList />
            <BookUpload />
        </>
    );
};

export default Library;
