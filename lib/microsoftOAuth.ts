import { MicrosoftEntraId } from "arctic";

export const microsoftOAuthClient = new MicrosoftEntraId(
  process.env.MICROSOFT_TENANT_ID!,
  process.env.MICROSOFT_CLIENT_ID!,
  process.env.MICROSOFT_CLIENT_SECRET!,
  process.env.NEXT_PUBLIC_URL + "/api/auth/microsoft/callback",
);
