import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";

export default function Page() {
  return (
    <div className="space-y-6">
      <section>
        <h3>Register</h3>
        <p>Create an account to get started</p>
      </section>
      <form className="space-y-2">
        <Input name="name" placeholder="Name" />
        <Input name="email" placeholder="Email" />
        <Input name="password" placeholder="Password" type="passwprd" />
        <Button color="primary" className="w-full">
          Register
        </Button>
      </form>
      <section>
        <p>
          Have an account?{" "}
          <Link href="login" className="text-blue-700">
            Login
          </Link>
        </p>
      </section>
    </div>
  );
}
