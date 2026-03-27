import axios from "axios";

export const searchUsers = async (keyword: string) => {
    const { data } = await axios.get(
        `https://users.roblox.com/v1/users/search`,
        {
            params: {
                keyword,
                limit: 10,
            },
        }
    );
    return data;
};