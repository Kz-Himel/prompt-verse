/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // এটি যেকোনো HTTPS ডোমেনের ইমেজ দেখানোর অনুমতি দেবে
      },
      {
        protocol: 'http',
        hostname: '**', // এটি যেকোনো HTTP ডোমেনের ইমেজ দেখানোর অনুমতি দেবে (ঐচ্ছিক)
      },
    ],
  },
};

export default nextConfig;