require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');

// Ensure data directory exists
const dataDir = path.dirname(ORDERS_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize orders file if not exists
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
}

// Read orders from file
const readOrders = () => {
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
  } catch (error) {
    return [];
  }
};

// Write orders to file
const writeOrders = (orders) => {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
};

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

// Send order confirmation email to customer
const sendCustomerEmail = async (order, transporter) => {
  const itemsList = order.items.map(item => 
    `• ${item.product.name} (Size: ${item.selectedSize}) x${item.quantity} - ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}`
  ).join('\n');

  const mailOptions = {
    from: process.env.EMAIL_USER || 'retrokick@example.com',
    to: order.shipping.email,
    subject: `Order Confirmed - RetroKick #${order.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00ff9d; font-family: 'Bebas Neue', sans-serif;">RETROKICK</h1>
          <p style="color: #00d9ff;">Order Confirmation</p>
        </div>
        
        <div style="background: #1a1a2e; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h2 style="color: white; margin-bottom: 15px;">Thank you for your order, ${order.shipping.firstName}!</h2>
          <p style="color: #888;">Order ID: <strong style="color: #00ff9d;">${order.orderId}</strong></p>
          <p style="color: #888;">Date: ${new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
        </div>

        <div style="background: #1a1a2e; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="color: white; margin-bottom: 15px;">Order Details</h3>
          <div style="color: #ccc; line-height: 1.8;">
            ${itemsList}
          </div>
        </div>

        <div style="background: #1a1a2e; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="color: white; margin-bottom: 15px;">Shipping Address</h3>
          <p style="color: #ccc;">
            ${order.shipping.firstName} ${order.shipping.lastName}<br>
            ${order.shipping.address}<br>
            ${order.shipping.city}, ${order.shipping.state} - ${order.shipping.pincode}<br>
            Phone: ${order.shipping.phone}
          </p>
        </div>

        <div style="background: linear-gradient(135deg, #00ff9d, #00d9ff); border-radius: 12px; padding: 20px; text-align: center;">
          <p style="color: #0a0a0f; margin: 0; font-size: 14px;">Total Paid</p>
          <h2 style="color: #0a0a0f; margin: 10px 0 0 0; font-family: 'Bebas Neue', sans-serif; font-size: 32px;">
            ₹${order.grandTotal.toLocaleString('en-IN')}
          </h2>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
          <p style="color: #666; font-size: 12px;">Questions? Contact us at support@retrokick.com</p>
          <p style="color: #666; font-size: 12px;">© 2024 RetroKick. All rights reserved.</p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Send order notification to admin
const sendAdminEmail = async (order, transporter) => {
  const itemsList = order.items.map(item => 
    `<tr>
      <td style="padding: 10px; border-bottom: 1px solid #333; color: #ccc;">${item.product.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #333; color: #ccc; text-align: center;">${item.selectedSize}</td>
      <td style="padding: 10px; border-bottom: 1px solid #333; color: #ccc; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #333; color: #00ff9d; text-align: right;">₹${(item.product.price * item.quantity).toLocaleString('en-IN')}</td>
    </tr>`
  ).join('');

  const mailOptions = {
    from: process.env.EMAIL_USER || 'retrokick@example.com',
    to: process.env.ADMIN_EMAIL || 'abhikbangera@gmail.com',
    subject: `New Order Received - RetroKick #${order.orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #0a0a0f; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #ff0055; font-family: 'Bebas Neue', sans-serif;">RETROKICK - NEW ORDER</h1>
          <p style="color: #00d9ff;">Order ID: ${order.orderId}</p>
        </div>

        <div style="background: #1a1a2e; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="color: #ff0055; margin-bottom: 15px;">Customer Information</h3>
          <table style="width: 100%; color: #ccc;">
            <tr><td style="padding: 5px 0;"><strong>Name:</strong></td><td>${order.shipping.firstName} ${order.shipping.lastName}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Email:</strong></td><td>${order.shipping.email}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Phone:</strong></td><td>${order.shipping.phone}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Date:</strong></td><td>${new Date(order.createdAt).toLocaleString('en-IN')}</td></tr>
            <tr><td style="padding: 5px 0;"><strong>Payment:</strong></td><td>${order.paymentMethod || 'Razorpay'}</td></tr>
          </table>
        </div>

        <div style="background: #1a1a2e; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="color: #ff0055; margin-bottom: 15px;">Shipping Address</h3>
          <p style="color: #ccc; line-height: 1.6;">
            ${order.shipping.address}<br>
            ${order.shipping.city}, ${order.shipping.state} - ${order.shipping.pincode}
          </p>
        </div>

        <div style="background: #1a1a2e; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
          <h3 style="color: #ff0055; margin-bottom: 15px;">Order Items</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: #0a0a0f;">
                <th style="padding: 12px; text-align: left; color: white; border-bottom: 2px solid #00ff9d;">Product</th>
                <th style="padding: 12px; text-align: center; color: white; border-bottom: 2px solid #00ff9d;">Size</th>
                <th style="padding: 12px; text-align: center; color: white; border-bottom: 2px solid #00ff9d;">Qty</th>
                <th style="padding: 12px; text-align: right; color: white; border-bottom: 2px solid #00ff9d;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsList}
            </tbody>
          </table>
        </div>

        <div style="background: linear-gradient(135deg, #ff0055, #ff6b6b); border-radius: 12px; padding: 20px; text-align: center;">
          <p style="color: white; margin: 0; font-size: 14px;">Order Total</p>
          <h2 style="color: white; margin: 10px 0 0 0; font-family: 'Bebas Neue', sans-serif; font-size: 36px;">
            ₹${order.grandTotal.toLocaleString('en-IN')}
          </h2>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Admin credentials
const ADMIN_CREDENTIALS = {
  email: 'abhikbangera@gmail.com',
  password: 'admin@123'
};

// API Routes

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    res.json({ 
      success: true, 
      token: 'admin-token-' + uuidv4(),
      admin: { email: ADMIN_CREDENTIALS.email }
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Get all orders (admin only)
app.get('/api/orders', (req, res) => {
  const orders = readOrders().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(orders);
});

// Get single order
app.get('/api/orders/:orderId', (req, res) => {
  const orders = readOrders();
  const order = orders.find(o => o.orderId === req.params.orderId);
  
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ success: false, message: 'Order not found' });
  }
});

// Create order and send emails
app.post('/api/orders', async (req, res) => {
  try {
    const order = {
      ...req.body,
      orderId: 'RK' + Date.now().toString(36).toUpperCase(),
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    const orders = readOrders();
    orders.push(order);
    writeOrders(orders);

    // Send emails
    const transporter = createTransporter();
    
    // Send customer email
    await sendCustomerEmail(order, transporter);
    console.log('Customer email sent to:', order.shipping.email);
    
    // Send admin email
    await sendAdminEmail(order, transporter);
    console.log('Admin email sent for order:', order.orderId);

    res.json({ success: true, orderId: order.orderId });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Failed to process order' });
  }
});

// Update order status
app.patch('/api/orders/:orderId/status', (req, res) => {
  const { status } = req.body;
  const orders = readOrders();
  const index = orders.findIndex(o => o.orderId === req.params.orderId);
  
  if (index !== -1) {
    orders[index].status = status;
    orders[index].updatedAt = new Date().toISOString();
    writeOrders(orders);
    res.json({ success: true, order: orders[index] });
  } else {
    res.status(404).json({ success: false, message: 'Order not found' });
  }
});

// Get order statistics
app.get('/api/admin/stats', (req, res) => {
  const orders = readOrders();
  
  const stats = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + o.grandTotal, 0),
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    recentOrders: orders.slice(0, 5)
  };
  
  res.json(stats);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

