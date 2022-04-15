import { useMemo } from "react";
import {getTypes} from "./requests";
import useApiResult from "./useApiResult";

const useTypes = () => {
  const request = useMemo(() => getTypes(), []);
  return useApiResult(request);
};

export default useTypes;
