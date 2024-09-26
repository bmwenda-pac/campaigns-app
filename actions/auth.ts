"use server";

import { githubOAuthClient } from "@/lib/githubOAuth";
import { microsoftOAuthClient } from "@/lib/microsoftOAuth";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";

export const getMicrosoftOAuthConsentUrl = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    cookies().set("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const authUrl = await microsoftOAuthClient.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ["User.Read"],
      },
    );

    return { success: true, url: authUrl.toString() };
  } catch (error) {
    return { success: true, error: "Something went wrong" };
  }
};

export const getGithubOAuthConsentUrl = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    cookies().set("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const authUrl = await githubOAuthClient.createAuthorizationURL(state, {
      scopes: ["read:user"],
    });

    return { success: true, url: authUrl.toString() };
  } catch (error) {
    return { success: false, error: "Something went wrong" };
  }
};
