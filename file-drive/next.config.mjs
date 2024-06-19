/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "dashing-husky-323.convex.cloud",
                pathname: "/**",
                protocol: "https",
                
            }
        ]
    }
};

export default nextConfig;
