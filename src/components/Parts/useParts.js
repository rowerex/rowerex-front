import { useMemo } from "react";
import {getParts} from "../../services/requests";
import useApiResult from "../../services/useApiResult";

const useParts = () => {
  const request = useMemo(() => getParts(), []);
  return useApiResult(request);
};

export default useParts;
