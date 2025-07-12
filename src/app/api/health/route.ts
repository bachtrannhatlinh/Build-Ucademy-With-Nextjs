import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";

export async function GET() {
  try {
    // Check environment variables
    const requiredEnvs = [
      'MONGODB_URL',
      'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
      'CLERK_SECRET_KEY',
      'WEBHOOK_SECRET'
    ];
    
    const missingEnvs = requiredEnvs.filter(env => !process.env[env]);
    
    if (missingEnvs.length > 0) {
      return NextResponse.json({
        status: 'error',
        message: 'Missing environment variables',
        missing: missingEnvs
      }, { status: 500 });
    }

    // Check database connection
    await connectToDatabase();
    
    return NextResponse.json({
      status: 'healthy',
      message: 'Application is running properly',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });
    
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Health check failed',
      error: process.env.NODE_ENV === 'development' ? String(error) : 'Internal server error'
    }, { status: 500 });
  }
}
