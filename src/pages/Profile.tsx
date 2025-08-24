import EditProfileDialog from "@/components/EditProfileDialog";
import { useUserData } from "@/components/useUserData";
import { Loader } from "lucide-react";

function Profile() {
  const { userData, isLoading } = useUserData();

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader className="animate-spin w-8 h-8 text-primary" />
      </div>
    );

  return (
    <div className="flex justify-center items-center min-h-[80vh] md:px-4">
      <div className="relative w-full max-w-lg shadow-lg rounded-2xl p-8 border">

        <EditProfileDialog
          currentName={userData?.user?.name || ""}
          currentPhone={userData?.user?.phone || ""}
        />
        
        <div className="flex flex-col items-center gap-3 mt-4">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary text-black text-3xl font-bold uppercase">
            {userData?.user?.name?.slice(0, 2)}
          </div>
          <h2 className="text-2xl font-semibold capitalize">{userData?.user?.name}</h2>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Email</span>
            <span>{userData?.user?.email}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Phone</span>
            <span>{userData?.user?.phone ?? "Not added"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Role</span>
            <span>{userData?.user?.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
