import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";

export default function Page() {
  return (
    <div className="space-y-6">
      <section>
        <h3>Login</h3>
        <p>Welcome back!</p>
      </section>
      <form className="space-y-2">
        <Input name="email" placeholder="Email" />
        <Input name="password" placeholder="Password" type="passwprd" />
        <Button color="primary" className="w-full">
          Login
        </Button>
      </form>
      <section>
        <p>
          Don&apos;t have an account?{" "}
          <Link href="register" className="text-blue-700">
            Register
          </Link>
        </p>
      </section>
    </div>
  );
}
