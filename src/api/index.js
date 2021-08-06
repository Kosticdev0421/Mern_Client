import axios from "axios";

const url = "";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  try {
    req.headers["x-access-token"] = `${localStorage.getItem("token")}`;  
  } catch (error) {
    console.warn("No token found");
  }
  
  return req;
});

export const logIn = (user) => API.post("/login", user);
export const signUp = (user) => API.post("/addUser", user);
export const getUser = () => API.get("/getUser");
export const getUserInfo = () => API.get("/userInfo");


export const getQuestions = () => API.get(`/questions`);
export const searchQuestions = (query) => API.get(`/search?query=${query}`);
export const getTopQuestions = () => API.get(`/questions/top`);
export const getQuestionsByTag = (tag) => API.get(`/questionsByTag/${tag}`);
export const getFilteredQuestions = (sortBy, tag) => API.get(`/questions?sortBy=${sortBy}&tag=${tag}`);

export const askQuestion = (question) => API.post("/ask", question);
export const deleteQuestion = (id) => API.delete(`question/${id}`);


export const getReviews = () => API.get(`/reviews`);
export const getTags = () => API.get(`/tags`);





export const getTopicQuestions = (id) => API.get(`/questions?topicId=${id}`);
export const getCurrentUserQuestions = (userId) => API.get(`/questions?userId=${userId}`);

export const getClasses = () => API.get("/classes");
export const addClass = (newClass) => API.post("/classes", newClass);

export const getSubjects = (id = "") => API.get(`/subjects?classId=${id}`);
export const addSubject = (newSubject) => API.post("/subjects", newSubject);

export const getChapters = (id = "") => API.get(`/chapters?subjectId=${id}`);
export const addChapter = (newChapter) => API.post("/chapters", newChapter);

export const getTopics = (id = "") => API.get(`/topics?chapterId=${id}`);
export const addTopic = (newTopic) => API.post("/topics", newTopic);

export const searchEq = (url) => API.get(`/searchEq?url=${url}`);
export const searchEq2 = (url) => API.post(`/searchEq`, url);

export const addExam = (newExam) => API.post(`/exam`, newExam);
export const getExams = () => API.get(`/exam`);
export const getExam = (id) => API.get(`/exam/${id}`);
