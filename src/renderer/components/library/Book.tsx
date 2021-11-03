import { Link } from 'react-router-dom';

const Book = ({ num }: { num: number }) => {
    return (
        <>
            <Link to={`/read/${num}`}>Book {num}!</Link>
        </>
    );
};

export default Book;
