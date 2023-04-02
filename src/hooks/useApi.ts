const useApi = () => {
  const getApi = async (url: string, option: any) => {
    let res: any;
    const result = await fetch(url, option)
      .then((result: any) => {
        const json = result.json();

        res = json;
        return res;
      })
      .catch((error) => {
        return (res = error.message);
      })
      .finally(() => {});

    return res;
  };

  return { getApi };
};

export default useApi;
