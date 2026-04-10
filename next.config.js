/** @type {import('next').NextConfig} */
// const nextConfig = {
  

  module.exports ={
    reactStrictMode: true,
    images: {
    remotePatterns: [
      {
        hostname: 'image.tmdb.org'
      },
      {
        hostname: 'assets.nflxext.com'
      },
      {
        hostname: 'upload.wikimedia.org'
      },
      {
        hostname: 'occ-0-1190-2774.1.nflxso.net'
      },
      {
        hostname: 'i.ytimg.com'
      }
    ],  
  },
}
// }('https://image.tmdb.org/t/p/original/'),
 
// module.exports = nextConfig