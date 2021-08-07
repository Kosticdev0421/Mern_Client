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
export const getQuestion = (id) => API.get(`/questions/${id}`);
export const getTopQuestions = () => API.get(`/questions/top`);
export const getQuestionsByTag = (tag) => API.get(`/questionsByTag/${tag}`);
export const getFilteredQuestions = (sortBy, tag) => API.get(`/questions?sortBy=${sortBy}&tag=${tag}`);
export const searchQuestions = (query) => API.get(`/search?query=${query}`);

export const askQuestion = (question) => API.post("/ask", question);
export const deleteQuestion = (id) => API.delete(`/question/${id}`);

export const getAnswers = (id) => API.get(`/answers?question=${id}`);
export const writeAnswer = (answer) => API.post(`/writeAnswer`, answer);
export const deleteAnswer = (id) => API.delete(`/answer/${id}`);

export const getReviews = () => API.get(`/reviews`);
export const addReview = (info) => API.post(`/addReview`, info);

export const getTags = () => API.get(`/tags`);

