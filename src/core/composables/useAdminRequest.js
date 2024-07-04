import Config from '../_internal/Config';
import useRequest from './useRequest';

export default function useAdminRequest() {
  return useRequest({
    baseEndpoint: Config.adminRoutesPrefix,
  });
}
