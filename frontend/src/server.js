export const server = "http://127.0.0.1:8000";
// export const server = "http://192.168.1.2:8000";

const rest_auth = server + "/rest-auth/";
export const loginURL = rest_auth + "login/";
export const signupURL = rest_auth + "registration/";

const api = server + "/api/";
export const profileAPI = api + "profile/";
export const currentUserAPI = api + "current_user";
export const userBasicAPI = api + "user/";

export const groupAPI = api + "group/";
export const groupCreatorAPI = api + "group_creator/";
export const ideaAPI = api + "idea/";
export const commentIdeaAPI = api + "comment/idea/";

export const voteAPI = api + "vote/";
export const searchAPI = api + "search/user/";
export const friendRequestAPI = api + "friendrequest/";
export const friendRequestListAPI = api + "friendrequests";
export const unfriendAPI = api + "unfriend/";
