import api from './axios.js'
import { WHATSAPP_NUMBER } from '../utils/constants.js'

export const orderService = {
  /** POST order to FastAPI backend */
  placeOrder: (orderPayload) => api.post('/orders', orderPayload),

  /**
   * Build WhatsApp deep-link from order summary.
   * Falls back gracefully if API is unavailable.
   */
  buildWhatsAppLink: (order) => {
    const lines = [
      '🎂 *New Order — Artisan Bloom*',
      '',
      `*Name:* ${order.customerName}`,
      `*Mobile:* ${order.mobile}`,
      `*Email:* ${order.email || 'N/A'}`,
      '',
      '*Order Details:*',
      ...order.items.map(
        (item) =>
          `• ${item.flavor} Cake — ${item.weight} — ${item.design} design` +
          (item.addOns?.length ? `\n  Add-ons: ${item.addOns.join(', ')}` : '') +
          (item.message ? `\n  Message: "${item.message}"` : '')
      ),
      '',
      `*Delivery Date:* ${order.deliveryDate}`,
      `*Time Slot:* ${order.timeSlot}`,
      `*Address:* ${order.address}`,
      '',
      `*Total:* ₹${order.total}`,
    ]
    const text = encodeURIComponent(lines.join('\n'))
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
  },
}
