const orderService = require('../order/order-service');

const stripe = require('stripe')(process.env.STRIPE_SERVER_KEY);

class StripeWebhookService {
  async handleWebhook({ rawBody, signature }) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      throw ApiError.badRequest('Invalid Stripe signature');
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const paymentIntentId = session.payment_intent;

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        const { orderId, userId } = paymentIntent.metadata;

        if (!orderId) {
          console.error('Missing orderId in PaymentIntent metadata:', session.payment_intent);
          return;
        }

        await orderService.handleCheckoutCompleted({
          orderId,
          userId,
          stripeSessionId: session.id,
          paymentIntentId: paymentIntent?.id,
        });
        break;
      }

      case 'payment_intent.payment_failed': {
        const intent = event.data.object;
        const { orderId } = intent.metadata ?? {};
        if (!orderId) return;

        await orderService.handleCheckoutFailed({
          orderId,
          paymentIntentId: intent.id,
          reason: intent.last_payment_error?.message ?? 'Payment failed',
        });
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object;

        const paymentIntentId = session.payment_intent;
        if (!paymentIntentId) return;

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        const { orderId } = paymentIntent.metadata ?? {};
        if (!orderId) return;

        await orderService.handleCheckoutExpired({
          orderId,
          stripeSessionId: session.id,
        });
        break;
      }

      default:
        // ignore silently
        break;
    }
  }
}


module.exports = new StripeWebhookService();
