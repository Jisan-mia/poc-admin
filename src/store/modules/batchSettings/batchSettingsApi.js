import { getAuthorizationHeader } from "./common";
import axios from 'axios'

const getBatchSettings = async () => {
  try{
    const res = await axios.get('https://www.exam.poc.ac/api/batch_data_get/',
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }
    );
    //console.log(res)
    if(res.data.code !== 200) {
      throw Error('Could not get batch settings')
    }
    return res.data;
  } catch (err) {
    // console.log(err.message)
    return 'Error getting batch settings'
  }
}

const addBatchSettings = async (data) => {
  const getFormData = object => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());
  
  try{
    const res = await axios({
      method: 'POST',
      url: `https://www.exam.poc.ac/api/batch_settings/`,
      data: getFormData(data),
      headers: {
		    'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
       }
    });
    console.log(res)
    if(res.data.code != 200) {
      throw Error('Error adding batch settings')
    }
    return res.data;
  } catch(error) {
    console.log(error)
    return "Couldn't add batch settings"
  }
}


export default {
  getBatchSettings,
  addBatchSettings
}