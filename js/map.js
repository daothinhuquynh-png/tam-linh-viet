/* ============================================================
   map.js – Leaflet map + location data + filter logic
   ============================================================ */

// ---- Data: Địa điểm ----
const LOCATIONS = [
  // HÀ NỘI
  {
    id: 1, name: 'Đền Ngọc Sơn', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0285, lng: 105.8524,
    address: 'Hồ Hoàn Kiếm, Hoàn Kiếm, Hà Nội',
    hours: '6:00 – 20:00', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
    desc: 'Đền Ngọc Sơn nằm trên đảo Ngọc giữa hồ Hoàn Kiếm, thờ Văn Xương Đế Quân và Hưng Đạo Đại Vương Trần Quốc Tuấn. Đây là một trong những địa điểm linh thiêng và nổi tiếng nhất của Hà Nội.',
    mapUrl: 'https://maps.google.com/?q=Den+Ngoc+Son+Ha+Noi'
  },
  {
    id: 2, name: 'Đền Quán Thánh', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0425, lng: 105.8423,
    address: 'Quán Thánh, Ba Đình, Hà Nội',
    hours: '7:00 – 18:00', img: 'https://images.unsplash.com/photo-1524350254031-ad3c35e0b981?w=600&q=80',
    desc: 'Một trong Tứ Trấn của thành Thăng Long, đền Quán Thánh thờ Huyền Thiên Trấn Vũ – vị thần trấn giữ phương Bắc. Đền nổi tiếng với bức tượng đồng đen lớn nhất Việt Nam.',
    mapUrl: 'https://maps.google.com/?q=Den+Quan+Thanh+Ha+Noi'
  },
  {
    id: 3, name: 'Chùa Một Cột', type: 'chua', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0355, lng: 105.8344,
    address: 'Đội Cấn, Ba Đình, Hà Nội',
    hours: '8:00 – 17:00', img: 'https://images.unsplash.com/photo-1585376979769-1e3c1e3e5456?w=600&q=80',
    desc: 'Chùa Một Cột là biểu tượng kiến trúc độc đáo của Hà Nội, được xây dựng từ năm 1049 dưới triều Lý Thái Tông. Ngôi chùa có hình dáng như bông sen nở trên mặt hồ.',
    mapUrl: 'https://maps.google.com/?q=Chua+Mot+Cot+Ha+Noi'
  },
  {
    id: 4, name: 'Đền Hai Bà Trưng', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 20.9935, lng: 105.8629,
    address: 'Đồng Nhân, Hai Bà Trưng, Hà Nội',
    hours: '6:30 – 18:00', img: 'https://images.unsplash.com/photo-1602640629153-21cbf29e5e2a?w=600&q=80',
    desc: 'Đền thờ Hai Bà Trưng – hai nữ anh hùng đầu tiên của dân tộc Việt Nam. Lễ hội đền được tổ chức hàng năm vào tháng Giêng âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Den+Hai+Ba+Trung+Ha+Noi'
  },
  {
    id: 5, name: 'Văn Miếu – Quốc Tử Giám', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0274, lng: 105.8355,
    address: 'Văn Miếu, Đống Đa, Hà Nội',
    hours: '8:00 – 17:00', img: 'https://images.unsplash.com/photo-1536599424071-0b215a388ba7?w=600&q=80',
    desc: 'Văn Miếu – Quốc Tử Giám là trường đại học đầu tiên của Việt Nam, thờ Khổng Tử và các bậc hiền triết. Di tích lịch sử văn hóa quan trọng của Hà Nội.',
    mapUrl: 'https://maps.google.com/?q=Van+Mieu+Ha+Noi'
  },
  // PHÚ THỌ
  {
    id: 6, name: 'Đền Hùng', type: 'den', province: 'phutho', provinceName: 'Phú Thọ',
    lat: 21.4059, lng: 105.3283,
    address: 'Núi Nghĩa Lĩnh, Hy Cương, Việt Trì, Phú Thọ',
    hours: '7:00 – 17:00', img: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80',
    desc: 'Khu di tích lịch sử Đền Hùng là nơi thờ phụng các Vua Hùng – tổ tiên của dân tộc Việt Nam. Giỗ Tổ Hùng Vương vào ngày 10/3 âm lịch là Quốc lễ của Việt Nam.',
    mapUrl: 'https://maps.google.com/?q=Den+Hung+Phu+Tho'
  },
  {
    id: 7, name: 'Đền Mẫu Âu Cơ', type: 'den', province: 'phutho', provinceName: 'Phú Thọ',
    lat: 21.6023, lng: 104.9891,
    address: 'Hiền Lương, Hạ Hòa, Phú Thọ',
    hours: '7:00 – 17:30', img: 'https://images.unsplash.com/photo-1504184858379-01b9e8b8a80e?w=600&q=80',
    desc: 'Đền thờ Mẫu Âu Cơ – người mẹ của dân tộc Việt Nam theo truyền thuyết. Lễ hội diễn ra vào ngày 7/1 âm lịch hàng năm.',
    mapUrl: 'https://maps.google.com/?q=Den+Mau+Au+Co+Phu+Tho'
  },
  // BẮC NINH
  {
    id: 8, name: 'Chùa Dâu', type: 'chua', province: 'bacninh', provinceName: 'Bắc Ninh',
    lat: 21.0021, lng: 106.0652,
    address: 'Thanh Khương, Thuận Thành, Bắc Ninh',
    hours: '6:00 – 18:00', img: 'https://images.unsplash.com/photo-1470246973918-29a93221edb5?w=600&q=80',
    desc: 'Chùa Dâu là ngôi chùa cổ nhất Việt Nam, được xây dựng từ thế kỷ II. Chùa thờ Tứ Pháp và là trung tâm Phật giáo lớn nhất miền Bắc từ thế kỷ III.',
    mapUrl: 'https://maps.google.com/?q=Chua+Dau+Bac+Ninh'
  },
  {
    id: 9, name: 'Chùa Bút Tháp', type: 'chua', province: 'bacninh', provinceName: 'Bắc Ninh',
    lat: 21.0105, lng: 106.0912,
    address: 'Đình Tổ, Thuận Thành, Bắc Ninh',
    hours: '6:30 – 17:30', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    desc: 'Chùa Bút Tháp nổi tiếng với tòa tháp Báo Nghiêm và pho tượng Phật Bà Quan Âm nghìn mắt nghìn tay bằng gỗ, được tạc năm 1656 – kiệt tác điêu khắc cổ đại.',
    mapUrl: 'https://maps.google.com/?q=Chua+But+Thap+Bac+Ninh'
  },
  // QUẢNG NINH
  {
    id: 10, name: 'Chùa Yên Tử', type: 'chua', province: 'quangninh', provinceName: 'Quảng Ninh',
    lat: 21.1219, lng: 106.7041,
    address: 'Thượng Yên Công, Uông Bí, Quảng Ninh',
    hours: '5:00 – 18:00', img: 'https://images.unsplash.com/photo-1509020900381-ee7f8bdb8e5c?w=600&q=80',
    desc: 'Yên Tử là trung tâm Phật giáo lớn, nơi Phật Hoàng Trần Nhân Tông sáng lập thiền phái Trúc Lâm. Hành hương leo núi Yên Tử là trải nghiệm tâm linh độc đáo.',
    mapUrl: 'https://maps.google.com/?q=Chua+Yen+Tu+Quang+Ninh'
  },
  {
    id: 11, name: 'Đền Cửa Ông', type: 'den', province: 'quangninh', provinceName: 'Quảng Ninh',
    lat: 21.0279, lng: 107.3635,
    address: 'Cửa Ông, Cẩm Phả, Quảng Ninh',
    hours: '6:00 – 18:00', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&q=80',
    desc: 'Đền Cửa Ông thờ Hoàng Cần – con trai Hưng Nhượng Vương Trần Quốc Tảng, người có công bảo vệ vùng biển Đông Bắc. Một trong những đền lớn và linh thiêng nhất Quảng Ninh.',
    mapUrl: 'https://maps.google.com/?q=Den+Cua+Ong+Quang+Ninh'
  },
  // HẢI PHÒNG
  {
    id: 12, name: 'Đền Nghè', type: 'den', province: 'haiphong', provinceName: 'Hải Phòng',
    lat: 20.8608, lng: 106.6836,
    address: 'An Biên, Lê Chân, Hải Phòng',
    hours: '6:30 – 18:00', img: 'https://images.unsplash.com/photo-1524350254031-ad3c35e0b981?w=600&q=80',
    desc: 'Đền Nghè thờ Lê Chân – nữ tướng của Hai Bà Trưng, người có công lập làng An Biên và khai sinh ra đất Hải Phòng. Lễ hội đền Nghè diễn ra vào tháng 2 âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Den+Nghe+Hai+Phong'
  },
  {
    id: 13, name: 'Đền Bà Đế', type: 'den', province: 'haiphong', provinceName: 'Hải Phòng',
    lat: 20.7011, lng: 106.8245,
    address: 'Đồ Sơn, Hải Phòng',
    hours: '6:00 – 18:00', img: 'https://images.unsplash.com/photo-1602640629153-21cbf29e5e2a?w=600&q=80',
    desc: 'Đền Bà Đế nằm trên bán đảo Đồ Sơn, thờ bà Đặng Thị Huệ – người có công bảo vệ ngư dân vùng biển. Đền nổi tiếng linh thiêng với người đi biển và ngư dân.',
    mapUrl: 'https://maps.google.com/?q=Den+Ba+De+Do+Son+Hai+Phong'
  },
  // HƯNG YÊN
  {
    id: 14, name: 'Đền Chử Đồng Tử', type: 'den', province: 'hungyen', provinceName: 'Hưng Yên',
    lat: 20.7781, lng: 106.0551,
    address: 'Dạ Trạch, Khoái Châu, Hưng Yên',
    hours: '7:00 – 17:00', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
    desc: 'Đền thờ Chử Đồng Tử – một trong Tứ Bất Tử của tín ngưỡng dân gian Việt Nam. Lễ hội Chử Đồng Tử diễn ra vào tháng 2 âm lịch hàng năm.',
    mapUrl: 'https://maps.google.com/?q=Den+Chu+Dong+Tu+Hung+Yen'
  },
  // LẠNG SƠN
  {
    id: 15, name: 'Đền Kỳ Cùng', type: 'den', province: 'langson', provinceName: 'Lạng Sơn',
    lat: 21.8524, lng: 106.7613,
    address: 'Kỳ Lừa, thành phố Lạng Sơn',
    hours: '6:00 – 18:00', img: 'https://images.unsplash.com/photo-1585376979769-1e3c1e3e5456?w=600&q=80',
    desc: 'Đền Kỳ Cùng thờ Quan lớn Tuần Tranh bên bờ sông Kỳ Cùng. Là trung tâm tín ngưỡng Tứ Phủ lớn nhất vùng Đông Bắc, nổi tiếng linh thiêng.',
    mapUrl: 'https://maps.google.com/?q=Den+Ky+Cung+Lang+Son'
  },
  {
    id: 16, name: 'Chùa Tam Thanh', type: 'chua', province: 'langson', provinceName: 'Lạng Sơn',
    lat: 21.8617, lng: 106.7541,
    address: 'Núi Tam Thanh, thành phố Lạng Sơn',
    hours: '7:00 – 17:00', img: 'https://images.unsplash.com/photo-1536599424071-0b215a388ba7?w=600&q=80',
    desc: 'Chùa Tam Thanh nằm trong hang đá núi vôi, với tượng Phật A Di Đà được tạc vào vách đá từ thế kỷ XVII. Cảnh quan thiên nhiên tuyệt đẹp kết hợp kiến trúc tâm linh.',
    mapUrl: 'https://maps.google.com/?q=Chua+Tam+Thanh+Lang+Son'
  },
  // YÊN BÁI
  {
    id: 17, name: 'Đền Đông Cuông', type: 'den', province: 'yenbai', provinceName: 'Yên Bái',
    lat: 21.7823, lng: 104.7451,
    address: 'Đông Cuông, Văn Yên, Yên Bái',
    hours: '6:00 – 18:00', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    desc: 'Đền Đông Cuông thờ Mẫu Đệ Nhị Thượng Ngàn, là một trong những đền Mẫu lớn nhất vùng núi phía Bắc. Lễ hội Đền Đông Cuông nổi tiếng với các nghi lễ hầu đồng.',
    mapUrl: 'https://maps.google.com/?q=Den+Dong+Cuong+Yen+Bai'
  },
  // HÀ NỘI – Bổ sung
  {
    id: 18, name: 'Gò Đống Đa', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0218, lng: 105.8411,
    address: 'Phường Quang Trung, Đống Đa, Hà Nội',
    hours: '7:00 – 18:00', img: 'https://images.unsplash.com/photo-1524350254031-ad3c35e0b981?w=600&q=80',
    desc: 'Gò Đống Đa là di tích lịch sử ghi dấu chiến thắng của vua Quang Trung – Nguyễn Huệ đánh tan 29 vạn quân Thanh năm 1789. Lễ hội diễn ra vào mùng 5 tháng Giêng hàng năm.',
    mapUrl: 'https://maps.google.com/?q=Go+Dong+Da+Ha+Noi'
  },
  {
    id: 19, name: 'Đền Gióng Sóc Sơn', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.2452, lng: 105.8512,
    address: 'Xã Phù Linh, Sóc Sơn, Hà Nội',
    hours: '6:00 – 18:00', img: 'https://images.unsplash.com/photo-1536599424071-0b215a388ba7?w=600&q=80',
    desc: 'Đền Gióng Sóc Sơn thờ Thánh Gióng – Phù Đổng Thiên Vương, một trong Tứ Bất Tử của tín ngưỡng dân gian Việt Nam. Lễ hội khai mạc mùng 6 tháng Giêng âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Den+Giong+Soc+Son+Ha+Noi'
  },
  {
    id: 20, name: 'Thành Cổ Loa', type: 'dinh', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.1124, lng: 105.8801,
    address: 'Xã Cổ Loa, Đông Anh, Hà Nội',
    hours: '7:00 – 17:30', img: 'https://images.unsplash.com/photo-1602640629153-21cbf29e5e2a?w=600&q=80',
    desc: 'Thành Cổ Loa là kinh đô nước Âu Lạc của An Dương Vương từ thế kỷ III TCN. Khu di tích gồm đền thờ An Dương Vương, đình Ngự Triều Di Quy và am Mị Châu.',
    mapUrl: 'https://maps.google.com/?q=Thanh+Co+Loa+Dong+Anh+Ha+Noi'
  },
  {
    id: 21, name: 'Đền Hai Bà Trưng – Mê Linh', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.1892, lng: 105.7412,
    address: 'Xã Mê Linh, Mê Linh, Hà Nội',
    hours: '6:30 – 18:00', img: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80',
    desc: 'Đền thờ Hai Bà Trưng tại Mê Linh – quê hương và nơi phát tích của cuộc khởi nghĩa chống quân Hán năm 40 SCN. Lễ hội diễn ra từ mùng 6 đến 10 tháng Giêng âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Den+Hai+Ba+Trung+Me+Linh+Ha+Noi'
  },
  {
    id: 22, name: 'Đền Tản Viên Sơn Thánh', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0681, lng: 105.3625,
    address: 'Xã Minh Quang & Ba Vì, Ba Vì, Hà Nội',
    hours: '6:00 – 18:00', img: 'https://images.unsplash.com/photo-1585376979769-1e3c1e3e5456?w=600&q=80',
    desc: 'Đền thờ Tản Viên Sơn Thánh – Sơn Tinh, một trong Tứ Bất Tử của tín ngưỡng dân gian Việt Nam. Nằm trên núi Ba Vì linh thiêng, lễ hội diễn ra từ 13 đến 15 tháng Giêng âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Den+Tan+Vien+Son+Thanh+Ba+Vi+Ha+Noi'
  },
  {
    id: 23, name: 'Đền Và', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.1385, lng: 105.4021,
    address: 'Phường Trung Hưng, Sơn Tây, Hà Nội',
    hours: '7:00 – 17:00', img: 'https://images.unsplash.com/photo-1509020900381-ee7f8bdb8e5c?w=600&q=80',
    desc: 'Đền Và thờ Tản Viên Sơn Thánh, là một trong bốn ngôi đền thờ Thánh Tản vùng Ba Vì. Lễ hội đền Và (tháng Giêng và tháng Chín âm lịch) nổi tiếng với lễ rước kiệu long trọng.',
    mapUrl: 'https://maps.google.com/?q=Den+Va+Son+Tay+Ha+Noi'
  },
  {
    id: 24, name: 'Phủ Tây Hồ', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0658, lng: 105.8254,
    address: 'Phường Quảng An, Tây Hồ, Hà Nội',
    hours: '6:00 – 20:00', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
    desc: 'Phủ Tây Hồ thờ Thánh Mẫu Liễu Hạnh – một trong Tứ Bất Tử của người Việt. Nằm trên bán đảo nhô ra hồ Tây, đây là nơi linh thiêng bậc nhất Hà Nội, tấp nập người đến lễ quanh năm.',
    mapUrl: 'https://maps.google.com/?q=Phu+Tay+Ho+Ha+Noi'
  },
  {
    id: 25, name: 'Chùa Thầy', type: 'chua', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 20.9741, lng: 105.5621,
    address: 'Xã Sài Sơn, Quốc Oai, Hà Nội',
    hours: '7:30 – 17:00', img: 'https://images.unsplash.com/photo-1470246973918-29a93221edb5?w=600&q=80',
    desc: 'Chùa Thầy gắn liền với Thiền sư Từ Đạo Hạnh, xây dựng từ thời Lý. Chùa nổi tiếng với cảnh quan núi non thơ mộng, hang động và lễ hội múa rối nước vào tháng 3 âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Chua+Thay+Quoc+Oai+Ha+Noi'
  },
  {
    id: 26, name: 'Chùa Láng', type: 'chua', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0248, lng: 105.8165,
    address: 'Phường Láng Thượng, Đống Đa, Hà Nội',
    hours: '7:00 – 17:30', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    desc: 'Chùa Láng (Chiêu Thiền Tự) thờ Thiền sư Từ Đạo Hạnh và vua Lý Thần Tông. Là ngôi chùa cổ kính giữa lòng Hà Nội, lễ hội chùa Láng diễn ra vào ngày 7 tháng 3 âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Chua+Lang+Dong+Da+Ha+Noi'
  },
  {
    id: 27, name: 'Đình Làng Lệ Mật', type: 'dinh', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0513, lng: 105.8891,
    address: 'Phường Việt Hưng, Long Biên, Hà Nội',
    hours: '7:00 – 17:00', img: 'https://images.unsplash.com/photo-1504184858379-01b9e8b8a80e?w=600&q=80',
    desc: 'Làng Lệ Mật nổi tiếng với nghề nuôi và bắt rắn truyền thống. Đình làng thờ Thành Hoàng làng – người khai phá 13 trại ở phía Tây Hà Nội. Lễ hội diễn ra từ 20 đến 23 tháng 3 âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Dinh+Lang+Le+Mat+Long+Bien+Ha+Noi'
  },
  {
    id: 28, name: 'Đền Gióng Phù Đổng', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0764, lng: 105.9451,
    address: 'Xã Phù Đổng, Gia Lâm, Hà Nội',
    hours: '6:00 – 18:00', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=600&q=80',
    desc: 'Đền Phù Đổng thờ Thánh Gióng – người anh hùng đánh giặc Ân từ thuở lên ba. Lễ hội Gióng Phù Đổng (7-9 tháng Tư âm lịch) là Di sản văn hóa phi vật thể của UNESCO.',
    mapUrl: 'https://maps.google.com/?q=Den+Giong+Phu+Dong+Gia+Lam+Ha+Noi'
  },
  // NAM ĐỊNH
  {
    id: 29, name: 'Đền Trần – Tức Mặc', type: 'den', province: 'namdinh', provinceName: 'Nam Định',
    lat: 20.4506, lng: 106.1762,
    address: 'Xã Lộc Vượng, TP. Nam Định',
    hours: '6:00 – 18:00', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
    desc: 'Khu di tích Đền Trần thờ 14 vị vua nhà Trần. Nổi tiếng nhất với lễ phát ấn đêm 14 tháng Giêng, hàng vạn người đổ về cầu may mắn, thăng tiến trong năm mới.',
    mapUrl: 'https://maps.google.com/?q=Den+Tran+Tuc+Mac+Nam+Dinh'
  },
  {
    id: 30, name: 'Phủ Giầy – Vụ Bản', type: 'den', province: 'namdinh', provinceName: 'Nam Định',
    lat: 20.3024, lng: 106.1481,
    address: 'Thị trấn Gôi, Vụ Bản, Nam Định',
    hours: '6:00 – 18:00', img: 'https://images.unsplash.com/photo-1602640629153-21cbf29e5e2a?w=600&q=80',
    desc: 'Phủ Giầy là quần thể di tích thờ Thánh Mẫu Liễu Hạnh – nơi bà giáng sinh lần thứ hai. Lễ hội Phủ Giầy vào tháng 3 âm lịch là lễ hội thờ Mẫu lớn nhất miền Bắc.',
    mapUrl: 'https://maps.google.com/?q=Phu+Giay+Vu+Ban+Nam+Dinh'
  },
  {
    id: 31, name: 'Chùa Cổ Lễ', type: 'chua', province: 'namdinh', provinceName: 'Nam Định',
    lat: 20.2741, lng: 106.2356,
    address: 'Thị trấn Cổ Lễ, Trực Ninh, Nam Định',
    hours: '6:00 – 17:30', img: 'https://images.unsplash.com/photo-1470246973918-29a93221edb5?w=600&q=80',
    desc: 'Chùa Cổ Lễ (Thần Quang Tự) có kiến trúc độc đáo kết hợp Phật giáo và tín ngưỡng dân gian. Ngôi chùa nằm trên hồ nước, nối với bờ bằng cầu đá cổ kính, tháp chuông 12 tầng cao 32m.',
    mapUrl: 'https://maps.google.com/?q=Chua+Co+Le+Nam+Dinh'
  },
  // NINH BÌNH
  {
    id: 32, name: 'Chùa Bái Đính', type: 'chua', province: 'ninhbinh', provinceName: 'Ninh Bình',
    lat: 20.3003, lng: 105.7862,
    address: 'Xã Gia Sinh, Gia Viễn, Ninh Bình',
    hours: '6:00 – 18:00', img: 'https://images.unsplash.com/photo-1509020900381-ee7f8bdb8e5c?w=600&q=80',
    desc: 'Chùa Bái Đính là quần thể chùa lớn nhất Đông Nam Á với nhiều kỷ lục Việt Nam. Tượng Phật Di Lặc bằng đồng cao 10m, hành lang 500 vị La Hán, và tháp chuông đồ sộ.',
    mapUrl: 'https://maps.google.com/?q=Chua+Bai+Dinh+Ninh+Binh'
  },
  {
    id: 33, name: 'Tràng An – Bích Động', type: 'chua', province: 'ninhbinh', provinceName: 'Ninh Bình',
    lat: 20.2539, lng: 105.8371,
    address: 'Xã Trường Yên, Hoa Lư, Ninh Bình',
    hours: '7:00 – 17:00', img: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80',
    desc: 'Tràng An là Di sản thiên nhiên – văn hóa thế giới kép đầu tiên của Việt Nam. Quần thể bao gồm các đền, chùa cổ kính trong lòng núi đá vôi và hang động tuyệt đẹp.',
    mapUrl: 'https://maps.google.com/?q=Trang+An+Ninh+Binh'
  },
  {
    id: 34, name: 'Đền Đinh Tiên Hoàng – Hoa Lư', type: 'den', province: 'ninhbinh', provinceName: 'Ninh Bình',
    lat: 20.2773, lng: 105.8891,
    address: 'Xã Trường Yên, Hoa Lư, Ninh Bình',
    hours: '7:00 – 17:30', img: 'https://images.unsplash.com/photo-1536599424071-0b215a388ba7?w=600&q=80',
    desc: 'Đền thờ Đinh Tiên Hoàng – vị vua đầu tiên thống nhất đất nước Đại Cồ Việt. Khu di tích Cố đô Hoa Lư là nơi gắn với lịch sử triều Đinh – Lê, một trong những kinh đô cổ nhất Việt Nam.',
    mapUrl: 'https://maps.google.com/?q=Den+Dinh+Tien+Hoang+Hoa+Lu+Ninh+Binh'
  },
  // THÁI BÌNH
  {
    id: 35, name: 'Chùa Keo – Vũ Thư', type: 'chua', province: 'thaibinh', provinceName: 'Thái Bình',
    lat: 20.4721, lng: 106.3401,
    address: 'Xã Duy Nhất, Vũ Thư, Thái Bình',
    hours: '6:00 – 18:00', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    desc: 'Chùa Keo (Thần Quang Tự) là công trình kiến trúc gỗ cổ bậc nhất Việt Nam, xây dựng từ thế kỷ XVII. Gác chuông 3 tầng 11 mái là tuyệt tác nghệ thuật kiến trúc đã trải qua hơn 400 năm.',
    mapUrl: 'https://maps.google.com/?q=Chua+Keo+Vu+Thu+Thai+Binh'
  },
  {
    id: 36, name: 'Đền Trần – Tiến Đức', type: 'den', province: 'thaibinh', provinceName: 'Thái Bình',
    lat: 20.5236, lng: 106.3852,
    address: 'Xã Tiến Đức, Hưng Hà, Thái Bình',
    hours: '7:00 – 17:00', img: 'https://images.unsplash.com/photo-1504184858379-01b9e8b8a80e?w=600&q=80',
    desc: 'Khu di tích đền Trần Thái Bình là quê hương gốc của vương triều Trần, thờ các vua và tướng lĩnh nhà Trần. Lễ hội khai ấn diễn ra long trọng vào tháng Giêng âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Den+Tran+Tien+Duc+Thai+Binh'
  },
  // THANH HÓA
  {
    id: 37, name: 'Đền Bà Triệu', type: 'den', province: 'thanhhoa', provinceName: 'Thanh Hóa',
    lat: 19.9254, lng: 105.6731,
    address: 'Xã Triệu Lộc, Hậu Lộc, Thanh Hóa',
    hours: '7:00 – 17:00', img: 'https://images.unsplash.com/photo-1524350254031-ad3c35e0b981?w=600&q=80',
    desc: 'Đền thờ Triệu Thị Trinh (Bà Triệu) – nữ anh hùng dân tộc cưỡi voi đánh giặc Đông Ngô năm 248. Lễ hội đền Bà Triệu vào 22/2 âm lịch là một trong những lễ hội lớn của Thanh Hóa.',
    mapUrl: 'https://maps.google.com/?q=Den+Ba+Trieu+Thanh+Hoa'
  },
  {
    id: 38, name: 'Điện Lam Kinh', type: 'den', province: 'thanhhoa', provinceName: 'Thanh Hóa',
    lat: 20.0781, lng: 105.3652,
    address: 'Xã Xuân Lam, Thọ Xuân, Thanh Hóa',
    hours: '7:00 – 17:00', img: 'https://images.unsplash.com/photo-1585376979769-1e3c1e3e5456?w=600&q=80',
    desc: 'Khu di tích Lam Kinh là kinh đô thứ hai của nhà Lê, nơi an táng các vua Lê từ Lê Thái Tổ. Lễ hội Lam Kinh (22/8 âm lịch) tưởng niệm ngày mất vua Lê Lợi với nhiều nghi lễ truyền thống đặc sắc.',
    mapUrl: 'https://maps.google.com/?q=Dien+Lam+Kinh+Tho+Xuan+Thanh+Hoa'
  },
  // HÀ NAM
  {
    id: 39, name: 'Đền Trần Thương', type: 'den', province: 'hanam', provinceName: 'Hà Nam',
    lat: 20.5571, lng: 106.0981,
    address: 'Xã Nhân Thịnh, Lý Nhân, Hà Nam',
    hours: '6:30 – 18:00', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80',
    desc: 'Đền Trần Thương thờ Hưng Đạo Đại Vương Trần Quốc Tuấn – vị tướng ba lần đánh thắng quân Nguyên Mông. Là nơi lưu giữ kho lương thực của quân đội nhà Trần trong các trận chiến lịch sử.',
    mapUrl: 'https://maps.google.com/?q=Den+Tran+Thuong+Ly+Nhan+Ha+Nam'
  },
  {
    id: 40, name: 'Chùa Long Đọi Sơn', type: 'chua', province: 'hanam', provinceName: 'Hà Nam',
    lat: 20.5013, lng: 105.9741,
    address: 'Xã Đọi Sơn, Duy Tiên, Hà Nam',
    hours: '7:00 – 17:30', img: 'https://images.unsplash.com/photo-1470246973918-29a93221edb5?w=600&q=80',
    desc: 'Chùa Long Đọi Sơn trên đỉnh núi Đọi là di tích quốc gia đặc biệt, xây dựng từ thời Lý Thánh Tông (1054). Nơi đây có bia đá "Sùng Thiện Diên Linh" – bảo vật quốc gia từ thế kỷ XII.',
    mapUrl: 'https://maps.google.com/?q=Chua+Long+Doi+Son+Ha+Nam'
  }
];

