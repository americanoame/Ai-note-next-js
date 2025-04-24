"use client";
import { useState } from "react";
import {Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter} from "next/navigation"
import { logOutAction } from "@/actions/users";






const LogOut = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogOut = async () => {
    setLoading(true);

    const { error } = await logOutAction();


    if (!error) {
        toast.success("Logged out successfully.");
        router.push("/")
      } else {
        
        toast.error("Failed to log out. Please try again.");
      }

    setLoading(false);
  };

  return (
    <Button variant="outline" onClick={handleLogOut} disabled={loading} className="w-24">
      {loading ? <Loader2 className="animate-spin" /> : "Log Out"}
    </Button>
  );
};

export default LogOut;
