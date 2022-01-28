import { useMemo } from "react";
import { getBikes } from "./requests";
import useApiResult from "./useApiResult";

const useBikes = () => {
  const request = useMemo(() => getBikes(), []);
  return useApiResult(request);
};

export default useBikes;
