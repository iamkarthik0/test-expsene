import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export async function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
      className="flex flex-col items-center justify-center gap-4"
    >
      <Button 
        type="submit"
        size="lg"
        className="flex items-center gap-2"
      >
        <Image
          src="/google.png"
          alt="Google logo" 
          width={20}
          height={20}
        />
        Sign in with Google
      </Button>
    </form>
  );
}
