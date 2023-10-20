import { validationCloudDomain } from '@/constants/config'
import { Chain, createPublicClient, http } from 'viem'

const transport = http(
  `https://${validationCloudDomain}/v1/${process.env.NEXT_PUBLIC_VALIDATION_CLOUD_KEY}`
)

export function getHttpClient(chain: Chain) {
  return createPublicClient({ chain, transport })
}
