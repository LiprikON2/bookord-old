const dragDrop = require('drag-drop');
const { ipcRenderer } = require('electron');

// local dependencies
const dom = require('./BookUploadDom');

// get list of files from the `main` process
ipcRenderer
    .invoke('app:get-files')
    .then((files = []) => {
        dom.displayFiles(files);
        return null;
    })
    .catch(() => null);

// handle file delete event
ipcRenderer.on('app:delete-file', (event, filename) => {
    document.getElementById(filename).remove();
});

// add files drop listener
dragDrop('#uploader', (files) => {
    const filesVar = files.map((file) => {
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
                    dom.displayFiles(files);
                })
                .catch(() => null);
            return null;
        })
        .catch(() => null);
});

// open filesystem dialog
window.openDialog = () => {
    ipcRenderer
        .invoke('app:on-fs-dialog-open')
        .then(() => {
            ipcRenderer
                .invoke('app:get-files')
                .then((files = []) => {
                    dom.displayFiles(files);
                })
                .catch(() => null);

            return null;
        })
        .catch(() => null);
};
