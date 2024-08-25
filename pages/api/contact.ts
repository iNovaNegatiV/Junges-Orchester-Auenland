import nodemailer, { SentMessageInfo } from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

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
      <h2>Sie haben eine Nachricht von <strong>${name} ${surname}</strong> erhalten!</h2>
      <p>Diese Nachricht wurde über die Webseite des JOA versendet!</p>
      <h3>Email zur Kontaktaufnahme:</h3>
      <p>${user_mail}</p>
      </br> 
      <h3>Nachricht:</h3>
      <p>${message}</p>
      <br/><br/>
    `.concat(customInformation),
    headers: { "x-myheader": "test header" },
  });
};

const HANDLER = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    POST(req, res);
  }
};

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const data: { [key: string]: string } = req.body;

  let receiver_mail: string = "";
  let subject: string = "";
  let message: string = "";
  let name: string = "";
  let surname: string = "";
  let customInformation: string = "<h3>Zusatzinformationen</h3>";

  for (const [key, value] of Object.entries(data)) {
    if (key.includes("subject_")) {
      subject = value;
    } else if (key.includes("mail_")) {
      receiver_mail = value;
    } else if (key.includes("text_")) {
      message = value;
    } else if (key.includes("surname_")) {
      surname = value;
    } else if (key.includes("name_")) {
      name = value;
    } else {
      customInformation.concat(`<br/><br/><h3>${key}</h3><br/><p>${value}</p>`);
    }
  }

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
