import { getAuthorizationHeader } from "./common";
import axios from 'axios'


const submitResultToApi = async (data) => {
  const headers = getAuthorizationHeader();

  const getFormData = object => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());
  
  try{
    const res = await axios({
      method: 'POST',
      url: 'https://www.exam.poc.ac/api/show_all_report/',
      data: getFormData(data),
      headers: {
		    'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
       }
    });


    //console.log(res)
    if(res.data.code !== 200) {
      throw Error('Error student register')
    }
    return res;
  } catch (err) {
    return 'Error registering student profile'
  }
}


const submitResultToSpecificApi = async (data, exam_str_name) => {
  const headers = getAuthorizationHeader();

  const getFormData = object => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());
  
  try{
    const res = await axios({
      method: 'POST',
      url: `https://www.exam.poc.ac/api/get_result_specific_sub/${exam_str_name}`,
      data: getFormData(data),
      headers: {
		    'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
       }
    });


    //console.log(res)
    if(res.data?.code !== 200) {
      throw Error('Error student register')
    }
    return res.data;
  } catch (err) {
    return 'Error registering student profile'
  }
}



export default {
  submitResultToApi,
  submitResultToSpecificApi
}