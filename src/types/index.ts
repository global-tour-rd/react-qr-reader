import { BrowserQRCodeReader } from '@zxing/browser';
import { Result } from '@zxing/library';
import { DependencyList } from 'react';

export type QrReaderProps = {
  /**
   * Media track constraints object, to specify which camera and capabilities to use
   */
  constraints?: MediaTrackConstraints;
  /**
   * Called when an ready occurs.
   */
  onReady?: OnReadyFunction;
  /**
   * Called when an result occurs.
   */
  onResult?: OnResultFunction;
  /**
   * Called when an result none occurs.
   */
  onResultNone?: OnResultNoneFunction;
  /**
   * Called when an error occurs.
   */
  onError?: OnErrorFunction;
  /**
   * Property that represents the view finder component
   */
  ViewFinder?: (props: any) => React.ReactElement<any, any> | null;
  /**
   * Property that represents the scan period
   */
  scanDelay?: number;
  /**
   * Property that represents the ID of the video element
   */
  videoId?: string;
  /**
   * Property that represents an optional className to modify styles
   */
  className?: string;
  /**
   * Property that represents a style for the container
   */
  containerStyle?: any;
  /**
   * Property that represents a style for the video container
   */
  videoContainerStyle?: any;
  /**
   * Property that represents a style for the video
   */
  videoStyle?: any;
};

export type OnReadyFunction = (
  /**
   * The instance of the QR browser reader
   */
  codeReader?: BrowserQRCodeReader
) => void;

export type OnResultFunction = (
  /**
   * The QR values extracted by Zxing
   */
  result?: Result | undefined | null
) => void;

export type OnResultNoneFunction = (
  /**
   * The name of the exceptions thrown while reading the QR
   */
  error?: Error | undefined | null
) => void;

export type OnErrorFunction = (
  /**
   * The failed startup
   */
  error?: Error | undefined | null
) => void;

export type UseQrReaderHookProps = {
  /**
   * Media constraints object, to specify which camera and capabilities to use
   */
  constraints?: MediaTrackConstraints;
  /**
   * Callback for retrieving the ready
   */
  onReady?: OnReadyFunction;
  /**
   * Callback for retrieving the result
   */
  onResult?: OnResultFunction;
  /**
   * Callback for retrieving no results
   */
  onResultNone?: OnResultNoneFunction;
  /**
   * Callback for retrieving the error
   */
  onError?: OnErrorFunction;
  /**
   * Property that represents the scan period
   */
  scanDelay?: number;
  /**
   * Property that represents the ID of the video element
   */
  videoId?: string;
};

export type UseQrReaderHook = (
  props: UseQrReaderHookProps,
  deps?: DependencyList
) => void;
