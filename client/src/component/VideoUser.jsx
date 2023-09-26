import React from "react";
import { Link } from "react-router-dom";

export default function VideoUser({ videosUser }) {
  const randomString = Math.random().toString(36).substring(2, 8);
  return (
    <div>
      <div className="box_video">
        {videosUser.length > 0 &&
          videosUser.map((e, i) => (
            <div className="thong_tin_video" key={i}>
              <Link
                to={`/show-video/${e.VideoID}${randomString}`}
                style={{ color: "black" }}
              >
                <div className="avatar_video">
                  <video
                    className="video_user"
                    src={e.URL}
                    controls
                    autoPlay={false}
                    type="video/mp4"
                  ></video>
                </div>
                <div className="all_tieude">
                  <img className="avatar_user" src={e.AvatarUrl} alt="" />
                  <div className="tite_ytb">
                    <div className="title">{e.Title}</div>
                    <div>
                      <span className="user">{e.ChannelName}</span>
                    </div>
                    <div>
                      <span className="user">{e.Views} luot xem </span> .{" "}
                      <span className="user">{e.UploadDate}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
