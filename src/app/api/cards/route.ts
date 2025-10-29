import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const series = searchParams.get('series');
  const style = searchParams.get('style');
  
  // TODO: 实现卡片列表逻辑
  // const cards = await getCards({ page, limit, series, style });
  
  return NextResponse.json({
    page,
    limit,
    series,
    style,
    cards: [],
    total: 0,
    message: '卡片列表功能开发中...'
  });
}
