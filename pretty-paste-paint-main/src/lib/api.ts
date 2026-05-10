export type Cake = {
  id: number;
  name: string;
  price: string;
  image: string;
  desc: string;
  details: string;
};

export type CustomerDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
  note?: string;
  eventDate?: string;
  occasion?: string;
};

export type OrderRequest = {
  cakeId: number;
  quantity: number;
  unit: "full" | "piece";
  customer: CustomerDetails;
};

export type OrderDetails = OrderRequest & {
  id: string;
  status: string;
  createdAt: string;
};

export type OrderResponse = {
  success: boolean;
  orderId: string;
  message: string;
};

export type InquiryRequest = {
  name: string;
  email: string;
  phone: string;
  eventDate?: string;
  occasion?: string;
  message: string;
};

export type InquiryDetails = InquiryRequest & {
  id: string;
  status: string;
  createdAt: string;
};

export type InquiryResponse = {
  success: boolean;
  inquiryId: string;
  message: string;
};

const defaultHeaders = {
  "Content-Type": "application/json",
};

async function safeFetch<T>(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.error || response.statusText || "Request failed");
  }
  return response.json() as Promise<T>;
}

export function fetchCakes(): Promise<Cake[]> {
  return safeFetch<Cake[]>("/api/cakes");
}

export function fetchCakeById(cakeId: number): Promise<Cake> {
  return safeFetch<Cake>(`/api/cakes/${cakeId}`);
}

export function fetchOrders(): Promise<OrderDetails[]> {
  return safeFetch<OrderDetails[]>("/api/orders");
}

export function fetchInquiries(): Promise<InquiryDetails[]> {
  return safeFetch<InquiryDetails[]>("/api/inquiries");
}

export function placeOrder(order: OrderRequest): Promise<OrderResponse> {
  return safeFetch<OrderResponse>("/api/orders", {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(order),
  });
}

export function sendInquiry(inquiry: InquiryRequest): Promise<InquiryResponse> {
  return safeFetch<InquiryResponse>("/api/inquiries", {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(inquiry),
  });
}
