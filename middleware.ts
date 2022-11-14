import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { navigation } from './constants'

export const middleware = (request: NextRequest) => {
  const url = request.nextUrl.clone()
  if (url.pathname === '/') {
    url.pathname = navigation.getPage(1);
    return NextResponse.redirect(url)
  }
};