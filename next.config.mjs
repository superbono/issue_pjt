/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avatar에서 이미지를 가져올때(ref) 에러가 걸리는 경우 아래의 로직을 적용한다.
  // async headers() {
  //   return [
  //     {
  //       source: "/:path",
  //       headers: [{ key: "referrer-policy", value: "no-referrer" }],
  //     },
  //   ];
  // },
};

export default nextConfig;
