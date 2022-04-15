import { useMemo } from "react";
import useApiResult from "./useApiResult";
import {getModels} from "./requests";

const useModels = () => {
  const request = useMemo(() => getModels(), []);
  return useApiResult(request);
};

export default useModels;
