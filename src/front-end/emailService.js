import emailjs from "emailjs-com";

emailjs.init("zQwGM3eQ6YV6nOX9V");

export const sendConfirmationEmail = async (userEmail, orderDetails) => {
  try {
    const templateParams = {
      to_email: userEmail,
      order_details: JSON.stringify(orderDetails),
    };

    const emailResponse = await emailjs.send(
      "service_4iz8852",
      "template_tx59ouwm",
      templateParams,
      "zQwGM3eQ6YV6nOX9V"
    );

    console.log("Email sent", emailResponse);
  } catch (error) {
    console.error("Error sending email", error);
  }
};
