import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, orderId } = await req.json();

  try {
    const shopifyStore = "a1wfw0-15.myshopify.com";
    const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

    const url = `https://${shopifyStore}/admin/api/2024-01/orders.json?email=${encodeURIComponent(email.trim())}&status=any&limit=250`;
    const response = await fetch(url, {
      headers: { "X-Shopify-Access-Token": accessToken || "" },
    });

    const data = await response.json();
    const orders = data.orders || [];

    const cleanOrderId = String(orderId).trim().replace(/^#/, "");
    const match = orders.find((o: { name: string }) => {
      const orderName = o.name.replace(/^#/, "");
      return orderName === cleanOrderId;
    });

    if (match) {
      let customerName = "Customer";
      if (match.shipping_address) {
        const sa = match.shipping_address;
        if (sa.first_name || sa.last_name) {
          customerName = [sa.first_name, sa.last_name].filter(Boolean).join(" ");
        }
      } else if (match.customer) {
        const c = match.customer;
        if (c.first_name || c.last_name) {
          customerName = [c.first_name, c.last_name].filter(Boolean).join(" ");
        }
      }

      const res = NextResponse.json({ success: true });
      res.cookies.set("portal_session", "authenticated", { httpOnly: true, secure: true, sameSite: 'lax' });
      res.cookies.set("portal_email", email.trim(), { httpOnly: true, secure: true, sameSite: 'lax' });
      res.cookies.set("portal_name", customerName, { httpOnly: true, secure: true, sameSite: 'lax' });
      return res;
    } else {
      return NextResponse.json(
        { success: false, error: "No matching order found for this email and Order ID." },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
