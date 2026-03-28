import axios from "axios";

export const searchUsers = async (keyword: string) => {
    const { data } = await axios.get(
        `https://roblox-server-zeta.vercel.app/`,
        {
            params: {
                username: keyword,
            },
        }
    );
    return data;
};