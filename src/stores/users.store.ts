import type { User } from "@/types";
import { create } from "zustand";


type UsersStore = {
    users: User[];
    addUser: (user: Pick<User, "id" | "name" | "userImg">) => void;
    removeUser: (id: number) => void;
    clearUsers: () => void;
};

export const useUsersStore = create<UsersStore>((set) => ({
    users: [],
    addUser: (user) =>
        // @ts-ignore
        set((state) => ({
            users: [...state.users, user],
        })),
    removeUser: (id) =>
        set((state) => ({
            users: state.users.filter((u) => u.id !== id),
        })),
    clearUsers: () => set({ users: [] }),
}));