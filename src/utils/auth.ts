import {
  handleIncomingRedirect,
  login,
} from "@inrupt/solid-client-authn-browser";

// ...

export async function completeLogin() {
  await handleIncomingRedirect({ restorePreviousSession: true });
}

export class Auth {
//   private static callbackURL: string = "/callback";
  //   constructor() {}

  static async completeLogin() {
    await handleIncomingRedirect({ restorePreviousSession: true });
  }

  static async login(oidcIssuer: string) {
    await login({
      oidcIssuer: oidcIssuer,
      redirectUrl: new URL("/callback", window.location.href).toString(),
      clientName: "Peditor",
    });
  }
}
