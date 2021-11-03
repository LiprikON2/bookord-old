import { useEffect } from 'react';

const BookUpload = () => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = './BookUploadRenderer';
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <>
            <div id="uploader" className="app__uploader">
                <div className="app__uploader__icon-area">
                    <img
                        src="../assets/upload.svg"
                        className="app__uploader__icon-area__icon"
                        alt=""
                    />
                    <p className="app__uploader__icon-area__text">
                        Drag file(s) to add
                    </p>
                </div>
                <div className="app__uploader__button-area">
                    <button
                        className="bookUpload app__uploader__button-area__button"
                        type="button"
                    >
                        Add a book
                    </button>
                </div>
            </div>

            <div id="filelist" className="app__files" />
        </>
    );
};

export default BookUpload;
