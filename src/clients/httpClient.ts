import { VALIDATION_CLOUD_DOMAIN } from '@/constants'
import { Chain, createPublicClient, http } from 'viem'

const transport = http(
  `https://${VALIDATION_CLOUD_DOMAIN}/v1/${process.env.NEXT_PUBLIC_VALIDATION_CLOUD_KEY}`
)

export function getHttpClient(chain: Chain) {
  return createPublicClient({ chain, transport })
}
