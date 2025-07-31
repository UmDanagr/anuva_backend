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

// Function to verify a phone number with Twilio
export const verifyPhoneNumber = async (phoneNumber: string) => {
  if (!isTwilioConfigured() || !twilioClient) {
    throw new Error("Twilio not configured");
  }

  try {
    // Create a verification using Twilio Verify service
    const verification = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({
        to: phoneNumber,
        channel: "sms",
      });

    console.log(`📱 Verification code sent to ${phoneNumber}`);
    return {
      success: true,
      message: `Verification code sent to ${phoneNumber}`,
      sid: verification.sid,
    };
  } catch (error: any) {
    console.error("Phone verification error:", error);
    throw new Error(`Failed to send verification code: ${error.message}`);
  }
};

// Function to check verification code
export const checkVerificationCode = async (
  phoneNumber: string,
  code: string
) => {
  if (!isTwilioConfigured() || !twilioClient) {
    throw new Error("Twilio not configured");
  }

  try {
    const verificationCheck = await twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to: phoneNumber,
        code: code,
      });

    if (verificationCheck.status === "approved") {
      return {
        success: true,
        message: "Phone number verified successfully",
        verified: true,
      };
    } else {
      return {
        success: false,
        message: "Invalid verification code",
        verified: false,
      };
    }
  } catch (error: any) {
    console.error("Verification check error:", error);
    throw new Error(`Failed to verify code: ${error.message}`);
  }
};

// Function to check if a number is verified (for trial accounts)
export const isNumberVerified = async (phoneNumber: string) => {
  if (!isTwilioConfigured() || !twilioClient) {
    return false;
  }

  try {
    // For trial accounts, you need to verify numbers manually
    // This is a simplified check - in production you'd store verified numbers in your database
    console.log(`🔍 Checking if ${phoneNumber} is verified...`);
    return false; // Default to false for trial accounts
  } catch (error) {
    console.error("Error checking number verification:", error);
    return false;
  }
};

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
        `Trial account restriction: The number ${to} is not verified. Please verify it at https://console.twilio.com/us1/develop/phone-numbers/manage/verified or upgrade to a paid account.`
      );
    } else if (error.code === 21661) {
      throw new Error(
        "Your Twilio phone number is not SMS-capable. Please purchase an SMS-enabled phone number from your Twilio Console."
      );
    } else {
      throw new Error(`SMS sending failed: ${error.message}`);
    }
  }
};
