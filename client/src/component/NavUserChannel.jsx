import React from "react";
import "../css/navUserChannel.css";

export default function NavUserChannel({ videosUser }) {
  return (
    <div className="navUserChannel ">
      <div className="channel_img">
        <img src="../../../images/hinh-anh-thien-nhien.jpg" alt="" />
      </div>
      {/* ==========================*/}
      <div className="nav_video flex align-items-center justify-content-between py-1 mt-5 mb-5 mx-5">
        <div className="flex align-items-center ">
          <div className="video">
            {videosUser.length > 0 && (
              <img src={videosUser[0].AvatarUrl} alt="" />
            )}
          </div>
          <div className="title_video mx-2">
            <div className="tite_ytb">
              <div className="title">
                {videosUser.length > 0 && <h3>{videosUser[0].ChannelName}</h3>}
              </div>
              <div className="userChannel mt-2">
                {videosUser.length > 0 && (
                  <b className="user">@{videosUser[0].Username}</b>
                )}
              </div>
              <div className="userChannel flex">
                <span className="user">0 luot xem </span>
                <span className="user mx-2">2032</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "10px 15px",
              borderRadius: "25px",
              fontSize: "18px",
            }}
          >
            Đăng kí
          </button>
        </div>
      </div>
    </div>
  );
}
