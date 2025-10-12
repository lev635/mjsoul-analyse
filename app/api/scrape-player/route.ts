import { NextRequest, NextResponse } from 'next/server';
import { scrapePlayerData } from '@/lib/scraper';

export async function POST(request: NextRequest) {
  try {
    const { playerName, rank = 'g' } = await request.json();

    if (!playerName) {
      return NextResponse.json(
        { error: 'Player name is required' },
        { status: 400 }
      );
    }

    if (!['g', 'b', 'k'].includes(rank)) {
      return NextResponse.json(
        { error: 'Invalid rank. Use g, b, or k' },
        { status: 400 }
      );
    }

    const data = await scrapePlayerData(playerName, rank as 'g' | 'b' | 'k');

    data['名前'] = playerName;

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error scraping player data:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to scrape player data' },
      { status: 500 }
    );
  }
}
