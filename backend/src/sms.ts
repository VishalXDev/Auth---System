import pino from 'pino';
import { env } from './env';

const log = pino({ name: 'sms' });

/**
 * DEV SMS sender (replace with Twilio/MSG91 in production)
 */
export async function sendOtpSms(phone: string, code: string) {
  if (env.NODE_ENV === 'development') {
    log.info({ phone, code }, 'DEV_SMS_SEND');
  } else {
    // TODO: integrate real SMS provider here
    log.info({ phone }, 'SMS_SENT (redacted code)');
  }

  // Simulate async I/O
  return true;
}
