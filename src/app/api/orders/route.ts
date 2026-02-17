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

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerEmail,
        customerName: customerName || '',
        customerPhone: customerPhone || '',
        shippingAddress: JSON.stringify(shippingAddress),
        paymentMethod,
        subtotal,
        shipping,
        total,
        status: paymentMethod === 'cod' ? 'confirmed' : 'pending',
        items: {
          create: items.map((item: { productId?: string; name: string; price: number; quantity: number }) => ({
            productId: item.productId || null,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

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

    const orders = await prisma.order.findMany({
      where: { customerEmail: email },
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}
