export const getGeolocation = (
  successCallback: (position: GeolocationPosition) => void,
  errorCallback?: (error?: GeolocationPositionError) => void,
) => {
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      { maximumAge: 0, enableHighAccuracy: true },
    );
  }

  errorCallback?.();
};
