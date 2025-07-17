import { config } from 'dotenv'
  import { exec } from 'child_process'
  import { promisify } from 'util'

  const execAsync = promisify(exec)

  export default async function setup() {
    // Load test environment
    config({ path: '.env.test', override: true })

    // Run migrations once, globally
    console.log('🔄 Running migrations on test database...')
    await execAsync('npx prisma migrate deploy')
    console.log('✅ Migrations completed')
  }