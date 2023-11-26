const { PrismaClient } = require("@prisma/client"),
  { google } = require('googleapis'),
  prisma = new PrismaClient(),
  jwt = require("jsonwebtoken"),
  { Oauth2, authorizationUrl } = require("../utils/Oauth");

module.exports = {
  loginGoogle: (req, res) => {
    res.redirect(authorizationUrl);
  },
  callbackLogin: async (req, res) => {
    const {code}= req.query;
    const {tokens} = await Oauth2.getToken(code)
    Oauth2.setCredentials(tokens)
    

    console.log(code)

    const oauth2 = google.oauth2({
      auth: Oauth2,
      version: "v2",
    });
    const {data} = await oauth2.userinfo.get();
    if (!data) {
      return res.json({
        data: data,
      });
    }

    let user = await prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      user = await prisma.users.create({
        data :{
            username: data.name,
            email: data.email,
        }
      });
    }
    user = await prisma.users.findFirst({
      where: {
        email: data.email,
      },
    });

    const token = jwt.sign({ id: user.id }, "secret_key", {
      expiresIn: "6h",
    });

    return res.status(200).json({
      data: {
        token,
      },
    });
  },
};
