import { useState } from "react";
import { useAllUsersQuery, useUserStatusMutation } from "@/redux/feature/userApi";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import toast from "react-hot-toast";

function Users() {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, refetch, isLoading } = useAllUsersQuery({ page, limit, role: "user" });
  const [updateUserStatus] = useUserStatusMutation();

  const users = data?.data?.data || [];
  const pagination = data?.data?.pagination;

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const HandelStatusChange = (user: any) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const confirmAction = async () => {
    if (selectedUser) {
      await updateUserStatus({
        userId: selectedUser._id,
        status: !selectedUser.isBlocked,
      }).unwrap();
      toast.success("User status updated successfully");
    }
    refetch();
    setOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center w-full md:p-6 justify-center">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Users</h1>

      <div className="overflow-x-auto p-4 w-full">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="p-3 border-b">Name</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Phone</th>
              <th className="p-3 border-b">Role</th>
              <th className="p-3 border-b">Created At</th>
              <th className="p-3 border-b">Is Blocked</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user: any) => (
                <tr key={user._id} className="text-center hover:bg-primary/10 transition-all">
                  <td className="p-3 border-b capitalize">{user.name}</td>
                  <td className="p-3 border-b">{user.email}</td>
                  <td className="p-3 border-b">{user.phone}</td>
                  <td className="p-3 border-b capitalize">{user.role}</td>
                  <td className="p-3 border-b">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 border-b">
                    <Button
                      onClick={() => HandelStatusChange(user)}
                      className={user.isBlocked ? "bg-red-500 hover:bg-red-800 text-white cursor-pointer" : "bg-green-600 hover;bg-green-800 text-white cursor-pointer"}
                    >
                      {user.isBlocked ? "Yes" : "No"}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4 border">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination?.totalPages > 1 && (
        <div className="flex gap-4 mt-4 items-center">
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} className="px-4 py-2 bg-primary rounded disabled:opacity-50">
            Prev
          </button>
          <span className="px-2">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => (prev < pagination.totalPages ? prev + 1 : prev))}
            disabled={page === pagination.totalPages}
            className="px-4 py-2 bg-primary rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}


      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>{selectedUser?.isBlocked ? `Do you want to unblock ${selectedUser?.name}?` : `Do you want to block ${selectedUser?.name}?`}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setOpen(false)} className="cursor-pointer">
              Cancel
            </Button>
            <Button
              onClick={confirmAction}
              className={selectedUser?.isBlocked ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer" : "bg-red-600 hover:bg-red-700 text-white cursor-pointer"}
            >
              {selectedUser?.isBlocked ? "Unblock" : "Block"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Users;
