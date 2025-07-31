import twilio from "twilio";

// Check if Twilio credentials are available
const isTwilioConfigured = () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const phoneNumber = process.env.TWILIO_PHONE;

  // Check if all required variables exist and are not empty
  if (!accountSid || !authToken || !phoneNumber) {
    return false;
  }

  // Validate Account SID format (should start with 'AC')
  if (!accountSid.startsWith("AC")) {
    console.warn(
      "⚠️  Invalid TWILIO_ACCOUNT_SID format. Account SID should start with 'AC'"
    );
    return false;
  }

  return true;
};

let twilioClient: any = null;

// Only initialize Twilio client if credentials are available
if (isTwilioConfigured()) {
  try {
    twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    console.log("✅ Twilio client initialized successfully");
  } catch (error) {
    console.error("❌ Failed to initialize Twilio client:", error);
    twilioClient = null;
  }
} else {
  console.warn(
    "⚠️  Twilio credentials not configured. SMS functionality will be disabled."
  );
  console.warn("Please set the following environment variables:");
  console.warn("- TWILIO_ACCOUNT_SID (should start with 'AC')");
  console.warn("- TWILIO_AUTH_TOKEN");
  console.warn("- TWILIO_PHONE");
}

export const sendSMS = async (to: string, message: string) => {
  // Check if Twilio is configured
  if (!isTwilioConfigured()) {
    throw new Error(
      "Twilio credentials not configured. Please set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE environment variables."
    );
  }

  if (!twilioClient) {
    throw new Error(
      "Twilio client not initialized. Please check your Twilio credentials."
    );
  }

  try {
    const sms = await twilioClient.messages.create({
      to,
      from: process.env.TWILIO_PHONE,
      body: message,
    });

    return sms;
  } catch (error: any) {
    console.error("Twilio SMS Error:", {
      status: error.status,
      code: error.code,
      message: error.message,
      moreInfo: error.moreInfo,
    });

    // Provide more specific error messages based on common Twilio errors
    if (error.code === 20003) {
      throw new Error(
        "Twilio authentication failed. Please check your TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN."
      );
    } else if (error.code === 21211) {
      throw new Error(
        "Invalid phone number format. Please provide a valid phone number."
      );
    } else if (error.code === 21608) {
      throw new Error(
        "Invalid Twilio phone number. Please check your TWILIO_PHONE_NUMBER."
      );
    } else {
      throw new Error(`SMS sending failed: ${error.message}`);
    }
  }
};
