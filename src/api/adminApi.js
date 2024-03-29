import axios from 'axios'
import { getAuthorizationHeader } from './common';


// function for login admin
const handleUserLogin = async (data) => {
  try{
    const res = await axios.post(
      `https://www.exam.poc.ac/api/admin_login/`,
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

// to get all student list
const getAllStudentList = async () => {
  try{
    const res = await axios.get(`https://www.exam.poc.ac/api/student_info/`)
    //console.log(res);
    if(res.data.code != 200) {
      throw Error('Error getting student list')
    }
    return res.data;
  } catch(error) {
    console.log(error)
    return "Couldn't get student lsit"
  }
}

// 
const getAdminStudent = async () => {
  try{
    const res = await axios.get(`https://www.exam.poc.ac/api/admin_student_info/`)

    if(res.data.code != 200) {
      throw Error('Error getting admin student')
    }
    return res.data;
  } catch(error) {
    console.log(error)
    return "Couldn't get admin student list"
  }
}


// delete an student from the whole system 
const deleteStudent = async (phone) => {
  try{
    const res = await axios.delete(`https://www.exam.poc.ac/api/delete_user/${phone}`)
    //console.log(res);
    if(res?.data?.code != 200) {
      throw Error('Error deleting student')
    }
    return res.data;
  } catch(error) {
    console.log(error)
    return "Couldn't delete student"
  }
}

// block a student for sometime
const blockStudent = async (data) => {

  const getFormData = object => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());


  try{
    const res = await axios({
      method: 'POST',
      url: `https://www.exam.poc.ac/api/user_block/`,
      data: getFormData(data),
      headers: {
		    'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
       } 
    });

    return res.data;
  } catch(error) {
    console.log(error)
    return "Couldn't block student"
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
  getAdminStudent,
  updateUserProfile,
  deleteStudent,
  blockStudent,

}