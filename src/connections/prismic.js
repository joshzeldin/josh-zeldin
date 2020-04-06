	
import Prismic from 'prismic-javascript'

const apiEndpoint = 'http://josh-web.prismic.io/api/v2'
 
export const prismicClient = Prismic.client(apiEndpoint, {})