// ---- State ----
let currentType = 'all';
let currentProvince = 'all';
let currentSearch = '';
let map = null;
let markers = {};

// ---- Merge dữ liệu admin từ localStorage ----
(function mergeAdminData() {
  const saved = localStorage.getItem('tlv_locations');
  if (saved) {
    try {
      const adminData = JSON.parse(saved);
      if (Array.isArray(adminData) && adminData.length) {
        LOCATIONS.length = 0;
        adminData.forEach(l => LOCATIONS.push(l));
      }
    } catch(e) { /* Giữ nguyên dữ liệu gốc nếu lỗi */ }
  }
})();

// ---- Init ----
if (document.getElementById('map')) {
  document.addEventListener('DOMContentLoaded', () => {
    initMap();
    renderList(LOCATIONS);
    addMarkers(LOCATIONS);
    handleUrlParam();
  });
}

function initMap() {
  map = L.map('map', {
    center: [21.1, 106.0],
    zoom: 8,
    zoomControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);
}

function makeIcon(type) {
  const colors = { den: '#C0392B', chua: '#2E7D32', dinh: '#5D4037' };
  const color = colors[type] || '#C0392B';
  return L.divIcon({
    className: '',
    html: `<div style="width:28px;height:28px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;font-size:12px;color:white;font-weight:700;">${type === 'den' ? '⛩' : type === 'chua' ? '🪷' : '🏛'}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
}

function addMarkers(locations) {
  // Clear old
  Object.values(markers).forEach(m => map.removeLayer(m));
  markers = {};

  locations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng], { icon: makeIcon(loc.type) })
      .addTo(map)
      .bindPopup(`
        <div style="font-family:'Noto Serif',serif;min-width:180px;">
          <strong style="color:#922B21;font-size:0.9rem;">${loc.name}</strong><br>
          <span style="font-size:0.75rem;color:#888;">${loc.address}</span><br>
          <a onclick="openModal(${loc.id})" style="color:#C0392B;font-size:0.8rem;cursor:pointer;margin-top:4px;display:inline-block;">Xem chi tiết →</a>
        </div>
      `);
    marker.on('click', () => {
      highlightItem(loc.id);
    });
    markers[loc.id] = marker;
  });
}

function renderList(locations) {
  const list = document.getElementById('locationList');
  const count = document.getElementById('resultCount');
  count.textContent = `${locations.length} địa điểm`;

  if (!locations.length) {
    list.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text-light);font-style:italic;">Không tìm thấy địa điểm phù hợp</div>';
    return;
  }

  list.innerHTML = locations.map(loc => `
    <div class="loc-item" id="item-${loc.id}" onclick="openModal(${loc.id}); highlightItem(${loc.id}); flyTo(${loc.id})">
      <div class="loc-thumb">
        <img src="${loc.img}" alt="${loc.name}" loading="lazy">
      </div>
      <div class="loc-info">
        <div class="loc-name">${loc.name}</div>
        <div class="loc-addr">📍 ${loc.address}</div>
        <div class="loc-tags">
          <span class="loc-tag ${loc.type}">${loc.type === 'den' ? '🏮 Đền' : loc.type === 'chua' ? '🪷 Chùa' : '🏛️ Đình'}</span>
          <span class="loc-tag" style="background:rgba(212,175,55,0.1);color:#A07820;">${loc.provinceName}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function filterLocations() {
  const filtered = LOCATIONS.filter(loc => {
    const matchType     = currentType === 'all' || loc.type === currentType;
    const matchProvince = currentProvince === 'all' || loc.province === currentProvince;
    const matchSearch   = !currentSearch || loc.name.toLowerCase().includes(currentSearch.toLowerCase()) || loc.address.toLowerCase().includes(currentSearch.toLowerCase());
    return matchType && matchProvince && matchSearch;
  });
  renderList(filtered);
  addMarkers(filtered);
  if (filtered.length && map) {
    const group = L.featureGroup(Object.values(markers));
    if (Object.keys(markers).length) map.fitBounds(group.getBounds().pad(0.2));
  }
}

function setTypeFilter(el, type) {
  currentType = type;
  document.querySelectorAll('#typeFilter .chip-sm').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  filterLocations();
}

function setProvinceFilter(el, province) {
  currentProvince = province;
  document.querySelectorAll('#provinceFilter .chip-sm').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  filterLocations();
}

window.filterLocations = function() {
  currentSearch = document.getElementById('searchBox').value;
  filterLocations();
};

function highlightItem(id) {
  document.querySelectorAll('.loc-item').forEach(el => el.classList.remove('active'));
  const el = document.getElementById('item-' + id);
  if (el) { el.classList.add('active'); el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }
}

function flyTo(id) {
  const loc = LOCATIONS.find(l => l.id === id);
  if (loc && map) { map.flyTo([loc.lat, loc.lng], 14, { animate: true, duration: 0.8 }); }
  if (markers[id]) { setTimeout(() => markers[id].openPopup(), 900); }
}

// ---- Modal ----
function openModal(id) {
  const loc = LOCATIONS.find(l => l.id === id);
  if (!loc) return;
  document.getElementById('modalImg').src = loc.img;
  document.getElementById('modalImg').alt = loc.name;
  document.getElementById('modalTitle').textContent = loc.name;
  document.getElementById('modalTags').innerHTML = `
    <span class="loc-tag ${loc.type}" style="font-size:0.75rem;padding:0.2rem 0.6rem;">${loc.type === 'den' ? '🏮 Đền' : loc.type === 'chua' ? '🪷 Chùa' : '🏛️ Đình'}</span>
    <span class="loc-tag" style="background:rgba(212,175,55,0.1);color:#A07820;font-size:0.75rem;padding:0.2rem 0.6rem;">${loc.provinceName}</span>
  `;
  document.getElementById('modalMeta').innerHTML = `
    <span class="modal-meta-item">📍 ${loc.address}</span>
    <span class="modal-meta-item">🕐 ${loc.hours}</span>
  `;
  document.getElementById('modalDesc').textContent = loc.desc;
  document.getElementById('modalMapBtn').href = loc.mapUrl;
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModalBtn();
}

function closeModalBtn() {
  document.getElementById('modalOverlay').classList.remove('open');
}

// ---- Handle URL param ----
function handleUrlParam() {
  const params = new URLSearchParams(window.location.search);
  const tinh = params.get('tinh');
  if (tinh) {
    const el = document.querySelector(`[data-p="${tinh}"]`);
    if (el) { setProvinceFilter(el, tinh); }
  }
}

// Expose to inline handlers
window.setTypeFilter = setTypeFilter;
window.setProvinceFilter = setProvinceFilter;
window.openModal = openModal;
window.closeModal = closeModal;
window.closeModalBtn = closeModalBtn;
window.highlightItem = highlightItem;
window.flyTo = flyTo;
