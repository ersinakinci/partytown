import { initNextScriptsInWebWorker } from './worker-script';
import { initWebWorker } from './init-worker';
import { webWorkerCtx } from './worker-constants';
import {
  SandboxMessageToWebWorker,
  WebWorkerMessageToSandbox,
  WebWorkerResponseFromSandboxMessage,
} from '../types';

self.onmessage = (ev: MessageEvent<WebWorkerResponseFromSandboxMessage>) => {
  const msg = ev.data;
  const msgType = msg[0];
  let initializedId = -1;

  if (msgType === SandboxMessageToWebWorker.MainDataResponse) {
    initWebWorker(self as any, msg[1]);
  } else if (msgType === SandboxMessageToWebWorker.InitializeNextScript) {
    const script = initNextScriptsInWebWorker();
    if (script) {
      initializedId = script.$instanceId$;
    }
  }

  self.postMessage([
    WebWorkerMessageToSandbox.ScriptInitialized,
    initializedId,
    webWorkerCtx.$initializeScripts$.length,
  ]);
};

// trigger loading main data
console.log('[WebWorkerMessageToSandbox.MainDataRequest]', [
  WebWorkerMessageToSandbox.MainDataRequest,
]);
self.postMessage([WebWorkerMessageToSandbox.MainDataRequest]);