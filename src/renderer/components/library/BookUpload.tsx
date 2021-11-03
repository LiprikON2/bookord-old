import { useEffect } from 'react';
import upload from '../../../../assets/upload.svg';

const dragDrop = require('drag-drop');

declare const window: any;
const { ipcRenderer } = window.electron;

// interface File {
//     name: string;
//     path: string;
//     size: number;
// }

const BookUpload = () => {
    const displayFiles = (files: File[] = []) => {
        const fileListElem = document.getElementById('filelist'); // todo refactor using hooks
        if (fileListElem) {
            fileListElem.innerHTML = '';

            files.forEach((file) => {
                const itemDomElem = document.createElement('div');
                itemDomElem.setAttribute('id', file.name); // set `id` attribute
                itemDomElem.setAttribute('class', 'app__files__item'); // set `class` attribute
                itemDomElem.setAttribute('data-filepath', file.path); // set `data-filepath` attribute

                itemDomElem.innerHTML = `
                <img ondragstart='copyFile(event, "${file.name}")' src='../assets/document.svg' class='app__files__item__file'/>
                    <div class='app__files__item__info'>
                    <p class='app__files__item__info__name'>${file.name}</p>
                    <p class='app__files__item__info__size'>${file.size}KB</p>
                    </div>
                    <img onclick='deleteFile("${file.name}")' src='../assets/delete.svg' class='app__files__item__delete'/>
                    <img onclick='openFile("${file.name}")' src='../assets/open.svg' class='app__files__item__open'/>
                `;

                fileListElem.appendChild(itemDomElem);
            });
        }
    };

    const handleUpload = () => {
        ipcRenderer
            .invoke('app:on-fs-dialog-open')
            .then(() => {
                // eslint-disable-next-line promise/no-nesting
                ipcRenderer
                    .invoke('app:get-files')
                    .then((files: File[] = []) => {
                        displayFiles(files);
                        return null;
                    })
                    .catch(() => null);

                return null;
            })
            .catch(() => null);
    };

    // // copy file
    // const copyFile = (
    //     event: { preventDefault: () => void },
    //     itemId: string
    // ) => {
    //     event.preventDefault();

    //     // get path of the file
    //     const itemNode = document.getElementById(itemId);
    //     if (!itemNode) {
    //         return;
    //     }
    //     const filepath = itemNode.getAttribute('data-filepath');

    //     // send event to the main thread
    //     ipcRenderer.send('app:on-file-copy', { id: itemId, filepath });
    // };

    // // delete file
    // const deleteFile = (itemId: string) => {
    //     // get path of the file
    //     const itemNode = document.getElementById(itemId);
    //     if (!itemNode) {
    //         return;
    //     }
    //     const filepath = itemNode.getAttribute('data-filepath');

    //     // send event to the main thread
    //     ipcRenderer.send('app:on-file-delete', { id: itemId, filepath });
    // };

    // // open file
    // const openFile = (itemId: string) => {
    //     // get path of the file
    //     const itemNode = document.getElementById(itemId);
    //     if (!itemNode) {
    //         return;
    //     }
    //     const filepath = itemNode.getAttribute('data-filepath');

    //     // send event to the main thread
    //     ipcRenderer.send('app:on-file-open', { id: itemId, filepath });
    // };

    useEffect(() => {
        // get list of files from the `main` process
        ipcRenderer
            .invoke('app:get-files')
            .then((files = []) => {
                displayFiles(files);
                return null;
            })
            .catch(() => null);

        // handle file delete event
        ipcRenderer.on('app:delete-file', (_event: any, filename: string) => {
            const file = document.getElementById(filename);
            if (file) {
                file.remove();
            }
        });

        // add files drop listener
        dragDrop('#uploader', (files: any[]) => {
            const filesVar = files.map((file: { name: any; path: any }) => {
                return {
                    name: file.name,
                    path: file.path,
                };
            });

            // send file(s) add event to the `main` process
            ipcRenderer
                .invoke('app:on-file-add', filesVar)
                .then(() => {
                    ipcRenderer
                        .invoke('app:get-files')
                        .then((files = []) => {
                            displayFiles(files);
                        })
                        .catch(() => null);
                    return null;
                })
                .catch(() => null);
        });
    });

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
