import React from "react";
import "../css/navVideos.css";
import { Link } from "react-router-dom";

export default function NavVideos({ videos }) {
  const randomString = Math.random().toString(36).substring(2, 8);
  return (
    <div>
      {videos.length > 0 &&
        videos.map((e, i) => (
          <Link
            key={i}
            to={`/show-video/${e.VideoID}${randomString}`} 
            style={{ color: "black" }}
          >
            <div className="nav_videos flex py-1">
              <div className="video">
                <video
                  className="video_user"
                  src={e.URL}
                  controls
                  autoPlay={false}
                  type="video/mp4"
                ></video>
              </div>
              <div className="title_video mx-2">
                <div className="tite_ytb">
                  <div className="title">
                    <b>{e.Title}</b>
                  </div>
                  <div className="ChannelName mt-2">
                    <span className="user">{e.ChannelName}</span>
                  </div>
                  <div className="ChannelName flex">
                    <span className="user">{e.Views} luot xem </span>
                    <span className="user mx-2">{e.UploadDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
