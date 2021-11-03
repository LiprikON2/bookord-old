const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer: {
        myPing() {
            ipcRenderer.send('ipc-example', 'ping');
        },
        on(channel, func) {
            const validChannels = [
                'ipc-example',
                'app:on-fs-dialog-open',
                'app:get-files',
                'app:delete-file',
                'app:on-file-add',
                'app:on-file-copy',
                'app:on-file-delete',
            ];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender`
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
        once(channel, func) {
            const validChannels = [
                'ipc-example',
                'app:on-fs-dialog-open',
                'app:get-files',
                'app:delete-file',
                'app:on-file-add',
                'app:on-file-copy',
                'app:on-file-delete',
            ];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` // todo understand what does it mean
                ipcRenderer.once(channel, (event, ...args) => func(...args));
            }
        },
        invoke(channel, func) {
            const validChannels = [
                'ipc-example',
                'app:on-fs-dialog-open',
                'app:get-files',
                'app:delete-file',
                'app:on-file-add',
                'app:on-file-copy',
                'app:on-file-delete',
            ];
            if (validChannels.includes(channel)) {
                ipcRenderer.invoke(channel, func);
            }
        },
        send(channel, func) {
            const validChannels = [
                'ipc-example',
                'app:on-fs-dialog-open',
                'app:get-files',
                'app:delete-file',
                'app:on-file-add',
                'app:on-file-copy',
                'app:on-file-delete',
            ];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, func);
            }
        },
    },
});
