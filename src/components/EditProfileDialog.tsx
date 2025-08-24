import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MdEdit } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { useProfileUpdateMutation } from "@/redux/feature/authApi";
import toast from "react-hot-toast";

interface EditProfileDialogProps {
  currentName: string;
  currentPhone: string;
}

export default function EditProfileDialog({ currentName, currentPhone }: EditProfileDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(currentName || "");
  const [phone, setPhone] = useState(currentPhone || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateProfile] = useProfileUpdateMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated profile:", { name, phone, oldPassword, newPassword });
    try {
      await updateProfile({ name, phone, oldPassword, newPassword }).unwrap();
      setOpen(false);
      toast.success("Profile updated successfully");
    } catch (error:any) {
      toast.error(error.data.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setOpen(true)} className="absolute top-4 right-4 bg-primary p-2 rounded-full hover:bg-primary/80 transition cursor-pointer">
          <MdEdit size={20} color="black" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
        <DialogHeader>
          <div className="flex justify-between items-center w-full">
            <DialogTitle className="text-2xl">Edit Profile</DialogTitle>
            <DialogClose className="bg-primary p-2 rounded-full cursor-pointer">
              <CgClose size={20} color="black" />
            </DialogClose>
          </div>
        </DialogHeader>

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-lg font-medium">Name</label>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="rounded-md h-10 md:h-12" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-lg font-medium">Phone</label>
            <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone" className="rounded-md h-10 md:h-12" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-lg font-medium">Old Password</label>
            <Input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Enter old password" className="rounded-md h-10 md:h-12" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm md:text-lg font-medium">New Password</label>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter new password" className="rounded-md h-10 md:h-12" />
          </div>

          <DialogFooter className="pt-4">
            <button type="submit" className="w-full cursor-pointer bg-primary py-2 rounded-md text-black">
              Save Changes
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
