const nodemailer = require("nodemailer");
import { OAuth2Client } from "google-auth-library";

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`;
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;

// send mail
const sendEmail = async (to: string, url: string, txt: string) => {
  const oAuth2Client = new OAuth2Client(
    CLIENT_ID,
    CLIENT_SECRET,
    OAUTH_PLAYGROUND
  );

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  try {
    const access_token = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_MAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        access_token,
      },
    });

    const mailOptions = {
      from: SENDER_MAIL,
      to: to,
      subject: txt,
      html: `
              <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
              <h2 style="text-align: center; text-transform: uppercase;color: black;">DevBlog xin chào !</h2>
              <p style="text-align: center">Chào mừng bạn đến với Blog Chia sẻ kiến thức, nơi chia sẻ những kiến thức hay và bổ ích <br/>
              vui lòng nhấp vào nút bên dưới :
              </p>
              <div style="display: flex; align-item: center">
              <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 0 auto; display: inline-block;">${txt}</a>
              </div>
          
              <p>Hoặc bạn có thể nhấp vào link bên dưới :</p>
          
              <div>${url}</div>
              </div>
            `,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export default sendEmail;