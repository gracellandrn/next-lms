import { resend } from "@/utils/resend";

import { userService } from "./user.services";

//object
export const emailServices = {
  //async
  sendVerificationCode: async (userId: string, code: string) => {
    const user = await userService.findUser(userId);

    //resend.emails.send
    if (user) {
      const { data, error } = await resend.emails.send({
        from: "Gracella <admission@gracedr.my.id>",
        to: [user.email],
        subject: "Verify your account to LMS",
        html: `<p>Click following link to verify <a href="http://localhost:3000/verify?user=${userId}&code=${code}">Verify My Account</a></p>`,
      });

      console.log({ data, error });
    }
  },
};
//from
//to
//subject
//html
