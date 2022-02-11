import dayjs from "dayjs";

export const getAccessToken = async () => {
	
};

export const getAuthorizationHeader = async () => {
	const headers = {
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	};
	return headers;
};


export const getNotification = (type, message) => {
	return {
		type,
		message
	}
} 
export const getDateDiff = (date, time) => {
	const now = dayjs().format('YYYY-MM-DD hh:mm:ss A');
	const examDate = dayjs(date + time).format("YYYY-MM-DD hh:mm:ss A");
	return dayjs(examDate).diff(now, 'second') < 0
}

export const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)


// new counter system
export const  getTimeRemaining = (endtime) => {
	const total = Date.parse(endtime) - Date.parse(new Date());
	const seconds = Math.floor((total / 1000) % 60);
	const minutes = Math.floor((total / 1000 / 60) % 60);
	const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
	const days = Math.floor(total / (1000 * 60 * 60 * 24));

	return {
		total,
		days,
		hours,
		minutes,
		seconds
	};
}


// array comp
export const arraysCompare = (a1, a2) => {
  if (a1.length !== a2.length) return false;
  const objectIteration = (object) => {
    const result = [];
    const objectReduce = (obj) => {
      for (let i in obj) {
        if (typeof obj[i] !== 'object') {
          result.push(`${i}${obj[i]}`);
        } else {
          objectReduce(obj[i]);
        }
      }
    };
    objectReduce(object);
    return result;
  };
  const reduceArray1 = a1.map(item => {
    if (typeof item !== 'object') return item;
    return objectIteration(item).join('');
  });
  const reduceArray2 = a2.map(item => {
    if (typeof item !== 'object') return item;
    return objectIteration(item).join('');
  });
  
  return reduceArray1.map(item => reduceArray2.includes(item))
};


export const editorConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'link',
      '|',
      'code',
      'subscript',
      'superscript',
      'MathType',
      'ChemType',
      'specialCharacters',
      'blockQuote'
    ]
  },
  language: 'en',
  shouldNotGroupWhenFull: true
}