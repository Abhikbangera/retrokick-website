const API_BASE_URL = 'http://localhost:3001/api';

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface OrderItem {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  selectedSize: string;
}

export interface Order {
  orderId: string;
  items: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  shippingCost: number;
  tax: number;
  grandTotal: number;
  paymentMethod?: string;
  status: string;
  createdAt: string;
}

export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  completedOrders: number;
  recentOrders: Order[];
}

export interface User {
  id: string;
  name: string;
  email: string;
}

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// User Authentication APIs
export const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(response);
};

export const userLogin = async (email: string, password: string): Promise<{ success: boolean; token: string; user: User }> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

export const adminLogin = async (email: string, password: string): Promise<{ success: boolean; token: string; admin: { email: string } }> => {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

// Order APIs
export const createOrder = async (orderData: Partial<Order>): Promise<{ success: boolean; orderId: string }> => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return handleResponse(response);
};

export const getOrders = async (): Promise<Order[]> => {
  const response = await fetch(`${API_BASE_URL}/orders`);
  return handleResponse(response);
};

export const getOrder = async (orderId: string): Promise<Order> => {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
  return handleResponse(response);
};

export const updateOrderStatus = async (orderId: string, status: string): Promise<Order> => {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return handleResponse(response);
};

// Admin APIs
export const getAdminStats = async (): Promise<AdminStats> => {
  const response = await fetch(`${API_BASE_URL}/admin/stats`);
  return handleResponse(response);
};

