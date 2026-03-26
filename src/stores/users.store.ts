import { create } from "zustand";

export type User = {
    id: string;
    name: string;
    role?: string;
};

type UsersStore = {
    users: User[];

    addUser: (user: User) => void;
    removeUser: (id: string) => void;
    clearUsers: () => void;
};

export const useUsersStore = create<UsersStore>((set) => ({
    users: [],
    addUser: (user) =>
        set((state) => ({
            users: [...state.users, user],
        })),
    removeUser: (id) =>
        set((state) => ({
            users: state.users.filter((u) => u.id !== id),
        })),
    clearUsers: () => set({ users: [] }),
}));