import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { ChevronRight } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";
import { useUsersStore } from "../stores/users.store";
import User from "./User";
import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../service/users.service";
import type { ResponseType } from "../types";
import fakeUsers from "../data/users.json";
const UsersDialog = lazy(() => import("./UsersDialog"));
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
  const { debouncedValue, isPending, isReady } = useDebounce(username, 1500);
  useEffect(() => {
    if (!debouncedValue) return;
  }, [debouncedValue]);
  useEffect(() => () => setUsername(""), []);
  const { users } = useUsersStore();
  const { data, isLoading } = useQuery<ResponseType>({
    queryKey: ["users", debouncedValue],
    queryFn: () => searchUsers(debouncedValue),
    enabled: !!debouncedValue && isReady,
    retry: false,
  });
  const foundedUser = useMemo(() => {
    return { ...data!?.data, userImg: data?.avatarImg.data[0].imageUrl! };
  }, [data]);
  const filterdUsers = useMemo(
    () =>
      fakeUsers.filter((user) =>
        user.name.toLowerCase().includes(username.toLowerCase()),
      ),
    [username],
  );
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
              <Suspense fallback={<>Dialog Is Loading.. </>}>
                <UsersDialog
                  data={data!}
                  debouncedValue={debouncedValue}
                  filterdUsers={filterdUsers}
                  foundedUser={foundedUser}
                  isLoading={isLoading}
                  isPending={isPending}
                  setUsername={setUsername}
                  username={username}
                />
              </Suspense>
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
