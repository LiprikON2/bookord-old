import upload from '../../../../assets/upload.svg';

declare const window: any;
const { ipcRenderer } = window.electron;

// interface File {
//     name: string;
//     path: string;
//     size: number;
// }

const BookUpload = () => {
    // const displayFiles = (files: File[] = []) => {
    //     const fileListElem = document.getElementById('filelist'); // todo refactor using hooks
    //     if (fileListElem) {
    //         fileListElem.innerHTML = '';

    //         files.forEach((file) => {
    //             const itemDomElem = document.createElement('div');
    //             itemDomElem.setAttribute('id', file.name); // set `id` attribute
    //             itemDomElem.setAttribute('class', 'app__files__item'); // set `class` attribute
    //             itemDomElem.setAttribute('data-filepath', file.path); // set `data-filepath` attribute

    //             itemDomElem.innerHTML = `
    //         <img ondragstart='copyFile(event, "${file.name}")' src='../assets/document.svg' class='app__files__item__file'/>
    //             <div class='app__files__item__info'>
    //             <p class='app__files__item__info__name'>${file.name}</p>
    //             <p class='app__files__item__info__size'>${file.size}KB</p>
    //             </div>
    //             <img onclick='deleteFile("${file.name}")' src='../assets/delete.svg' class='app__files__item__delete'/>
    //             <img onclick='openFile("${file.name}")' src='../assets/open.svg' class='app__files__item__open'/>
    //         `;

    //             fileListElem.appendChild(itemDomElem);
    //         });
    //     }
    // };

    const handleUpload = () => {
        console.log('trying to invoke...');
        ipcRenderer.invoke('app:on-fs-dialog-open');
        // .then(() => {
        //     // eslint-disable-next-line promise/no-nesting
        //     ipcRenderer
        //         .invoke('app:get-files')
        //         .then((files: File[] = []) => {
        //             console.log(files);
        //             // displayFiles(files);
        //             return null;
        //         })
        //         .catch(() => null);

        //     return null;
        // })
        // .catch(() => null);
    };
    return (
        <>
            <div id="uploader" className="app__uploader">
                <div className="app__uploader__icon-area">
                    <img
                        src={upload}
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
                        onClick={handleUpload}
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
