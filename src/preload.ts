import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('api', {
  upload: (files: any) => ipcRenderer.invoke('testing', files),
});
