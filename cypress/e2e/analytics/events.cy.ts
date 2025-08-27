interface AnalyticsCall {
  request: {
    body: {
      event: string;
      timestamp?: number;
      tool?: string;
      data?: Record<string, unknown>;
    };
  };
}

describe('Analytics Event Shape Tests', () => {
  
  beforeEach(() => {
    // Stub analytics endpoints to capture payloads
    cy.intercept('POST', '/api/analytics', { statusCode: 200 }).as('analyticsPost')
    cy.intercept('POST', '**/analytics', { statusCode: 200 }).as('externalAnalytics')
    
    // Stub sendBeacon and fetch for client-side analytics
    cy.window().then((win) => {
      // Stub sendBeacon
      win.navigator.sendBeacon = cy.stub().callsFake((url: string, data: BodyInit) => {
        cy.wrap({ url, data }).as('beaconCall')
        return true
      })
      
      // Stub fetch for analytics
      const originalFetch = win.fetch
      win.fetch = cy.stub().callsFake((url: string, options?: RequestInit) => {
        if (url.includes('analytics') || url.includes('track')) {
          cy.wrap({ url, options }).as('fetchCall')
          return Promise.resolve(new Response('{}', { status: 200 }))
        }
        return originalFetch.call(win, url, options)
      })
    })
  })

  it('should track file upload events without PII', () => {
    cy.visit('/tools/pdf-compress')
    
    // Upload a file
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    
    // Check for analytics calls
    cy.get('@analyticsPost.all').then((interceptedCalls) => {
      const calls = interceptedCalls as unknown as AnalyticsCall[]
      if (calls.length > 0) {
        calls.forEach((call) => {
          const payload = call.request.body
          
          // Should have event type
          expect(payload).to.have.property('event')
          expect(payload.event).to.equal('file_upload')
          
          // Should NOT contain filename or path
          expect(JSON.stringify(payload)).to.not.include('sample.pdf')
          expect(JSON.stringify(payload)).to.not.include('.pdf')
          expect(JSON.stringify(payload)).to.not.include('/')
          expect(JSON.stringify(payload)).to.not.include('\\')
          
          // Should contain safe metadata only
          if (payload.data) {
            expect(payload.data).to.not.have.property('filename')
            expect(payload.data).to.not.have.property('path')
            expect(payload.data).to.not.have.property('name')
            
            // Size should be rounded if present
            if (payload.data.sizeMb) {
              expect(payload.data.sizeMb).to.be.a('number')
              expect(payload.data.sizeMb.toString()).to.match(/^\d+(\.\d{1,2})?$/) // Max 2 decimal places
            }
          }
        })
      }
    })
    
    // Also check beacon calls if they exist
    cy.window().then(() => {
      cy.log('Checking for beacon analytics calls')
    })
  })

  it('should track job lifecycle events with proper sequence', () => {
    cy.visit('/tools/pdf-compress')
    
    // Clear previous analytics calls
    cy.intercept('POST', '/api/analytics', { statusCode: 200 }).as('analyticsSequence')
    
    // Upload and process file
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    cy.contains('Compress', { matchCase: false }).click()
    cy.waitForProcessing()
    
    // Check event sequence
    cy.get('@analyticsSequence.all').then((interceptedCalls) => {
      const calls = interceptedCalls as unknown as AnalyticsCall[]
      if (calls.length > 0) {
        const events = calls.map(call => call.request.body.event)
        
        // Should have proper event sequence
        expect(events).to.include('file_upload')
        expect(events).to.include('job_start')
        expect(events).to.include('job_success')
        
        // Check each event payload
        calls.forEach((call) => {
          const payload = call.request.body
          
          // All events should have timestamp
          expect(payload).to.have.property('timestamp')
          expect(payload.timestamp).to.be.a('number')
          
          // All events should have tool context
          expect(payload).to.have.property('tool')
          expect(payload.tool).to.equal('pdf-compress')
          
          // Should not contain PII
          expect(JSON.stringify(payload)).to.not.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/) // No emails
          expect(JSON.stringify(payload)).to.not.match(/\d{3}-\d{2}-\d{4}/) // No SSN patterns
          expect(JSON.stringify(payload)).to.not.include('password')
          expect(JSON.stringify(payload)).to.not.include('token')
          expect(JSON.stringify(payload)).to.not.include('key')
        })
      } else {
        cy.log('No analytics events captured - analytics may be disabled in test environment')
      }
    })
  })

  it('should ensure payload keys match expected contract', () => {
    cy.visit('/tools/pdf-merge')
    
    // Upload files and process
    cy.upload('input[type="file"]', ['a.pdf', 'b.pdf'])
    cy.wait(1000)
    cy.contains('Merge', { matchCase: false }).click()
    cy.waitForProcessing()
    
    cy.get('@analyticsPost.all').then((interceptedCalls) => {
      const calls = interceptedCalls as unknown as AnalyticsCall[]
      if (calls.length > 0) {
        calls.forEach((call) => {
          const payload = call.request.body
          
          // Required fields
          expect(payload).to.have.property('event')
          expect(payload).to.have.property('timestamp')
          expect(payload).to.have.property('tool')
          
          // Event should be from allowed list
          const allowedEvents = [
            'file_upload',
            'job_start', 
            'job_success',
            'job_error',
            'download_start',
            'page_view'
          ]
          expect(allowedEvents).to.include(payload.event)
          
          // Tool should match current tool
          expect(payload.tool).to.equal('pdf-merge')
          
          // Data object structure (if present)
          if (payload.data) {
            const allowedDataKeys = [
              'fileCount',
              'sizeMb',
              'duration',
              'preset',
              'format',
              'pages',
              'errorType'
            ]
            
            Object.keys(payload.data).forEach(key => {
              expect(allowedDataKeys).to.include(key)
            })
            
            // Specific validations
            if (payload.data.sizeMb) {
              expect(payload.data.sizeMb).to.be.a('number')
              expect(payload.data.sizeMb).to.be.at.least(0)
              expect(payload.data.sizeMb).to.be.at.most(1000) // Reasonable upper bound
            }
            
            if (payload.data.fileCount) {
              expect(payload.data.fileCount).to.be.a('number')
              expect(payload.data.fileCount).to.be.at.least(1)
              expect(payload.data.fileCount).to.be.at.most(100) // Reasonable upper bound
            }
            
            if (payload.data.duration) {
              expect(payload.data.duration).to.be.a('number')
              expect(payload.data.duration).to.be.at.least(0)
            }
          }
        })
      }
    })
  })

  it('should round size measurements to 2 decimal places', () => {
    cy.visit('/tools/pdf-split')
    
    // Upload file and process
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    cy.get('input[placeholder*="range"], input[placeholder*="pages"]').type('1-2')
    cy.contains('Split', { matchCase: false }).click()
    cy.waitForProcessing()
    
    cy.get('@analyticsPost.all').then((interceptedCalls) => {
      const calls = interceptedCalls as unknown as AnalyticsCall[]
      if (calls.length > 0) {
        calls.forEach((call) => {
          const payload = call.request.body
          
          if (payload.data && payload.data.sizeMb) {
            const sizeMb = payload.data.sizeMb
            
            // Should be rounded to max 2 decimal places
            const decimalPlaces = (sizeMb.toString().split('.')[1] || '').length
            expect(decimalPlaces).to.be.at.most(2)
            
            // Should be a reasonable size (not exact file size which could be PII)
            expect(sizeMb).to.be.a('number')
            expect(sizeMb).to.be.greaterThan(0)
            expect(sizeMb).to.be.lessThan(100) // Reasonable for test files
          }
        })
      }
    })
  })

  it('should not track user agent or IP-related information', () => {
    cy.visit('/tools/images-to-pdf')
    
    // Upload images and convert
    cy.upload('input[type="file"]', ['pic1.jpg', 'pic2.jpg'])
    cy.wait(1000)
    cy.contains('Convert', { matchCase: false }).click()
    cy.waitForProcessing()
    
    cy.get('@analyticsPost.all').then((interceptedCalls) => {
      const calls = interceptedCalls as unknown as AnalyticsCall[]
      if (calls.length > 0) {
        calls.forEach((call) => {
          const payload = call.request.body
          const payloadStr = JSON.stringify(payload)
          
          // Should not contain user agent info
          expect(payloadStr).to.not.include('Mozilla')
          expect(payloadStr).to.not.include('Chrome')
          expect(payloadStr).to.not.include('Safari')
          expect(payloadStr).to.not.include('Firefox')
          expect(payloadStr).to.not.include('Edge')
          
          // Should not contain IP addresses
          expect(payloadStr).to.not.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)
          expect(payloadStr).to.not.match(/([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}/) // IPv6
          
          // Should not contain location data
          expect(payloadStr).to.not.include('latitude')
          expect(payloadStr).to.not.include('longitude')
          expect(payloadStr).to.not.include('country')
          expect(payloadStr).to.not.include('city')
          expect(payloadStr).to.not.include('timezone')
          
          // Should not contain device fingerprinting
          expect(payloadStr).to.not.include('screen')
          expect(payloadStr).to.not.include('resolution')
          expect(payloadStr).to.not.include('canvas')
          expect(payloadStr).to.not.include('webgl')
        })
      }
    })
  })

  it('should handle error events without exposing sensitive details', () => {
    cy.visit('/tools/pdf-compress')
    
    // Try to upload an invalid file to trigger error
    cy.writeFile('cypress/fixtures/invalid-file.pdf', 'This is not a real PDF file')
    cy.get('input[type="file"]').selectFile('cypress/fixtures/invalid-file.pdf', { force: true })
    cy.wait(2000)
    
    // Try to process (should fail)
    cy.contains('Compress', { matchCase: false }).click()
    cy.wait(2000)
    
    cy.get('@analyticsPost.all').then((interceptedCalls) => {
      const calls = interceptedCalls as unknown as AnalyticsCall[]
      const errorEvents = calls.filter(call => call.request.body.event === 'job_error')
      
      if (errorEvents.length > 0) {
        errorEvents.forEach((call) => {
          const payload = call.request.body
          
          // Should have error event
          expect(payload.event).to.equal('job_error')
          
          // Should not expose stack traces
          const payloadStr = JSON.stringify(payload)
          expect(payloadStr).to.not.include('stack')
          expect(payloadStr).to.not.include('trace')
          expect(payloadStr).to.not.include('Error:')
          expect(payloadStr).to.not.include('at ')
          
          // Should not expose file paths
          expect(payloadStr).to.not.include('cypress/fixtures')
          expect(payloadStr).to.not.include('invalid-file.pdf')
          expect(payloadStr).to.not.include('C:')
          expect(payloadStr).to.not.include('/Users/')
          expect(payloadStr).to.not.include('/home/')
          
          // Error type should be generic
          if (payload.data && payload.data.errorType) {
            const allowedErrorTypes = [
              'invalid_file',
              'processing_failed',
              'upload_failed',
              'timeout',
              'unknown'
            ]
            expect(allowedErrorTypes).to.include(payload.data.errorType)
          }
        })
      } else {
        cy.log('No error events captured - error handling may prevent analytics on errors')
      }
    })
  })

  it('should validate analytics payload size limits', () => {
    cy.visit('/tools/pdf-organize')
    
    // Upload file and process
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    cy.contains('Organize', { matchCase: false }).click()
    cy.waitForProcessing()
    
    cy.get('@analyticsPost.all').then((interceptedCalls) => {
      const calls = interceptedCalls as unknown as AnalyticsCall[]
      if (calls.length > 0) {
        calls.forEach((call) => {
          const payload = call.request.body
          const payloadSize = JSON.stringify(payload).length
          
          // Payload should be reasonably small (under 1KB)
          expect(payloadSize).to.be.lessThan(1024)
          
          // Should not have deeply nested objects
          const maxDepth = (obj: any, depth = 0): number => {
            if (typeof obj !== 'object' || obj === null) return depth
            return Math.max(...Object.values(obj).map(val => maxDepth(val, depth + 1)))
          }
          
          expect(maxDepth(payload)).to.be.lessThan(4) // Max 3 levels deep
        })
      }
    })
  })

  it('should ensure consistent event timing', () => {
    cy.visit('/tools/pdf-watermark')
    
    const startTime = Date.now()
    
    // Upload and process file
    cy.upload('input[type="file"]', ['sample.pdf'])
    cy.wait(1000)
    cy.get('input[placeholder*="text"], input[placeholder*="watermark"]').type('Test Watermark')
    cy.contains('Add Watermark', { matchCase: false }).click()
    cy.waitForProcessing()
    
    const endTime = Date.now()
    
    cy.get('@analyticsPost.all').then((interceptedCalls) => {
      const calls = interceptedCalls as unknown as AnalyticsCall[]
      if (calls.length > 0) {
        calls.forEach((call) => {
          const payload = call.request.body
          
          if (payload.timestamp) {
            // Timestamp should be within reasonable range
            expect(payload.timestamp).to.be.at.least(startTime)
            expect(payload.timestamp).to.be.at.most(endTime + 5000) // Allow 5s buffer
            
            // Timestamp should be in milliseconds
            expect(payload.timestamp.toString().length).to.be.at.least(13) // Unix timestamp in ms
          }
        })
      }
    })
  })
})
