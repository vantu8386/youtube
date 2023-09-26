import React from "react";

export default function SideBar({ subscribedChannels }) {

  return (
    <>
      <div className="content_ytb">
        <div className="style_scope_ytb">
          <div className="sidebar_content">
            <i className="fa-solid fa-house avatar_ytb"></i>
            <span className="ytb_text">Trang chủ</span>
          </div>
          <div className="sidebar_content">
            <i className="fa-solid fa-bolt avatar_ytb"></i>
            <span className="ytb_text">Shorts</span>
          </div>
          <div className="sidebar_content">
            <i className="fa-solid fa-tv avatar_ytb"></i>
            <span className="ytb_text">Đăng kí</span>
          </div>

          <hr />
          <div className="sidebar_content">
            <span className="material-symbols-outlined avatar_ytb">
              video_library
            </span>
            <span className="ytb_text">Thư viện</span>
          </div>
          <div className="sidebar_content">
            <span className="material-symbols-outlined avatar_ytb">pace</span>
            <span className="ytb_text">Video sử đã xem</span>
          </div>
          <div className="sidebar_content">
            <span className="material-symbols-outlined avatar_ytb">
              smart_display
            </span>
            <span className="ytb_text">Video của bạn</span>
          </div>
          <div className="sidebar_content">
            <span className="material-symbols-outlined avatar_ytb">
              settings_backup_restore
            </span>
            <span className="ytb_text">Xem sau</span>
          </div>
          <div className="sidebar_content">
            <span className="material-symbols-outlined avatar_ytb">
              thumb_up
            </span>
            <span className="ytb_text">Video đã thích</span>
          </div>
        </div>
        <hr />
        <div className="kenh_dang_ki">
          <h3>Kênh đăng kí</h3>
          {subscribedChannels.length > 0 &&
            subscribedChannels.map((channel) => (
              <div className="sidebar_content" key={channel}>
                <img className="avatar_ytb" src={channel.AvatarUrl} alt="" />
                <span className="ytb_text">{channel.ChannelName}</span>
              </div>
            ))}
        </div>
        <hr />
        <div className="kham_pha">
          <h3>Khám phá</h3>
          <div className="sidebar_content">
            <i className="fa-solid fa-fire avatar_ytb"></i>
            <span className="ytb_text">Thịnh hành</span>
          </div>
          <div className="sidebar_content">
            <i className="fa-solid fa-music avatar_ytb"></i>
            <span className="ytb_text">Âm nhạc</span>
          </div>
          <div className="sidebar_content">
            <i className="fa-solid fa-gamepad avatar_ytb"></i>
            <span className="ytb_text">Game</span>
          </div>
          <div className="sidebar_content">
            <i className="fa-regular fa-newspaper avatar_ytb"></i>
            <span className="ytb_text">Tin tức</span>
          </div>
          <div className="sidebar_content">
            <i className="fa-solid fa-trophy avatar_ytb"></i>
            <span className="ytb_text">Thể thao</span>
          </div>
        </div>
        <hr />
        <div className="other_YouTube_services">
          <h3>Dịch vụ khác của You Tube</h3>
          <div className="sidebar_content">
            <img
              className="avatar_ytb"
              src="../../../images/YouTube_Premium_logo.png"
              alt=""
            />
            <span className="ytb_text">YouTube Premium</span>
          </div>
          <div className="sidebar_content">
            <img
              className="avatar_ytb"
              src="../../../images/youtube-studio.png"
              alt=""
            />
            <span className="ytb_text">YouTube Studio</span>
          </div>
          <div className="sidebar_content">
            <img
              className="avatar_ytb"
              src="../../../images/youtube-music.png"
              alt=""
            />
            <span className="ytb_text">YouTube Music</span>
          </div>
          <div className="sidebar_content">
            <img
              className="avatar_ytb"
              src="../../../images/youtube-kids.png"
              alt=""
            />
            <span className="ytb_text">YouTube Kids</span>
          </div>
        </div>
        <hr />
        <div className="setting_ytb">
          <div className="sidebar_content">
            <i className="fa-solid fa-gear avatar_ytb"></i>
            <span className="ytb_text">Cài đặt</span>
          </div>
          <div className="sidebar_content">
            <i className="fa-solid fa-flag avatar_ytb"></i>
            <span className="ytb_text">Nhật kí báo cáo</span>
          </div>
          <div className="sidebar_content">
            <i className="fa-regular fa-circle-question avatar_ytb"></i>
            <span className="ytb_text">Trợ giúp</span>
          </div>
          <div className="sidebar_content">
            <i className="fa-solid fa-circle-exclamation avatar_ytb"></i>
            <span className="ytb_text">Gửi ý kiến phản hồi</span>
          </div>
        </div>
        <hr />
        <div className="gioi_thieu">
          <p>
            <strong>
              Giới thiệu Báo chí Bản quyền Liên hệ với chúng tôi Người sáng tạo
              Quảng cáo Nhà phát triển
            </strong>
          </p>
          <p>
            <strong>
              Điều khoản Quyền riêng tư Chính sách và an toàn Cách YouTube hoạt
              động Thử các tính năng mới
            </strong>
          </p>
          <p>© 2023 Google LLC</p>
        </div>
      </div>
    </>
  );
}
