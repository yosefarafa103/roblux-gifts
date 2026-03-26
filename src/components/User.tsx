import { useUsersStore, type User as UserType } from "../stores/users.store";
import { Diamond, DiamondIcon, Plus, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCoins } from "../context/coins.context";

function User({ id, name }: UserType) {
  const { users, addUser, removeUser } = useUsersStore();
  const isExists = useMemo(() => {
    return !!users.find((user) => user.id === id);
  }, [users, id]);
  return (
    <>
      <div
        onClick={() => {
          if (isExists) return;
          addUser({ id, name });
        }}
        className="flex gap-4 items-center hover:bg-[#f7f7f7] p-2 transition cursor-pointer"
      >
        <img src="" className="min-w-14 size-14! rounded-full" loading="lazy" />
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col gap-0.5">
            <h5 className="text-lg">
              {id} {name}
            </h5>
            <span className="text-gray-500">Member</span>
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

export function RecipentUser({ name, id }: UserType) {
  const [value, setValue] = useState("");
  const { coins, setCoins } = useCoins();
  const { removeUser } = useUsersStore();
  return (
    <>
      <div className="p-2 bg-white">
        <div className="flex gap-4 items-center p-2 transition cursor-pointer">
          <img
            src=""
            className="min-w-14 size-14! rounded-full"
            loading="lazy"
          />
          <div className="flex justify-between w-full items-center">
            <div className="flex flex-col gap-0.5">
              <h5 className="text-lg">{name}</h5>
              <span className="text-gray-500">Member</span>
            </div>
            <div className="flex items-center gap-4">
              <DiamondIcon />
              <Input
                onChange={(e) => setValue(e.target.value)}
                type="number"
                className="w-30"
              />
              <Trash onClick={() => removeUser(id)} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end flex-col gap-1 ml-auto w-fit mt-4">
        <h3 className="flex gap-1 items-center">
          Paying Out:
          <Diamond /> {value}
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
              }}
              className={`p-2`}
            >
              Distribute
            </Button>
          </>
        )}
      </div>
    </>
  );
}
export default User;
User.RecipentUser = RecipentUser;
