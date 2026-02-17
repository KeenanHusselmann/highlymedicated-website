import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, shippingAddress, paymentMethod, customerEmail, customerName, customerPhone } = body;

    if (!items?.length || !shippingAddress || !paymentMethod || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required order information' },
        { status: 400 }
      );
    }

    const subtotal = items.reduce((sum: number, item: { price: number; quantity: number }) => 
      sum + item.price * item.quantity, 0
    );
    const shipping = subtotal >= 500 ? 0 : 75;
    const total = subtotal + shipping;

    const orderNumber = `HM-${Date.now().toString(36).toUpperCase()}`;

    const order = {
      id: Date.now().toString(),
      orderNumber,
      customerEmail,
      customerName: customerName || '',
      customerPhone: customerPhone || '',
      shippingAddress,
      paymentMethod,
      subtotal,
      shipping,
      total,
      status: paymentMethod === 'cod' ? 'confirmed' : 'pending',
      createdAt: new Date().toISOString(),
      items: items.map((item: { productId?: string; name: string; price: number; quantity: number }) => ({
        id: Date.now().toString() + Math.random(),
        productId: item.productId || null,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Return empty orders array for demo
    return NextResponse.json([]);
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
