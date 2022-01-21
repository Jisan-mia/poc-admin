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