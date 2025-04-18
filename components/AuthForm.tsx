"use client";

import { toast } from "sonner";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { loginAction, signAction } from "@/actions/users";

type Props = {
  type: "login" | "signUp";
};

function AuthForm({ type }: Props) {

  const isLoginForm = type == "login";

  const router = useRouter();

  const [isPending, startTrasition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    
    startTrasition(async () =>  {
      
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (isLoginForm) {
        const { error } = await loginAction(email, password);

        
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Login successful");
          router.replace("/");
        }
      } else {
        const { error } = await signAction(email, password);

        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Sign up successful");
          router.replace("/");
        }
      }
    })
  };

  return (
    <form action={handleSubmit}>
     <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter you email"
            required
            disabled={isPending}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="Enter you password"
            required
            disabled={isPending}
          />
        </div>

        <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full">
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="text-xs">
          {isLoginForm
            ? "Don't have an account yet?"
            : "Already have an account?"}{" "}
          <Link
            href={isLoginForm ? "/sign-up" : "/login"}
            className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-50" : ""}`}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>

      </CardContent>
    </form>
  );
}

export default AuthForm;
