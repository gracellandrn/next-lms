"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import Link from "next/link";
import { useActionState } from "react";

import { SocialLogin } from "../_components/social-login";
import { loginAction } from "./action";

export default function Page() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className="space-y-6">
      <section>
        <h3>Login</h3>
        <p>Welcome back!</p>
      </section>
      <form action={action} className="space-y-2">
        <Input
          name="email"
          placeholder="Email"
          defaultValue={state?.data?.email}
        />
        {state?.status === "error" && state.errors?.email ? (
          <div className="msg msg-error">{state.errors.email}</div>
        ) : null}
        <Input
          name="password"
          placeholder="Password"
          type="password"
          defaultValue={state?.data?.password}
        />
        {state?.status === "error" && state.errors?.password ? (
          <div className="msg msg-error">{state.errors.password}</div>
        ) : null}
        <Button
          type="submit"
          disabled={pending}
          color="primary"
          className="w-full"
        >
          Login
        </Button>
        {state?.status === "error" && state.message ? (
          <div className="msg msg-error">{state.message}</div>
        ) : null}
        {state?.status === "success" && state.message ? (
          <div className="msg msg-success">{state.message}</div>
        ) : null}
      </form>
      <SocialLogin />
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
