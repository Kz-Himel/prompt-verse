/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactCompiler: true,
//   // Turbopack এর জন্য নোড মডিউল ব্রাউজার সাইডে ইগনোর করার রুলস
//   experimental: {
//     turbo: {
//       resolveAlias: {
//         child_process: false,
//         fs: false,
//         net: false,
//         tls: false,
//         dns: false,
//       },
//     },
//   },
//   // সেফটি হিসেবে ট্র্যাডিশনাল ওয়েবপ্যাক ফলব্যাকও যোগ করে রাখা ভালো
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         child_process: false,
//         fs: false,
//         net: false,
//         tls: false,
//         dns: false,
//       };
//     }
//     return config;
//   },
// };

// export default nextConfig;