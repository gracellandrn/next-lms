import { Button } from "@heroui/button";

import { loginWithGoogleAction } from "../action.social-login";

export const SocialLogin = () => {
  return (
    <form action={loginWithGoogleAction}>
      <Button className="w-full" variant="ghost" type="submit">
        Continue with Google
      </Button>
    </form>
  );
};
