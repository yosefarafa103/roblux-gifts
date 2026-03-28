import { useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ChevronRight } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";
// @ts-ignore
import { useUsersStore, type User as UserType } from "../stores/users.store";
import User from "./User";
import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../service/users.service";
import type { ResponseType } from "../types";

const NavigationSection = () => {
  const tabs = [
    "informations",
    "settings",
    "social links",
    "revenue",
    "members",
    "roles",
    "affiliates",
  ];
  const [username, setUsername] = useState("");
  const { debouncedValue, isPending, isReady } = useDebounce(username, 1000);
  useEffect(() => {
    if (!debouncedValue) return;
  }, [debouncedValue]);

  const { users } = useUsersStore();
  // @ts-ignore
  const { data, isLoading, isError, error } = useQuery<ResponseType>({
    queryKey: ["users", debouncedValue],
    queryFn: () => searchUsers(debouncedValue),
    enabled: !!debouncedValue && isReady,
    retry: false,
  });
  const foundedUser = useMemo(() => {
    return { ...data!?.data, userImg: data?.avatarImg.data[0].imageUrl! };
  }, [data]);
  const [activeTab, setActiveTab] = useState("informations");
  return (
    <div className="sm:flex gap-10 mt-5">
      <div className="flex-1">
        <div className="flex flex-col bg-white">
          {tabs.map((el, i) => (
            <div
              key={el}
              onClick={() => setActiveTab(el)}
              className={`relative capitalize cursor-pointer px-3 py-4 transition 
                ${
                  activeTab === el
                    ? "bg-gray-200 font-semibold"
                    : "hover:bg-[#f7f7f7]"
                }`}
            >
              <div className="flex">
                {activeTab === el && (
                  <span className="absolute left-0 top-0 h-full w-1 flex bg-black rounded-r-md" />
                )}
                {[3, 6].includes(i) ? (
                  <div className="flex justify-between w-full">
                    {el}
                    <ChevronRight />
                  </div>
                ) : (
                  el
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-sm:flex-3 max-sm:mt-5 flex-5">
        {tabs.indexOf(activeTab) !== 3 ? (
          "working on this page.."
        ) : (
          <>
            <div className="flex">
              <div className="font-semibold bg-white flex-1 p-2 text-center">
                Recurring Payout
              </div>
              <div className="font-semibold bg-white flex-1 p-2 border-b-black border-b-2 text-center">
                One Time-Payout
              </div>
            </div>
            <h4 className="my-2 font-semibold text-lg">One Time-Payout</h4>
            <div className="flex gap-1 items-center">
              <div>Distributing Robux By</div>
              <>
                <Select>
                  <SelectTrigger className="border-2 border-gray-500">
                    Amount
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="by_roblux">By Robux</SelectItem>
                    <SelectItem value="by_coins">By Coins</SelectItem>
                  </SelectContent>
                </Select>
              </>
            </div>
            <section>
              <Dialog>
                <DialogTrigger className="flex flex-col">
                  <Button size="lg" variant={"outline"}>
                    Add Payout Recipents
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-none p-3 min-h-125 flex flex-col lg:min-w-120">
                  <DialogTitle className="border-b-2 py-3 border-[#ddd] h-fit">
                    Add Payout Recipents
                  </DialogTitle>
                  <section className="flex flex-col gap-2">
                    <h3 className="text-gray-500">
                      Enter the payout recipient's username
                    </h3>
                    <Input
                      placeholder="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="p-4"
                    />
                    {isPending || isLoading ? (
                      <>
                        <User.Skeleton />
                        <User.Skeleton />
                        <User.Skeleton />
                      </>
                    ) : (
                      <section className="h-70 overflow-y-scroll">
                        {debouncedValue && data?.data! ? (
                          <User {...foundedUser} />
                        ) : (
                          <h4>Can not found this user</h4>
                        )}
                      </section>
                    )}
                  </section>
                  <section className="absolute bottom-0 p-4 left-1/2 -translate-x-1/2 gap-2 flex">
                    <DialogClose className="px-5 py-2 rounded-md border-gray-400 bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50">
                      Ok
                    </DialogClose>
                    <DialogClose className="px-5 py-2 rounded-md bg-primary text-primary-foreground [a]:hover:bg-primary/80">
                      cancel
                    </DialogClose>
                  </section>
                </DialogContent>
              </Dialog>
              <section className="mt-4">
                {users.map((el) => (
                  <User.RecipentUser {...el} />
                ))}
              </section>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default NavigationSection;
