const twilio = require("twilio");

const accountSid = "ACafcb17e87bbb285724c89b0980c6d089";
const authToken = "75f02a1f689e0fb5b5ef6b644ada21a1";

const PHONE_NUMBER = +13613104553;

const sendSms = async (phone, otp) => {
    try {
        const client = new twilio(accountSid, authToken);
        const message = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: PHONE_NUMBER,
        to: phone,
        });
        return message;
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendSms;
