const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const cakes = [
  {
    id: 1,
    name: "Strawberry Bliss",
    price: "LKR 2,200",
    image: "/images/strawberry-cake.png",
    desc: "Fresh strawberries with cream layers",
    details: "A light vanilla sponge layered with whipped cream, fresh berries, and berry compote for a sweet, fruity finish.",
  },
  {
    id: 2,
    name: "Black Forest",
    price: "LKR 1,980",
    image: "/images/black-forest.jpg",
    desc: "Classic chocolate cherry delight",
    details: "Rich chocolate sponge soaked in kirsch, layered with cherries, whipped cream, and dark chocolate shavings.",
  },
  {
    id: 3,
    name: "Tiramisu",
    price: "LKR 2,500",
    image: "/images/tiramisu.webp",
    desc: "Italian coffee-soaked elegance",
    details: "Coffee-soaked ladyfingers layered with mascarpone cream, dusted with cocoa powder for an authentic tiramisu taste.",
  },
  {
    id: 4,
    name: "Red Velvet",
    price: "LKR 2,300",
    image: "/images/red-velvet.jpg",
    desc: "Velvety smooth cream cheese frosting",
    details: "Moist red velvet sponge with a hint of cocoa, finished with rich cream cheese frosting and decorative crumbs.",
  },
  {
    id: 5,
    name: "Coffee Cake",
    price: "LKR 1,800",
    image: "/images/coffee-cake.jpg",
    desc: "Rich espresso butter cake",
    details: "A buttery coffee-flavored cake with espresso glaze, perfect for breakfast, brunch, or afternoon treats.",
  },
  {
    id: 6,
    name: "Vanilla Cake",
    price: "LKR 2,100",
    image: "/images/vanilla-cake.jpeg",
    desc: "Silky smooth vanilla bean perfection",
    details: "Classic vanilla cake layered with creamy vanilla frosting and finished with a delicate whipped cream swirl.",
  },
];

let orders = [
  {
    id: 'ORD-2024-001',
    cakeId: 1,
    quantity: 1,
    unit: 'full',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+94 77 123 4567',
      address: '123 Main St, Colombo',
      note: 'Please make it extra sweet'
    },
    status: 'Pending',
    createdAt: '2024-04-01T10:00:00Z'
  },
  {
    id: 'ORD-2024-002',
    cakeId: 2,
    quantity: 2,
    unit: 'piece',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+94 77 987 6543',
      address: '456 Oak Ave, Kandy'
    },
    status: 'Confirmed',
    createdAt: '2024-04-02T14:30:00Z'
  }
]; // In-memory storage for orders

let inquiries = [
  {
    id: 'INQ-2024-001',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+94 77 555 1234',
    eventDate: '2024-05-15',
    occasion: 'Birthday',
    message: 'I would like a custom cake for my daughter\'s 10th birthday. She loves unicorns and rainbows.',
    status: 'New',
    createdAt: '2024-04-03T09:15:00Z'
  },
  {
    id: 'INQ-2024-002',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    phone: '+94 77 444 5678',
    occasion: 'Wedding',
    message: 'Need a wedding cake for 100 guests. Three tiers with fondant decoration.',
    status: 'In Progress',
    createdAt: '2024-04-04T16:45:00Z'
  }
]; // In-memory storage for custom inquiries

app.get('/api/cakes', (req, res) => {
  res.json(cakes);
});

app.get('/api/cakes/:id', (req, res) => {
  const cake = cakes.find((item) => item.id === Number(req.params.id));
  if (!cake) {
    return res.status(404).json({ error: 'Cake not found' });
  }
  res.json(cake);
});

app.post('/api/orders', (req, res) => {
  const orderData = req.body;
  const orderId = 'ORD-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const newOrder = {
    id: orderId,
    ...orderData,
    status: 'Order Placed',
    createdAt: new Date().toISOString(),
    estimatedTime: '45-60 minutes',
  };
  orders.push(newOrder);
  res.json({ success: true, orderId, message: 'Order placed successfully!' });
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.get('/api/orders/:id', (req, res) => {
  const order = orders.find((o) => o.id === req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

app.post('/api/inquiries', (req, res) => {
  const inquiryData = req.body;
  const inquiryId = 'INQ-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const newInquiry = {
    id: inquiryId,
    ...inquiryData,
    status: 'New',
    createdAt: new Date().toISOString(),
  };
  inquiries.push(newInquiry);
  res.json({ success: true, inquiryId, message: 'Inquiry submitted successfully!' });
});

app.get('/api/inquiries', (req, res) => {
  res.json(inquiries);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Admin credentials (hardcoded for now)
const ADMIN_EMAIL = "admin@cakeoz.com";
const ADMIN_PASSWORD = "admin123";

// POST /api/admin/login — Admin login check
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.json({ success: true, token: "admin-token-secret" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// GET /api/admin/orders — Admin orders பார்க்க
app.get('/api/admin/orders', (req, res) => {
  res.json(orders);
});