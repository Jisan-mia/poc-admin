import { getAuthorizationHeader } from "./common";
import axios from 'axios'
const getExamPackList = async () => {
  const headers = getAuthorizationHeader()
    try{
      const res = await axios.get('https://www.exam.poc.ac/api/admin_list_examPack/',
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }
      );
      //console.log(res)
      if(res.data.code !== 200) {
        throw Error('Error getting exam pack')
      }
      return res.data
    } catch (err) {
      //console.log(err.message)
      return 'error getting exam pack'
    }
  
}


const createPack = async (data) => {
  
  const getFormData = object => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());
  
  try{

    const res = await axios({
      method: 'POST',
      url: `https://www.exam.poc.ac/api/add_exampack/`,
      data: getFormData(data),
      headers: {
		    'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
       }
    });

    if(res.data.code != 200) {
      throw Error('Error updating exam pack')
    }
    return res.data;
  } catch(error) {
    console.log(error)
    return "Couldn't update exam pack"
  }
}

const updateExamPack = async (data) => {
  
  const getFormData = object => Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());
  
  try{

    const res = await axios({
      method: 'PUT',
      url: `https://www.exam.poc.ac/api/edit-exampack/${data.id}`,
      data: getFormData(data),
      headers: {
		    'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
       }
    });

    if(res.data.status != 200) {
      throw Error('Error updating exam pack')
    }
    return res.data;
  } catch(error) {
    console.log(error)
    return "Couldn't update exam pack"
  }
}

const deletePack = async (packId) => {
    try{
      const res = await axios.delete(`https://www.exam.poc.ac/api/delete-exampack/${packId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );
      //console.log(res)
      if(res.data.code !== 200) {
        throw Error('Error deleting exam pack')
      }
      return res.data
    } catch (err) {
      //console.log(err.message)
      return 'error deleting exam pack'
    }

}







// below code not needed currently

const getExamLists = async () => {
  try{
    const res = await axios.get('https://www.exam.poc.ac/api/student_exam_list/',
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }
    );
    //console.log(res)
    if(res.data.code !== 200) {
      throw Error('Error getting exam lists')
    }
    return res.data
  } catch (err) {
    //console.log(err.message)
    return 'error getting student exam lists'
  }
}

const getExamQuestions = async (id) => {
  try{
    const res = await axios.get(`https://www.exam.poc.ac/api/get_question/${id}`,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    }
    );
    //console.log(res)
    if(res.data.code !== 200) {
      throw Error('Error getting exam questions')
    }
    return res.data
  } catch (err) {
    //console.log(err.message)
    return 'error getting exam questions'
  }
}

const getQuestionOptions = async (questionName) => {
  
  let data = new FormData();
  data.append('question_name', questionName);

  try{
    
    const res = await axios({
      method: 'post',
      url: 'https://exam.poc.ac/api/all_option_get/',
      headers: {
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        
      },
      data: data

    })
    if(res.data.code !== 200) {
      throw Error('Error getting question options')
    }
    return res.data
  } catch (err) {
    //console.log(err.message)
    return 'error getting question options'
  }
}



export default {
  getExamPackList,
  createPack,
  updateExamPack,
  deletePack,
  getExamLists,
  getExamQuestions,
  getQuestionOptions
}