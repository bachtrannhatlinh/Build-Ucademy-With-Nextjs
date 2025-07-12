import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Return environment info (safe for debugging)
    const envInfo = {
      nodeEnv: process.env.NODE_ENV,
      hasMongoUrl: !!process.env.MONGODB_URL,
      hasClerkPublic: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      hasClerkSecret: !!process.env.CLERK_SECRET_KEY,
      hasWebhookSecret: !!process.env.WEBHOOK_SECRET,
      hasUploadthingToken: !!process.env.UPLOADTHING_TOKEN,
      platform: process.platform,
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json({
      status: 'debug-info',
      message: 'Debug information',
      data: envInfo
    });
    
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Debug API failed',
      error: String(error)
    }, { status: 500 });
  }
}
