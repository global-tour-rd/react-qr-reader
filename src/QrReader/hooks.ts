import { MutableRefObject, useEffect, useRef, DependencyList } from 'react';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';

import { UseQrReaderHook } from '../types';

import { isMediaDevicesSupported, isValidType } from './utils';

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
  const streamRef: MutableRefObject<MediaStream> = useRef(null);
  const controlsRef: MutableRefObject<IScannerControls> = useRef(null);

  useEffect(() => {
    const reader = new BrowserQRCodeReader(null, {
      delayBetweenScanAttempts,
    });

    const isSupported = isMediaDevicesSupported();
    const isValidConstraints = isValidType(video, 'constraints', 'object');

    if (!isSupported) {
      const message =
        'MediaDevices API has no support for your browser. You can fix this by running "npm i webrtc-adapter"';
      onError && onError(new Error(message));
    }

    if (isSupported && isValidConstraints) {
      navigator.mediaDevices
        .getUserMedia({ audio: false, video: video })
        .then((stream) => {
          streamRef.current = stream;
          reader
            .decodeFromStream(stream, videoId, (result, error) => {
              if (result) {
                onResult && onResult(result);
                return;
              }
              if (error) {
                onResultNone && onResultNone(error);
                return;
              }
            })
            .then((controls: IScannerControls) => {
              controlsRef.current = controls;
              onReady && onReady(controls, stream);
            })
            .catch((error) => {
              onError && onError(error);
            });
        })
        .catch((error) => {
          onError && onError(error);
        });
    }

    return () => {
      controlsRef.current?.stop();
      streamRef.current?.getTracks()?.forEach((track) => track?.stop());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
