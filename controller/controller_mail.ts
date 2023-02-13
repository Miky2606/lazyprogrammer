import nodemailer from "nodemailer";

export interface IMail {
  fromMail: string;
  toMail: string;
  subject: string;
  message: string;
}

const emailBody = (body: string): string => {
  return `<p class="description">${body}</p>

`;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "jonathanjgn99@gmail.com",
    pass: "ctdoxvxgqvuxlcbn",
  },
});

export const sendMail = (mail: IMail) => {
  let options = {
    from: mail.fromMail,
    to: mail.toMail,
    subject: mail.subject,
    html: emailBody(mail.message),
  };
  transporter.sendMail(options, (error) => {
    if (error) return error;
    return "Mail sent";
  });
};
