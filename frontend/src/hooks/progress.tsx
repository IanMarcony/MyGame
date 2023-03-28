/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useCallback, useContext, useState } from 'react';

interface ProgressLoadingContextData {
  loading: boolean;
  toggleLoading(): void;
}

type ProgressLoadingProviderProps = React.PropsWithChildren;

const ProgressLoadingContext = createContext<ProgressLoadingContextData>(
  {} as ProgressLoadingContextData,
);

const ProgressLoadingProvider: React.FC<ProgressLoadingProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  const toggleLoading = useCallback(() => {
    setLoading((old) => !old);
  }, []);

  return (
    <ProgressLoadingContext.Provider value={{ loading, toggleLoading }}>
      {children}
    </ProgressLoadingContext.Provider>
  );
};

const useProgressLoading = function (): ProgressLoadingContextData {
  const context = useContext<ProgressLoadingContextData>(
    ProgressLoadingContext,
  );

  if (!context) {
    throw new Error(
      'useProgressLoading must be used within ProgressLoadingProvider',
    );
  }

  return context;
};

export { ProgressLoadingProvider, useProgressLoading };
