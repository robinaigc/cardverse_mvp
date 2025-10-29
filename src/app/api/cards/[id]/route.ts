import { NextRequest, NextResponse } from 'next/server';

interface CardDetailParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: CardDetailParams) {
  const { id } = params;
  
  // TODO: 实现卡片详情逻辑
  // const card = await getCardById(id);
  
  // if (!card) {
  //   return NextResponse.json({ error: 'Card not found' }, { status: 404 });
  // }
  
  return NextResponse.json({
    id,
    card: null,
    message: '卡片详情功能开发中...'
  });
}
