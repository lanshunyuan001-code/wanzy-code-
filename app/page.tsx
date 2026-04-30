import { getSiteData } from '@/lib/data'
import ClientPage from './client-page'

export default function Page() {
  const data = getSiteData()
  return <ClientPage initialData={data} />
}
