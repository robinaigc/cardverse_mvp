import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  
  // TODO: 实现搜索逻辑
  // const results = await searchCards(query, page, limit);
  
  return NextResponse.json({
    query,
    page,
    limit,
    results: [],
    total: 0,
    message: '搜索功能开发中...'
  });
}
