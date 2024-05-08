import { api } from "@/lib/http/api"

export const fetchCurrentUserRequest = () => {
    return api.get("/user")
}
