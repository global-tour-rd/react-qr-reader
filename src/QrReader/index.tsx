import * as React from 'react';

import { styles } from './styles';
import { useQrReader } from './hooks';

import { QrReaderProps } from '../types';

export const QrReader: React.FC<QrReaderProps> = ({
                                                    videoContainerStyle,
                                                    containerStyle,
                                                    videoStyle,
                                                    constraints,
                                                    ViewFinder,
                                                    scanDelay,
                                                    className,
                                                    onReady,
                                                    onResult,
                                                    onResultNone,
                                                    onError,
                                                    videoId,
                                                  }) => {
  console.log('[react-qr-reader] Component:', constraints);

  useQrReader(
    {
      constraints,
      scanDelay,
      onReady,
      onResult,
      onResultNone,
      onError,
      videoId,
    },
    [
      JSON.stringify(constraints),
      scanDelay,
      onReady,
      onResult,
      onResultNone,
      onError,
      videoId,
    ]
  );

  return (
    <section className={className} style={containerStyle}>
      <div
        style={{
          ...styles.container,
          ...videoContainerStyle,
        }}
      >
        {!!ViewFinder && <ViewFinder />}
        <video
          muted
          id={videoId}
          style={{
            ...styles.video,
            ...videoStyle,
          }}
        />
      </div>
    </section>
  );
};

QrReader.displayName = 'QrReader';
QrReader.defaultProps = {
  constraints: {
    facingMode: 'user',
  },
  videoId: 'video',
  scanDelay: 500,
};
