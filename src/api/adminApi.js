import axios from 'axios'
import { getAuthorizationHeader } from './common';

const handleUserLogin = async (data) => {
  try{
    const res = await axios.post(
      `https://www.exam.poc.ac/api/token/`,
      {
        ...data,
      },
    )
    console.log(res);
    if(res.data.code == 401) {
      throw Error('Error logging user')
    }
    return res;
  } catch(error) {
    console.log(error)
    return "Couldn't login user"
  }
}


const getAllStudentList = async () => {
  try{
    const res = await axios.get(`https://www.exam.poc.ac/api/student_info/`)
    //console.log(res);
    if(res.data.code != 200) {
      throw Error('Error logging user')
    }
    return res.data;
  } catch(error) {
    console.log(error)
    return "Couldn't login user"
  }
}

const updateUserProfile = async (data) => {
  
  const getFormData = object => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());
  
  try{
    const res = await axios({
      method: 'PUT',
      url: `https://www.exam.poc.ac/api/update_student/${data.id}`,
      data: getFormData(data),
      headers: {
		    'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
       }
    });


    // const res = await axios.put(`https://www.exam.poc.ac/api/update_student/${data.id}`, 
    // {
    //   ...data,
    // })
    //console.log(res);
    if(res.data.status != 200) {
      throw Error('Error updating profile')
    }
    return res.data;
  } catch(error) {
    console.log(error)
    return "Couldn't update profile"
  }
}

export default {
  handleUserLogin,
  getAllStudentList,
  updateUserProfile,
}