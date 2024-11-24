import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Dexie, { Table } from "dexie";

// Utility to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Define the interface for PDF metadata
export interface PDFMetadata {
  id: number; // Unique ID for each PDF entry
  name: string; // File name of the PDF
  url: string; // Downloadable URL of the PDF
  timestamp: string; // Timestamp of when the PDF was downloaded
}

// Extend Dexie to create a custom database
class PDFHistoryDB extends Dexie {
  pdfs!: Table<PDFMetadata, number>; // Table for storing PDF metadata

  constructor() {
    super("PDFHistoryDB"); // Name of the database
    this.version(1).stores({
      pdfs: "id, name, url, timestamp", // Define schema
    });
  }
}

// Create and export a singleton instance of the database
export const db = new PDFHistoryDB();

// Function to save PDF metadata to the database
export async function savePDFMetadata(metadata: PDFMetadata): Promise<void> {
  try {
    await db.pdfs.add(metadata);
    console.log("PDF metadata saved:", metadata);
  } catch (error) {
    console.error("Error saving PDF metadata:", error);
  }
}

// Function to fetch all PDF metadata from the database
export async function fetchPDFMetadata(): Promise<PDFMetadata[]> {
  try {
    return await db.pdfs.toArray();
  } catch (error) {
    console.error("Error fetching PDF metadata:", error);
    return [];
  }
}

// Function to clear all PDF metadata from the database
export async function clearPDFHistory(): Promise<void> {
  try {
    await db.pdfs.clear();
    console.log("PDF history cleared.");
  } catch (error) {
    console.error("Error clearing PDF history:", error);
  }
}
