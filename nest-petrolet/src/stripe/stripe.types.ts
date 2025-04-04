export type StripeErrorType =
  | 'api_error'
  | 'card_error'
  | 'idempotency_error'
  | 'invalid_request_error';

// switch (err.type) {
//   case 'StripeCardError':
//     // A declined card error
//     err.message; // => e.g. "Your card's expiration year is invalid."
//     break;
//   case 'StripeRateLimitError':
//     // Too many requests made to the API too quickly
//     break;
//   case 'StripeInvalidRequestError':
//     // Invalid parameters were supplied to Stripe's API
//     break;
//   case 'StripeAPIError':
//     // An error occurred internally with Stripe's API
//     break;
//   case 'StripeConnectionError':
//     // Some kind of error occurred during the HTTPS communication
//     break;
//   case 'StripeAuthenticationError':
//     // You probably used an incorrect API key
//     break;
//   default:
//     // Handle any other types of unexpected errors
//     break;
// }
