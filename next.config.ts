import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Энийг заавал нэмнэ
  images: {
    unoptimized: true, // Статик экспортод заавал хэрэгтэй
  },
  /* бусад тохиргоонууд байвал доор нь үлдээж болно */
};

export default nextConfig;