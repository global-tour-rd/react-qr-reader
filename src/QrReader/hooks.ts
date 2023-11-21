import { MutableRefObject, useEffect, useRef, DependencyList } from 'react';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';

import { UseQrReaderHook } from '../types';

import { isMediaDevicesSupported, isValidType } from './utils';

// TODO: add support for debug logs
export const useQrReader: UseQrReaderHook = (
  {
    scanDelay: delayBetweenScanAttempts,
    constraints: video,
    onReady,
    onResult,
    onResultNone,
    onError,
    videoId,
  },
  deps: DependencyList = []
) => {
  const controlsRef: MutableRefObject<IScannerControls> = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader(null, {
      delayBetweenScanAttempts,
    });

    if (
      !isMediaDevicesSupported() &&
      isValidType(onError, 'onError', 'function')
    ) {
      const message =
        'MediaDevices API has no support for your browser. You can fix this by running "npm i webrtc-adapter"';

      onError(new Error(message));
    }

    if (isValidType(video, 'constraints', 'object')) {
      codeReader
        .decodeFromConstraints({ video }, videoId, (result, error) => {
          if (result) {
            if (isValidType(onResult, 'onResult', 'function')) {
              onResult(result);
            }
            return;
          }

          if (error) {
            if (isValidType(onResultNone, 'onResultNone', 'function')) {
              onResultNone(error);
            }
            return;
          }
        })
        .then((controls: IScannerControls) => {
          if (isValidType(onReady, 'onReady', 'function')) {
            onReady(codeReader);
          }

          controlsRef.current = controls;
        })
        .catch((error: Error) => {
          if (isValidType(onError, 'onError', 'function')) {
            onError(error);
          }
        });
    }

    return () => {
      controlsRef.current?.stop();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);
};
