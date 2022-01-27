import { useMemo } from "react";
import {getBikes} from "../../services/requests";
import useApiResult from "../../services/useApiResult";

const useBikes = () => {
  const request = useMemo(() => getBikes(), []);
  return useApiResult(request);
};

export default useBikes;
