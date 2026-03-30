import type { DialogUser } from "@/types";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import User from "./User";

const UsersDialog = ({
  filterdUsers,
  foundedUser,
  isLoading,
  setUsername,
  username,
  isPending,
  data,
  debouncedValue,
}: DialogUser) => {
  return (
    <>
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
            <section className="h-70 overflow-y-scroll">
              {username.length > 0
                ? filterdUsers.slice(0, 3).map((u) => <User {...u} />)
                : null}
              {isPending || isLoading ? (
                <>
                  <User.Skeleton />
                  <User.Skeleton />
                </>
              ) : (
                <>
                  {debouncedValue && data?.data! ? (
                    <>
                      <User {...foundedUser} />
                    </>
                  ) : !filterdUsers.length ? (
                    <h4 className="text-center my-4 text-lg capitalize">
                      Can not found this user
                    </h4>
                  ) : null}
                </>
              )}
            </section>
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
    </>
  );
};

export default UsersDialog;
