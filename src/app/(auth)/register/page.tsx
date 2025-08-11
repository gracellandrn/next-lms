"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";
import { useActionState } from "react";

import { registerAction } from "./action";

export default function Page() {
  const [state, formAction, pending] = useActionState(registerAction, null);
  console.log(state);

  return (
    <div className="space-y-6">
      <section>
        <h3>Register</h3>
        <p>Create an account to get started</p>
      </section>
      <form className="space-y-2" action={formAction}>
        <Input
          name="name"
          placeholder="Name"
          required
          defaultValue={state?.data?.name}
        />
        {state?.status === "error" && state.errors?.name ? (
          <div className="msg msg-error">{state.errors.name}</div>
        ) : null}
        <Input
          name="email"
          placeholder="Email"
          type="email"
          required
          defaultValue={state?.data?.email}
        />
        {state?.status === "error" && state.errors?.email ? (
          <div className="msg msg-error">{state.errors.email}</div>
        ) : null}
        <Input
          name="password"
          placeholder="Password"
          type="password"
          required
          defaultValue={state?.data?.password}
        />
        {state?.status === "error" && state.errors?.password ? (
          <div className="msg msg-error">{state.errors.password}</div>
        ) : null}
        <Button
          disabled={pending}
          type="submit"
          color="primary"
          className="w-full"
        >
          Register
        </Button>
        {state?.status === "success" ? (
          <div className="msg msg-success">{state.message}</div>
        ) : null}
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
