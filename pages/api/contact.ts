import nodemailer, { SentMessageInfo } from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

const applyXSSprotection: (text: string) => string = (text: string) => {
  return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

const port: number = parseInt(process.env.MAIL_PORT) || 587;
const hostname: string = process.env.MAIL_HOSTNAME;
const mail: string = process.env.MAIL_USER_NAME;
const pass: string = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
  host: hostname,
  port: port,
  secure: true,
  requireTLS: true,
  auth: {
    user: mail,
    pass: pass,
  },
  logger: true,
});

const SEND = async (
  user_mail: string,
  subject: string,
  message: string,
  name: string,
  surname: string,
  customInformation: string
): Promise<SentMessageInfo> => {
  return await transporter.sendMail({
    from: mail,
    to: mail,
    subject,
    text: message,
    html: `
      <h2>Sie haben eine Nachricht von <strong>${applyXSSprotection(
        name
      )} ${applyXSSprotection(surname)}</strong> erhalten!</h2>
      <p>Diese Nachricht wurde über die Webseite des JOA versendet!</p>
      <h3>Email zur Kontaktaufnahme:</h3>
      <a href="mailto: ${applyXSSprotection(user_mail)}">${applyXSSprotection(
      user_mail
    )}</a>
      </br> 
      <h3>Nachricht:</h3>
      <p>${applyXSSprotection(message)}</p>
      <br/><br/>
    `.concat(applyXSSprotection(customInformation)),
  });
};

const HANDLER = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    POST(req, res);
  }

  res.json({
    status: 404,
    message: "YOUR METHOD IS NOT ALLOWED HERE!",
  });
};

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  let data: {
    first_name: string;
    last_name: string;
    subject: string;
    email: string;
    text: string;
    other: string;
  } = {
    first_name: "",
    last_name: "",
    subject: "",
    email: "",
    text: "",
    other: "",
  };

  try {
    data = req.body;
  } catch (e) {
    res.json({
      status: 403,
      message: "WRONG DATA FORMAT!",
    });
    return;
  }

  let receiver_mail: string = data.email;
  let subject: string = data.subject;
  let message: string = data.text;
  let name: string = data.first_name;
  let surname: string = data.last_name;
  let customInformation: string = `
    <h3>Zusatzinformationen</h3>
    <br/>
    <p>${data.other}</p>
  `;

  // Send Mail and respond
  let respondStatus = 200;
  let respondMessage =
    "Ihre Nachricht wurde erfolgreich versendet und wir werden uns schnellstmöglich bei Ihnen melden.";
  const info: SentMessageInfo = await SEND(
    receiver_mail,
    subject,
    message,
    name,
    surname,
    customInformation
  );

  if (!info.response.includes("250")) {
    respondStatus = 404;
    respondMessage =
      "Ihre Nachricht konnte aus technischen Gründen leider nicht zugestellt werden. Sollte dieser Fehler erneut auftreten kontaktieren Sie bitte direkt den Betreiber der Website!";
  }

  res.json({
    status: respondStatus,
    message: respondMessage,
  });
};

export default HANDLER;
