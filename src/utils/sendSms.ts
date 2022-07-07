import axios from "axios";
export const sendSms = async (numbers: string, sms: string) => {
  try {
    const res = await axios.get(
      `https://sms.arkesel.com/sms/api?action=send-sms&api_key=${process.env.SMS_KEY}&to=${numbers}&from=ACSESUMaT&sms=${sms}`
    );
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
