/**
 * Utility functions for creating ZIP files from multiple files
 */

export interface FileForZip {
  name: string
  url: string
}

/**
 * Creates a ZIP file from multiple file URLs and triggers download
 */
export async function downloadFilesAsZip(files: FileForZip[], zipName: string = 'files.zip'): Promise<void> {
  try {
    // Import JSZip dynamically to avoid SSR issues
    const JSZip = (await import('jszip')).default
    
    const zip = new JSZip()
    
    // Fetch all files and add them to the ZIP
    const filePromises = files.map(async (file) => {
      try {
        const response = await fetch(file.url)
        const blob = await response.blob()
        const arrayBuffer = await blob.arrayBuffer()
        zip.file(file.name, arrayBuffer)
      } catch (error) {
        console.error(`Failed to fetch file ${file.name}:`, error)
        // Continue with other files even if one fails
      }
    })
    
    await Promise.all(filePromises)
    
    // Generate the ZIP file
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    
    // Create download link
    const url = URL.createObjectURL(zipBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = zipName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
  } catch (error) {
    console.error('Error creating ZIP file:', error)
    throw new Error('Failed to create ZIP file')
  }
}

/**
 * Creates a ZIP file from multiple Blob objects
 */
export async function createZipFromBlobs(files: { name: string; blob: Blob }[]): Promise<Blob> {
  try {
    const JSZip = (await import('jszip')).default
    const zip = new JSZip()
    
    // Add each blob to the ZIP
    files.forEach(file => {
      zip.file(file.name, file.blob)
    })
    
    // Generate and return the ZIP blob
    return await zip.generateAsync({ type: 'blob' })
  } catch (error) {
    console.error('Error creating ZIP from blobs:', error)
    throw new Error('Failed to create ZIP file')
  }
}
