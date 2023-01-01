import axios from "./API";

export const SaveData = async (data) => {

    let formdata = new FormData();
    for (var key of Object.keys(data)) {
      formdata.append(key, data[key]);
    }
  
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res =  await axios.post("family/create", formdata, options)
    return res.data
  
  };