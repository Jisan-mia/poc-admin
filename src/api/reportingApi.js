import { getAuthorizationHeader } from "./common";
import axios from 'axios'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQyNjk4NzQzLCJqdGkiOiJjMTQ3NDgyZWRhMDI0NjU4ODNkZmNmNWFhYWM4ODRmOSIsInVzZXJfaWQiOjg4fQ.Kz2vQS6LfP-wfghrkRC6ufa-_1pKeHAOXLr-c_2E4Dc'

const getStudentReporting = async () => {
    try{
      const res = await axios.get('https://www.exam.poc.ac/api/show_all_report/',
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }
      );
      //console.log(res)
      if(res.data.code !== 200) {
        throw Error('Could not get student reporting')
      }
      return res.data;
    } catch (err) {
      // console.log(err.message)
      return 'Error getting student reporting'
    }
}

const getSpecificReporting = async (exam_name) => {
  try{
    const res = await axios.get(`https://www.exam.poc.ac/api/get_result_specific_sub/${exam_name}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }
    );
    //console.log(res)
    if(res.data.code !== 200) {
      throw Error('Could not get student specific reporting');
    }
    return res.data;
  } catch (err) {
    // console.log(err.message)
    return 'Error getting student specific reporting'
  }
}

export default {
  getStudentReporting,
  getSpecificReporting
}