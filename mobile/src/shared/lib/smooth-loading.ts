const smoothLoading = <T>(promise: Promise<T>, ms: number): Promise<T> => {
  return Promise.all([promise, new Promise((resolve) => setTimeout(resolve, ms))]).then(
    ([result]) => result,
  );
};

export { smoothLoading };
