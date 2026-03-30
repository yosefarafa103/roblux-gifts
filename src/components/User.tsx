import { type User as UserType } from "../types";
import { Diamond, DiamondIcon, Plus, Trash } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { useCoins } from "../context/coins.context";
import toast from "react-hot-toast";
import { useUsersStore } from "../stores/users.store";
import defaultImg from "../../public/noFilter.png";
import { AnimatePresence, motion } from "framer-motion";
function User({ id, name, userImg }: UserType) {
  const { users, addUser, removeUser } = useUsersStore();
  const isExists = useMemo(() => {
    return !!users.find((user) => user.id === id);
  }, [users, id]);
  return (
    <>
      <div
        onClick={() => {
          if (isExists) return;
          addUser({ id, name, userImg });
        }}
        className="flex gap-4 items-center hover:bg-[#f7f7f7] p-2 transition cursor-pointer"
      >
        <img
          src={userImg || defaultImg}
          className="min-w-14 size-14! rounded-full"
          loading="lazy"
        />
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col">
            <h5 className="text-[15px]">{name}</h5>
            <span className="text-gray-500 text-sm">Member</span>
          </div>
          <Plus
            onClick={() => {
              if (isExists) {
                removeUser(id);
              }
            }}
            className={`${cn(isExists ? "text-gray-400 rotate-45" : "text-gray-700")} transition`}
          />
        </div>
      </div>
    </>
  );
}
// @ts-ignore
export function RecipentUser({ name, id, userImg }: UserType) {
  const { coins, setCoins } = useCoins();
  const { removeUser } = useUsersStore();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => setValue(""), [coins]);
  return (
    <>
      <div className="px-2 bg-white rounded-sm">
        <div className="flex gap-3 items-center p-1 px-3 transition cursor-pointer">
          <img
            src={userImg || defaultImg}
            className="min-w-8 size-8! rounded-full"
            loading="lazy"
          />
          <div className="flex justify-between w-full items-center">
            <div className="flex flex-col">
              <h5 className="foont-bold">{name}</h5>
              <span className="text-gray-500 text-sm">Member</span>
            </div>
            <div className="flex items-center gap-4">
              <DiamondIcon className="ml-10" />
              <input
                ref={inputRef}
                onChange={(e) => setValue(e.target.value)}
                type="number"
                className="h-8 w-20 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 sm:mr-20 mr-5"
                value={value}
              />
              {/* Replace Id By Username from icoming api request */}
              <Trash onClick={() => removeUser(id)} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end flex-col gap-1 ml-auto w-fit mt-4">
        <h3 className="flex gap-1 items-center">
          Paying Out:
          <Diamond /> {Number(value).toLocaleString("en-Us")}
        </h3>
        {coins - +value < 0 ? (
          <span className="font-bold text-red-700 capitalize">
            invalid value
          </span>
        ) : (
          <>
            <h6 className="flex gap-1 items-center">
              Remainig Funds:
              <Diamond />
              <b>{(coins - +value).toLocaleString("en-Us")}</b>
            </h6>
            <Button
              onClick={() => {
                setCoins(coins - +value);
                toast.custom(
                  ({ visible }) => (
                    <AnimatePresence>
                      {visible && (
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          exit={{ scaleY: 0 }}
                          className="bg-green-600 text origin-top p-2 text-white sm:top-10 top-5 sm:w-[50%] w-[90%] text-center max-sm:text-sm"
                        >
                          {Number(value).toLocaleString("en-Us")} roblox Were
                          Paid Out To Users From The Group
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ),
                  {
                    duration: 3_000,
                  },
                );
                removeUser(id);
              }}
              className={`p-2 mb-2`}
            >
              Distribute
            </Button>
          </>
        )}
      </div>
    </>
  );
}

const UserItemSkeleton = () => {
  return (
    <div className="flex gap-4 items-center p-2 animate-pulse">
      <div className="min-w-14 size-14 rounded-full bg-gray-300" />

      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-gray-300 rounded" />

          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>

        <div className="h-5 w-5 bg-gray-300 rounded" />
      </div>
    </div>
  );
};
export default User;
User.RecipentUser = RecipentUser;
User.Skeleton = UserItemSkeleton;
