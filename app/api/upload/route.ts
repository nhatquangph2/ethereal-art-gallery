import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Get file extension
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename with timestamp
    const timestamp = Date.now();
    const originalName = file.name.replace(/\s+/g, '-').toLowerCase();
    const fileName = `${timestamp}-${originalName}`;

    // Determine upload directory based on type
    let uploadDir: string;
    let publicPath: string;

    if (type === 'image') {
      uploadDir = join(process.cwd(), 'public', 'images', 'artworks');
      publicPath = `/images/artworks/${fileName}`;
    } else if (type === 'audio') {
      // Determine if it's ambient or layer based on filename or default to layers
      const isAmbient = originalName.includes('ambient') || originalName.includes('background');
      const subDir = isAmbient ? 'ambient' : 'layers';
      uploadDir = join(process.cwd(), 'public', 'audio', subDir);
      publicPath = `/audio/${subDir}/${fileName}`;
    } else {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Create directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Write file
    const filePath = join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: publicPath,
      filename: fileName,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
