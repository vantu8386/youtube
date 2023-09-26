import React, { useEffect, useState } from "react";
import "../css/home.css";
import "../css/mainSidebBar.css";
import "../css/mainVideoHome.css";
import Headers from "../component/Headers";
import SideBar from "../component/SideBar";

import axios from "axios";
import NavUserChannel from "../component/NavUserChannel";
import VideoUser from "../component/VideoUser";
import { useParams } from "react-router-dom";

export default function UserChangePage() {
    const [videosUser, setVideosUser] = useState([]);
    const [subscribedChannels, setSubscribedChannels] = useState([]);
    // console.log("UserChangePage-subscribedChannels:", subscribedChannels)
    const storedUser = localStorage.getItem("UserName");
    let { username } = useParams();

    const loadVideos = () => {
      axios
        .get(`http://localhost:3000/api/v1/channel/${username}`)
        .then((res) => {
          setVideosUser(
            res.data.username.map((video) => {
              const uploadDate = new Date(video.UploadDate);
              const currentDate = new Date();
              const dateTime = Math.floor(
                (currentDate - uploadDate) / (1000 * 60 * 60 * 24)
              );
              if (dateTime === 0) {
                video.UploadDate = "Hôm nay";
              } else if (dateTime === 1) {
                video.UploadDate = "Hôm trước";
              } else {
                video.UploadDate = dateTime + "Ngày trước";
              }
  
              if (video.AvatarUrl === null) {
                video.AvatarUrl = "../../../images/user.png";
              }
              return video;
            })
          );
          
        })
        .catch((err) => console.log(err));
    };

    const loadSubscribedChannels = () => {
      const username = storedUser;
      axios
        .get(`http://localhost:3000/api/v1/users/subscriptions/${username}`)
        .then((res) => {
          // console.log(res.data.subscribedChannels); 
          setSubscribedChannels(res.data.subscribedChannels);
          if (subscribedChannels.AvatarUrl === null) {
            videoData.AvatarUrl = "../../../images/user.png";
          }
        })
        .catch((err) => console.log(err));
    };
  
    useEffect(() => {
      loadVideos();
      loadSubscribedChannels()
    }, []);
  return (
    <>
    <div className="root ">
      <div className="content_wrapper w-auto p-3">
        <header className="top_header">
          <Headers />
        </header>
        <main className="">
          <div className="row all-content">
            <div className="overflow-y-auto col-2 content_side_bar">
              <SideBar subscribedChannels={subscribedChannels}/>
            </div>
            <div className="col-10 all_video">
                <div>
                    <NavUserChannel videosUser={videosUser} />
                </div>
              <div className="nav_video">
                <button>TRANG CHỦ</button>
                <button>VIDEOc</button>
                <button>GIỚI THIỆU</button>
                <button>PODCAST</button>
                <button>DANH SÁCH PHÁT</button>
                <button>CỘNG ĐỒNG</button>
                <button>KÊNH</button>
                <button>GIỚI THIỆU</button>
              </div>
              <hr />
              <div className="videos">
                <VideoUser videosUser={videosUser}/>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </>
  );
}
