import { useRouter } from "next/router";
function WatchVideoPage() {
  const { query } = useRouter();
  console.log(query);
  return (
    <div>
      <video
        src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/videos/${query.videoId}`}
        width="800px"
        autoPlay
        controls
        id="video-player"
      />
    </div>
  );
}

export default WatchVideoPage;
