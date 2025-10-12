import { NextResponse } from 'next/server';
import { getData } from '@/lib/dataLoader';

export async function GET() {
  try {
    const data = await getData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading data:', error);
    return NextResponse.json(
      { error: 'Failed to load data' },
      { status: 500 }
    );
  }
}
