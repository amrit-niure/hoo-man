import { authClient } from "./auth-client";

export async function getClientSession() {
  const session = await authClient.getSession();
  return session;
}