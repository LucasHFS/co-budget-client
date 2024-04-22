import { api } from "../services/apiClient";

export const fetchCurrentUserRequest = () => {
    return api.get("/user")
}
