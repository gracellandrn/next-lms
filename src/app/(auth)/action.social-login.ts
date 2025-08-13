"use server";

import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { google } from "@/utils/arctic";

export async function loginWithGoogleAction(_: FormData) {
  const state = generateState();
  const code = generateCodeVerifier();
  const scopes = ["profile", "email"];

  const cookieStore = await cookies();
  cookieStore.set("code", code);

  const url = google.createAuthorizationURL(state, code, scopes);

  redirect(url.href);
}
