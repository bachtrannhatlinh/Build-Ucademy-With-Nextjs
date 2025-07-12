'use server';

import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URL) {
    console.error('MONGODB_URL environment variable is not set');
    throw new Error('MONGODB_URL is not set');
  }
  
  if (isConnected) {
    console.log('MONGODB is already connected');
    return mongoose.connection;
  }
  
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: 'ucademy',
    });
    isConnected = true;
    console.log('Successfully connected to MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('Error while connecting to database:', error);
    isConnected = false;
    throw error; // Re-throw the error to handle it in the calling function
  }
};