const fetchIpDetails = async (ipArray, allIpDetails) => {
  let ipDetailsArray = [];

  for (let index = 0; index < ipArray.length; index++) {
      const ip = ipArray[index];
      const alreadyMapped = allIpDetails.find(ipD => ipD.ip == ip);

      if (alreadyMapped) {
          continue;
      } else {
          let response = await fetch((`https://ipapi.co/${ip}/json/`));
          let data = await response.json()

          ipDetailsArray.push(data);                 
      }; 
  }

  return ipDetailsArray;
};

export default fetchIpDetails;
