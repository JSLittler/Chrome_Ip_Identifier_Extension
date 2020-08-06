let ipStore = {
  ipStoreArray: [],
  addIpDetailsToStore : (ipDetails) => {
      ipStore.ipStoreArray.push(ipDetails)
      window.localStorage.setItem('ipStorage', JSON.stringify(ipStore.ipStoreArray) )
  },
  getIpDetails : (ip) => {
      return ipStore.ipStoreArray.filter((e) => {return e.ip == ip})
  },
  getAllIpDetails : () => {
      return ipStore.ipStoreArray;
  },
  setupStoreArray : () => {
      let fromStorage = window.localStorage.getItem('ipStorage');
      if(fromStorage){
          fromStorage = JSON.parse(fromStorage);
          ipStore.ipStoreArray = fromStorage;
      }
  }
}

export default ipStore;
