import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';
    const featured = searchParams.get('featured');

    const where: Record<string, unknown> = {};

    if (category) {
      where.category = { slug: category };
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    if (featured === 'true') {
      where.featured = true;
    }

    let orderBy: Record<string, string> = {};
    switch (sort) {
      case 'price-asc':
        orderBy = { price: 'asc' };
        break;
      case 'price-desc':
        orderBy = { price: 'desc' };
        break;
      case 'name':
        orderBy = { name: 'asc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        category: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    const productsWithRating = products.map((product: any) => ({
      ...product,
      avgRating:
        product.reviews.length > 0
          ? product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / product.reviews.length
          : 0,
      reviewCount: product.reviews.length,
    }));

    return NextResponse.json(productsWithRating);
  } catch (error) {
    console.error('Products fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
