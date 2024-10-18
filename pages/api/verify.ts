import type { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";
import { PublicRuntimeConfig } from "../../types/PublicRuntimeConfigType";

const verifyEndpoint = "https://www.google.com/recaptcha/api/siteverify";

const HANDLER = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    POST(req, res);
  }
};

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { publicRuntimeConfig }: { publicRuntimeConfig: PublicRuntimeConfig } =
    getConfig();
  const captcha = req.body.captcha;
  const captchaResponse = await fetch(verifyEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      secret: publicRuntimeConfig.recaptchaSecretKey,
      response: captcha,
    }),
  }).then((res) => res.json());

  if (!captchaResponse.success) {
    return res
      .status(500)
      .json({ status: "error", error: captchaResponse["error-codes"][0] });
  }
  res.status(200).json({ status: "ok" });
};

export default HANDLER;
