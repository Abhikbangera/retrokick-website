require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Data file paths
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

// Ensure data directory exists
const dataDir = path.dirname(ORDERS_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize data files if not exist
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

// Read data from files
const readOrders = () => {
  try {
    return JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
  } catch (error) {
    return [];
  }
};

const readUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
  } catch (error) {
    return [];
  }
};

// Write data to files
const writeOrders = (orders) => {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
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
          <h1 style="color: #00ff9d; font-family: 'Bebas Neue', sans-serif; font-size: 48px;">RETROKICK</h1>
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
          <h1 style="color: #ff0055; font-family: 'Bebas Neue', sans-serif; font-size: 48px;">RETROKICK - NEW ORDER</h1>
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

// Send welcome email on signup
const sendWelcomeEmail = async (user, transporter) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'retrokick@example.com',
    to: user.email,
    subject: 'Welcome to RetroKick! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00ff9d; font-family: 'Bebas Neue', sans-serif; font-size: 48px;">RETROKICK</h1>
          <p style="color: #00d9ff;">Welcome Aboard!</p>
        </div>

        <div style="background: #1a1a2e; border-radius: 12px; padding: 30px; margin-bottom: 20px; text-align: center;">
          <h2 style="color: white; margin-bottom: 15px;">Hi ${user.name}! 👋</h2>
          <p style="color: #888; font-size: 16px; line-height: 1.6;">
            Thank you for signing up with RetroKick!<br>
            You're now part of our community of football jersey enthusiasts.
          </p>
        </div>

        <div style="background: linear-gradient(135deg, #00ff9d, #00d9ff); border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 20px;">
          <p style="color: #0a0a0f; margin: 0; font-size: 14px;">Your exclusive benefits include:</p>
          <p style="color: #0a0a0f; margin: 10px 0 0 0; font-size: 14px;">✓ Early access to new arrivals</p>
          <p style="color: #0a0a0f; margin: 5px 0 0 0; font-size: 14px;">✓ Exclusive retro jersey drops</p>
          <p style="color: #0a0a0f; margin: 5px 0 0 0; font-size: 14px;">✓ Special member discounts</p>
        </div>

        <div style="text-align: center;">
          <a href="http://localhost:5174/#/shop" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #ff0055, #00d9ff); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-family: 'Bebas Neue', sans-serif; font-size: 18px;">
            START SHOPPING
          </a>
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

// Send login notification email
const sendLoginNotificationEmail = async (user, transporter, ipAddress) => {
  const loginTime = new Date().toLocaleString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const mailOptions = {
    from: process.env.EMAIL_USER || 'retrokick@example.com',
    to: user.email,
    subject: '🔐 New Login to Your RetroKick Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #00ff9d; font-family: 'Bebas Neue', sans-serif; font-size: 48px;">RETROKICK</h1>
          <p style="color: #00d9ff;">Account Activity</p>
        </div>

        <div style="background: #1a1a2e; border-radius: 12px; padding: 30px; margin-bottom: 20px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #00ff9d, #00d9ff); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;">
              <span style="font-size: 30px;">🔔</span>
            </div>
          </div>
          
          <h2 style="color: white; text-align: center; margin-bottom: 20px;">New Login Detected</h2>
          
          <div style="background: #0a0a0f; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <p style="color: #888; margin-bottom: 10px;">Hi <strong style="color: white;">${user.name}</strong>,</p>
            <p style="color: #888; margin-bottom: 15px;">Your RetroKick account was just logged into.</p>
            
            <table style="width: 100%; color: #ccc; font-size: 14px;">
              <tr><td style="padding: 8px 0; color: #888;">Time:</td><td style="padding: 8px 0; color: white;">${loginTime}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Device:</td><td style="padding: 8px 0; color: white;">Web Browser</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Location:</td><td style="padding: 8px 0; color: white;">${ipAddress || 'Unknown'}</td></tr>
            </table>
          </div>

          <p style="color: #666; font-size: 13px; text-align: center;">
            If this was you, you can safely ignore this email.<br>
            If you didn't log in, please <a href="#" style="color: #ff0055;">secure your account</a> immediately.
          </p>
        </div>

        <div style="background: #1a1a2e; border-radius: 12px; padding: 20px; text-align: center;">
          <p style="color: #888; font-size: 13px; margin-bottom: 15px;">Having trouble logging in?</p>
          <a href="http://localhost:5174/#/contact" style="color: #00ff9d; text-decoration: none;">Contact our support team</a>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
          <p style="color: #666; font-size: 12px;">© 2024 RetroKick. All rights reserved.</p>
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

// ==================== API Routes ====================

// User Signup
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const users = readUsers();

    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    writeUsers(users);

    // Send welcome email
    try {
      const transporter = createTransporter();
      await sendWelcomeEmail(newUser, transporter);
      console.log('Welcome email sent to:', email);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
    }

    res.json({ success: true, message: 'Account created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Signup failed' });
  }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const users = readUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Get client IP
    const clientIP = req.ip || req.connection.remoteAddress || 'Unknown';

    // Generate token
    const token = 'user-token-' + uuidv4();

    // Send login notification email
    try {
      const transporter = createTransporter();
      await sendLoginNotificationEmail(user, transporter, clientIP);
      console.log('Login notification email sent to:', email);
    } catch (emailError) {
      console.error('Failed to send login notification:', emailError);
    }

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

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

