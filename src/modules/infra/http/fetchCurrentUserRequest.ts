import { api } from "../services/apiClient";

const fetchCurrentUserRequest = () => {
    return api.get("/user")
}

export default fetchCurrentUserRequest;
