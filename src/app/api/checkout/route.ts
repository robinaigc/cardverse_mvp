import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cardId, licenseType, userId } = body;
    
    // TODO: 实现订单创建逻辑
    // const order = await createOrder({ cardId, licenseType, userId });
    
    return NextResponse.json({
      success: true,
      orderId: 'temp-order-id',
      message: '订单创建功能开发中...',
      data: { cardId, licenseType, userId }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
