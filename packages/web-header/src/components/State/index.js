import React from 'react';
import createReactContext from 'create-react-context';

export const WebHeaderContext = createReactContext({});
export const WebHeaderContextProvider = WebHeaderContext.Provider;
export const WebHeaderContextConsumer = WebHeaderContext.Consumer;
export const whitContextConsumer = Component => componentProps => (
  <WebHeaderContextConsumer>
    {providerProps => <Component {...componentProps} {...providerProps} />}
  </WebHeaderContextConsumer>
);
export const whitContextProvider = Component => componentProps => {
  const abWinnerVariant = componentProps.getAbVariantHeader
    ? componentProps.getAbVariantHeader()
    : '';
  return (
    <WebHeaderContextProvider value={{ abWinnerVariant }}>
      <Component {...componentProps} />
    </WebHeaderContextProvider>
  );
};

export default {
  WebHeaderContext,
  WebHeaderContextProvider,
  WebHeaderContextConsumer
};
