import { fetchDeviceInfo } from "../http/deviceAPI";

  export const fetchAllInfo = async(currentStore, deviceId, sortBy, sortDirection) => {
    const fetchedDeviceInfo = await fetchDeviceInfo( deviceId, sortBy, sortDirection = 'ASC');
      if(fetchedDeviceInfo.count === 0) console.log('Nothing found!')
      await currentStore.setInfo(fetchedDeviceInfo);
  }

  export const fetchInfo = async(currentStore, deviceId, sortBy, sortDirection) => {
    try {
      currentStore.setLoading(true);
        await fetchAllInfo(currentStore, deviceId, sortBy = null, sortDirection = null);
      } catch (e) {
        console.log(e)
      } finally {
        currentStore.setLoading(false);
      }
    }