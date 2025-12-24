const stripeWebhookService = require('../service/webhook/stripe-webhook-service');

class StripeHookController {
    
    async stripe(req, res, next) {
    try {
        const sig = req.headers['stripe-signature'];
        
        await stripeWebhookService.handleWebhook({
            rawBody: req.body,
            signature: sig,
        });
        
      return res.status(200).json({ received: true });
    } catch (e) {
      console.error('Stripe webhook error:', e.message);
      return res.status(400).send(`Webhook Error: ${e.message}`);
    }
  }
}

module.exports = new StripeHookController();