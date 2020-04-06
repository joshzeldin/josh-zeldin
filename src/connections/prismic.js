	
import Prismic from 'prismic-javascript'

const apiEndpoint = 'https://josh-web.prismic.io/api/v2'
 
export const prismicClient = Prismic.client(apiEndpoint, {})