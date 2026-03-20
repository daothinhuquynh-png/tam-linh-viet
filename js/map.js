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
    hours: '6:00 – 20:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền Ngọc Sơn nằm trên đảo Ngọc giữa hồ Hoàn Kiếm, thờ Văn Xương Đế Quân và Hưng Đạo Đại Vương Trần Quốc Tuấn. Đây là một trong những địa điểm linh thiêng và nổi tiếng nhất của Hà Nội.',
    mapUrl: 'https://maps.google.com/?q=Den+Ngoc+Son+Ha+Noi'
  },
  {
    id: 2, name: 'Đền Quán Thánh', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0425, lng: 105.8423,
    address: 'Quán Thánh, Ba Đình, Hà Nội',
    hours: '7:00 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Một trong Tứ Trấn của thành Thăng Long, đền Quán Thánh thờ Huyền Thiên Trấn Vũ – vị thần trấn giữ phương Bắc. Đền nổi tiếng với bức tượng đồng đen lớn nhất Việt Nam.',
    mapUrl: 'https://maps.google.com/?q=Den+Quan+Thanh+Ha+Noi'
  },
  {
    id: 3, name: 'Chùa Một Cột', type: 'chua', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0355, lng: 105.8344,
    address: 'Đội Cấn, Ba Đình, Hà Nội',
    hours: '8:00 – 17:00', img: 'assets/places/chua-generic.svg',
    desc: 'Chùa Một Cột là biểu tượng kiến trúc độc đáo của Hà Nội, được xây dựng từ năm 1049 dưới triều Lý Thái Tông. Ngôi chùa có hình dáng như bông sen nở trên mặt hồ.',
    mapUrl: 'https://maps.google.com/?q=Chua+Mot+Cot+Ha+Noi'
  },
  {
    id: 4, name: 'Đền Hai Bà Trưng', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 20.9935, lng: 105.8629,
    address: 'Đồng Nhân, Hai Bà Trưng, Hà Nội',
    hours: '6:30 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền thờ Hai Bà Trưng – hai nữ anh hùng đầu tiên của dân tộc Việt Nam. Lễ hội đền được tổ chức hàng năm vào tháng Giêng âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Den+Hai+Ba+Trung+Ha+Noi'
  },
  {
    id: 5, name: 'Văn Miếu – Quốc Tử Giám', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0274, lng: 105.8355,
    address: 'Văn Miếu, Đống Đa, Hà Nội',
    hours: '8:00 – 17:00', img: 'assets/places/den-generic.svg',
    desc: 'Văn Miếu – Quốc Tử Giám là trường đại học đầu tiên của Việt Nam, thờ Khổng Tử và các bậc hiền triết. Di tích lịch sử văn hóa quan trọng của Hà Nội.',
    mapUrl: 'https://maps.google.com/?q=Van+Mieu+Ha+Noi'
  },
  // PHÚ THỌ
  {
    id: 6, name: 'Đền Hùng', type: 'den', province: 'phutho', provinceName: 'Phú Thọ',
    lat: 21.4059, lng: 105.3283,
    address: 'Núi Nghĩa Lĩnh, Hy Cương, Việt Trì, Phú Thọ',
    hours: '7:00 – 17:00', img: 'assets/places/den-generic.svg',
    desc: 'Khu di tích lịch sử Đền Hùng là nơi thờ phụng các Vua Hùng – tổ tiên của dân tộc Việt Nam. Giỗ Tổ Hùng Vương vào ngày 10/3 âm lịch là Quốc lễ của Việt Nam.',
    mapUrl: 'https://maps.google.com/?q=Den+Hung+Phu+Tho'
  },
  {
    id: 7, name: 'Đền Mẫu Âu Cơ', type: 'den', province: 'phutho', provinceName: 'Phú Thọ',
    lat: 21.6023, lng: 104.9891,
    address: 'Hiền Lương, Hạ Hòa, Phú Thọ',
    hours: '7:00 – 17:30', img: 'assets/places/den-generic.svg',
    desc: 'Đền thờ Mẫu Âu Cơ – người mẹ của dân tộc Việt Nam theo truyền thuyết. Lễ hội diễn ra vào ngày 7/1 âm lịch hàng năm.',
    mapUrl: 'https://maps.google.com/?q=Den+Mau+Au+Co+Phu+Tho'
  },
  // BẮC NINH
  {
    id: 8, name: 'Chùa Dâu', type: 'chua', province: 'bacninh', provinceName: 'Bắc Ninh',
    lat: 21.0021, lng: 106.0652,
    address: 'Thanh Khương, Thuận Thành, Bắc Ninh',
    hours: '6:00 – 18:00', img: 'assets/places/chua-generic.svg',
    desc: 'Chùa Dâu là ngôi chùa cổ nhất Việt Nam, được xây dựng từ thế kỷ II. Chùa thờ Tứ Pháp và là trung tâm Phật giáo lớn nhất miền Bắc từ thế kỷ III.',
    mapUrl: 'https://maps.google.com/?q=Chua+Dau+Bac+Ninh'
  },
  {
    id: 9, name: 'Chùa Bút Tháp', type: 'chua', province: 'bacninh', provinceName: 'Bắc Ninh',
    lat: 21.0105, lng: 106.0912,
    address: 'Đình Tổ, Thuận Thành, Bắc Ninh',
    hours: '6:30 – 17:30', img: 'assets/places/chua-generic.svg',
    desc: 'Chùa Bút Tháp nổi tiếng với tòa tháp Báo Nghiêm và pho tượng Phật Bà Quan Âm nghìn mắt nghìn tay bằng gỗ, được tạc năm 1656 – kiệt tác điêu khắc cổ đại.',
    mapUrl: 'https://maps.google.com/?q=Chua+But+Thap+Bac+Ninh'
  },
  // QUẢNG NINH
  {
    id: 10, name: 'Chùa Yên Tử', type: 'chua', province: 'quangninh', provinceName: 'Quảng Ninh',
    lat: 21.1219, lng: 106.7041,
    address: 'Thượng Yên Công, Uông Bí, Quảng Ninh',
    hours: '5:00 – 18:00', img: 'assets/places/chua-generic.svg',
    desc: 'Yên Tử là trung tâm Phật giáo lớn, nơi Phật Hoàng Trần Nhân Tông sáng lập thiền phái Trúc Lâm. Hành hương leo núi Yên Tử là trải nghiệm tâm linh độc đáo.',
    mapUrl: 'https://maps.google.com/?q=Chua+Yen+Tu+Quang+Ninh'
  },
  {
    id: 11, name: 'Đền Cửa Ông', type: 'den', province: 'quangninh', provinceName: 'Quảng Ninh',
    lat: 21.0279, lng: 107.3635,
    address: 'Cửa Ông, Cẩm Phả, Quảng Ninh',
    hours: '6:00 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền Cửa Ông thờ Hoàng Cần – con trai Hưng Nhượng Vương Trần Quốc Tảng, người có công bảo vệ vùng biển Đông Bắc. Một trong những đền lớn và linh thiêng nhất Quảng Ninh.',
    mapUrl: 'https://maps.google.com/?q=Den+Cua+Ong+Quang+Ninh'
  },
  // HẢI PHÒNG
  {
    id: 12, name: 'Đền Nghè', type: 'den', province: 'haiphong', provinceName: 'Hải Phòng',
    lat: 20.8608, lng: 106.6836,
    address: 'An Biên, Lê Chân, Hải Phòng',
    hours: '6:30 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền Nghè thờ Lê Chân – nữ tướng của Hai Bà Trưng, người có công lập làng An Biên và khai sinh ra đất Hải Phòng. Lễ hội đền Nghè diễn ra vào tháng 2 âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Den+Nghe+Hai+Phong'
  },
  {
    id: 13, name: 'Đền Bà Đế', type: 'den', province: 'haiphong', provinceName: 'Hải Phòng',
    lat: 20.7011, lng: 106.8245,
    address: 'Đồ Sơn, Hải Phòng',
    hours: '6:00 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền Bà Đế nằm trên bán đảo Đồ Sơn, thờ bà Đặng Thị Huệ – người có công bảo vệ ngư dân vùng biển. Đền nổi tiếng linh thiêng với người đi biển và ngư dân.',
    mapUrl: 'https://maps.google.com/?q=Den+Ba+De+Do+Son+Hai+Phong'
  },
  // HƯNG YÊN
  {
    id: 14, name: 'Đền Chử Đồng Tử', type: 'den', province: 'hungyen', provinceName: 'Hưng Yên',
    lat: 20.7781, lng: 106.0551,
    address: 'Dạ Trạch, Khoái Châu, Hưng Yên',
    hours: '7:00 – 17:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền thờ Chử Đồng Tử – một trong Tứ Bất Tử của tín ngưỡng dân gian Việt Nam. Lễ hội Chử Đồng Tử diễn ra vào tháng 2 âm lịch hàng năm.',
    mapUrl: 'https://maps.google.com/?q=Den+Chu+Dong+Tu+Hung+Yen'
  },
  // LẠNG SƠN
  {
    id: 15, name: 'Đền Kỳ Cùng', type: 'den', province: 'langson', provinceName: 'Lạng Sơn',
    lat: 21.8524, lng: 106.7613,
    address: 'Kỳ Lừa, thành phố Lạng Sơn',
    hours: '6:00 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền Kỳ Cùng thờ Quan lớn Tuần Tranh bên bờ sông Kỳ Cùng. Là trung tâm tín ngưỡng Tứ Phủ lớn nhất vùng Đông Bắc, nổi tiếng linh thiêng.',
    mapUrl: 'https://maps.google.com/?q=Den+Ky+Cung+Lang+Son'
  },
  {
    id: 16, name: 'Chùa Tam Thanh', type: 'chua', province: 'langson', provinceName: 'Lạng Sơn',
    lat: 21.8617, lng: 106.7541,
    address: 'Núi Tam Thanh, thành phố Lạng Sơn',
    hours: '7:00 – 17:00', img: 'assets/places/chua-generic.svg',
    desc: 'Chùa Tam Thanh nằm trong hang đá núi vôi, với tượng Phật A Di Đà được tạc vào vách đá từ thế kỷ XVII. Cảnh quan thiên nhiên tuyệt đẹp kết hợp kiến trúc tâm linh.',
    mapUrl: 'https://maps.google.com/?q=Chua+Tam+Thanh+Lang+Son'
  },
  // YÊN BÁI
  {
    id: 17, name: 'Đền Đông Cuông', type: 'den', province: 'yenbai', provinceName: 'Yên Bái',
    lat: 21.7823, lng: 104.7451,
    address: 'Đông Cuông, Văn Yên, Yên Bái',
    hours: '6:00 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền Đông Cuông thờ Mẫu Đệ Nhị Thượng Ngàn, là một trong những đền Mẫu lớn nhất vùng núi phía Bắc. Lễ hội Đền Đông Cuông nổi tiếng với các nghi lễ hầu đồng.',
    mapUrl: 'https://maps.google.com/?q=Den+Dong+Cuong+Yen+Bai'
  },
  // HÀ NỘI – Bổ sung
  {
    id: 18, name: 'Gò Đống Đa', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0218, lng: 105.8411,
    address: 'Phường Quang Trung, Đống Đa, Hà Nội',
    hours: '7:00 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Gò Đống Đa là di tích lịch sử ghi dấu chiến thắng của vua Quang Trung – Nguyễn Huệ đánh tan 29 vạn quân Thanh năm 1789. Lễ hội diễn ra vào mùng 5 tháng Giêng hàng năm.',
    mapUrl: 'https://maps.google.com/?q=Go+Dong+Da+Ha+Noi'
  },
  {
    id: 19, name: 'Đền Gióng Sóc Sơn', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.2452, lng: 105.8512,
    address: 'Xã Phù Linh, Sóc Sơn, Hà Nội',
    hours: '6:00 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền Gióng Sóc Sơn thờ Thánh Gióng – Phù Đổng Thiên Vương, một trong Tứ Bất Tử của tín ngưỡng dân gian Việt Nam. Lễ hội khai mạc mùng 6 tháng Giêng âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Den+Giong+Soc+Son+Ha+Noi'
  },
  {
    id: 20, name: 'Thành Cổ Loa', type: 'dinh', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.1124, lng: 105.8801,
    address: 'Xã Cổ Loa, Đông Anh, Hà Nội',
    hours: '7:00 – 17:30', img: 'assets/places/dinh-generic.svg',
    desc: 'Thành Cổ Loa là kinh đô nước Âu Lạc của An Dương Vương từ thế kỷ III TCN. Khu di tích gồm đền thờ An Dương Vương, đình Ngự Triều Di Quy và am Mị Châu.',
    mapUrl: 'https://maps.google.com/?q=Thanh+Co+Loa+Dong+Anh+Ha+Noi'
  },
  {
    id: 21, name: 'Đền Hai Bà Trưng – Mê Linh', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.1892, lng: 105.7412,
    address: 'Xã Mê Linh, Mê Linh, Hà Nội',
    hours: '6:30 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền thờ Hai Bà Trưng tại Mê Linh – quê hương và nơi phát tích của cuộc khởi nghĩa chống quân Hán năm 40 SCN. Lễ hội diễn ra từ mùng 6 đến 10 tháng Giêng âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Den+Hai+Ba+Trung+Me+Linh+Ha+Noi'
  },
  {
    id: 22, name: 'Đền Tản Viên Sơn Thánh', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0681, lng: 105.3625,
    address: 'Xã Minh Quang & Ba Vì, Ba Vì, Hà Nội',
    hours: '6:00 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền thờ Tản Viên Sơn Thánh – Sơn Tinh, một trong Tứ Bất Tử của tín ngưỡng dân gian Việt Nam. Nằm trên núi Ba Vì linh thiêng, lễ hội diễn ra từ 13 đến 15 tháng Giêng âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Den+Tan+Vien+Son+Thanh+Ba+Vi+Ha+Noi'
  },
  {
    id: 41, name: 'Đền Trung – Trung Cung Tản Viên', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0785, lng: 105.3518,
    address: 'Sườn Tây núi Tản Viên, Xã Ba Vì, H. Ba Vì, Hà Nội',
    hours: '7:00 – 17:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền Trung (Trung Cung, Đền Ba Dân) thờ Tam vị Đức Thánh: Tản Viên Sơn Thánh (chính giữa), Cao Sơn Đại Vương và Quý Minh Đại Vương. Xây dựng khoảng 208-179 TCN do An Dương Vương sắc lập. Tên "Ba Dân" do ba cộng đồng dân Mường (Thủ Pháp), dân Kinh làng Vô Khuy và làng Ngọc Nhĩ cùng phụng thờ. Tổng Cẩm Đái (4 làng: Cẩm Đái, Vô Khuy, Bằng Tạ, Ngọc Nhĩ) giữ lệ Trưởng Tạo Lệ – Tây Thần Cung, là dân Anh Cả của các làng thờ Thánh Tản vùng Ba Vì.',
    mapUrl: 'https://maps.google.com/?q=Den+Trung+Tan+Vien+Ba+Vi'
  },
  {
    id: 42, name: 'Cụm Đình Đền Tổng Cẩm Đái', type: 'dinh', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.1051, lng: 105.3412,
    address: 'Xã Cẩm Lĩnh, H. Ba Vì, Hà Nội',
    hours: '7:00 – 17:00', img: 'assets/places/dinh-generic.svg',
    desc: 'Cụm đình đền của 4 làng cổ tổng Cẩm Đái (Cẩm Đái, Vô Khuy, Bằng Tạ, Ngọc Nhĩ) – dân Anh Cả vùng thờ Thánh Tản Viên ở Ba Vì. Tổng Cẩm Đái giữ lệ Trưởng Tạo Lệ Tây Thần Cung Đền Trung, mỗi năm 1 làng cử thủ từ lo hương lửa đền miếu trên núi. 4 làng thay nhau mở hội Tiệc Đại Trà đầu xuân (Cẩm Đái 15/1, Vô Khuy 15/1, Bằng Tạ 1-2/2, Ngọc Nhĩ 15/3) thuộc hàng Quốc tế. Xưa dân tổng giữ lệ rước thánh từ làng lên đền Trung ~20km qua rừng núi, đốt đuốc khua chiêng trống đuổi hổ báo. Sau loạn cuối TK19 (giặc Cờ Đen, dịch tả), dân suy sút, bỏ lệ rước.',
    mapUrl: 'https://maps.google.com/?q=Cam+Linh+Ba+Vi+Ha+Noi'
  },
  {
    id: 23, name: 'Đền Và', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.1385, lng: 105.4021,
    address: 'Phường Trung Hưng, Sơn Tây, Hà Nội',
    hours: '7:00 – 17:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền Và thờ Tản Viên Sơn Thánh, là một trong bốn ngôi đền thờ Thánh Tản vùng Ba Vì. Lễ hội đền Và (tháng Giêng và tháng Chín âm lịch) nổi tiếng với lễ rước kiệu long trọng.',
    mapUrl: 'https://maps.google.com/?q=Den+Va+Son+Tay+Ha+Noi'
  },
  {
    id: 24, name: 'Phủ Tây Hồ', type: 'phu', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0658, lng: 105.8254,
    address: 'Phường Quảng An, Tây Hồ, Hà Nội',
    hours: '6:00 – 20:00', img: 'assets/places/den-generic.svg',
    desc: 'Phủ Tây Hồ thờ Thánh Mẫu Liễu Hạnh – một trong Tứ Bất Tử của người Việt. Nằm trên bán đảo nhô ra hồ Tây, đây là nơi linh thiêng bậc nhất Hà Nội, tấp nập người đến lễ quanh năm.',
    mapUrl: 'https://maps.google.com/?q=Phu+Tay+Ho+Ha+Noi'
  },
  {
    id: 25, name: 'Chùa Thầy', type: 'chua', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 20.9741, lng: 105.5621,
    address: 'Xã Sài Sơn, Quốc Oai, Hà Nội',
    hours: '7:30 – 17:00', img: 'assets/places/chua-generic.svg',
    desc: 'Chùa Thầy gắn liền với Thiền sư Từ Đạo Hạnh, xây dựng từ thời Lý. Chùa nổi tiếng với cảnh quan núi non thơ mộng, hang động và lễ hội múa rối nước vào tháng 3 âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Chua+Thay+Quoc+Oai+Ha+Noi'
  },
  {
    id: 26, name: 'Chùa Láng', type: 'chua', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0248, lng: 105.8165,
    address: 'Phường Láng Thượng, Đống Đa, Hà Nội',
    hours: '7:00 – 17:30', img: 'assets/places/chua-generic.svg',
    desc: 'Chùa Láng (Chiêu Thiền Tự) thờ Thiền sư Từ Đạo Hạnh và vua Lý Thần Tông. Là ngôi chùa cổ kính giữa lòng Hà Nội, lễ hội chùa Láng diễn ra vào ngày 7 tháng 3 âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Chua+Lang+Dong+Da+Ha+Noi'
  },
  {
    id: 27, name: 'Đình Làng Lệ Mật', type: 'dinh', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0513, lng: 105.8891,
    address: 'Phường Việt Hưng, Long Biên, Hà Nội',
    hours: '7:00 – 17:00', img: 'assets/places/dinh-generic.svg',
    desc: 'Làng Lệ Mật nổi tiếng với nghề nuôi và bắt rắn truyền thống. Đình làng thờ Thành Hoàng làng – người khai phá 13 trại ở phía Tây Hà Nội. Lễ hội diễn ra từ 20 đến 23 tháng 3 âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Dinh+Lang+Le+Mat+Long+Bien+Ha+Noi'
  },
  {
    id: 28, name: 'Đền Gióng Phù Đổng', type: 'den', province: 'hanoi', provinceName: 'Hà Nội',
    lat: 21.0764, lng: 105.9451,
    address: 'Xã Phù Đổng, Gia Lâm, Hà Nội',
    hours: '6:00 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền Phù Đổng thờ Thánh Gióng – người anh hùng đánh giặc Ân từ thuở lên ba. Lễ hội Gióng Phù Đổng (7-9 tháng Tư âm lịch) là Di sản văn hóa phi vật thể của UNESCO.',
    mapUrl: 'https://maps.google.com/?q=Den+Giong+Phu+Dong+Gia+Lam+Ha+Noi'
  },
  // NAM ĐỊNH
  {
    id: 29, name: 'Đền Trần – Tức Mặc', type: 'den', province: 'namdinh', provinceName: 'Nam Định',
    lat: 20.4506, lng: 106.1762,
    address: 'Xã Lộc Vượng, TP. Nam Định',
    hours: '6:00 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Khu di tích Đền Trần thờ 14 vị vua nhà Trần. Nổi tiếng nhất với lễ phát ấn đêm 14 tháng Giêng, hàng vạn người đổ về cầu may mắn, thăng tiến trong năm mới.',
    mapUrl: 'https://maps.google.com/?q=Den+Tran+Tuc+Mac+Nam+Dinh'
  },
  {
    id: 30, name: 'Phủ Giầy – Vụ Bản', type: 'phu', province: 'namdinh', provinceName: 'Nam Định',
    lat: 20.3024, lng: 106.1481,
    address: 'Thị trấn Gôi, Vụ Bản, Nam Định',
    hours: '6:00 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Phủ Giầy là quần thể di tích thờ Thánh Mẫu Liễu Hạnh – nơi bà giáng sinh lần thứ hai. Lễ hội Phủ Giầy vào tháng 3 âm lịch là lễ hội thờ Mẫu lớn nhất miền Bắc.',
    mapUrl: 'https://maps.google.com/?q=Phu+Giay+Vu+Ban+Nam+Dinh'
  },
  {
    id: 31, name: 'Chùa Cổ Lễ', type: 'chua', province: 'namdinh', provinceName: 'Nam Định',
    lat: 20.2741, lng: 106.2356,
    address: 'Thị trấn Cổ Lễ, Trực Ninh, Nam Định',
    hours: '6:00 – 17:30', img: 'assets/places/chua-generic.svg',
    desc: 'Chùa Cổ Lễ (Thần Quang Tự) có kiến trúc độc đáo kết hợp Phật giáo và tín ngưỡng dân gian. Ngôi chùa nằm trên hồ nước, nối với bờ bằng cầu đá cổ kính, tháp chuông 12 tầng cao 32m.',
    mapUrl: 'https://maps.google.com/?q=Chua+Co+Le+Nam+Dinh'
  },
  // NINH BÌNH
  {
    id: 32, name: 'Chùa Bái Đính', type: 'chua', province: 'ninhbinh', provinceName: 'Ninh Bình',
    lat: 20.3003, lng: 105.7862,
    address: 'Xã Gia Sinh, Gia Viễn, Ninh Bình',
    hours: '6:00 – 18:00', img: 'assets/places/chua-generic.svg',
    desc: 'Chùa Bái Đính là quần thể chùa lớn nhất Đông Nam Á với nhiều kỷ lục Việt Nam. Tượng Phật Di Lặc bằng đồng cao 10m, hành lang 500 vị La Hán, và tháp chuông đồ sộ.',
    mapUrl: 'https://maps.google.com/?q=Chua+Bai+Dinh+Ninh+Binh'
  },
  {
    id: 33, name: 'Tràng An – Bích Động', type: 'chua', province: 'ninhbinh', provinceName: 'Ninh Bình',
    lat: 20.2539, lng: 105.8371,
    address: 'Xã Trường Yên, Hoa Lư, Ninh Bình',
    hours: '7:00 – 17:00', img: 'assets/places/chua-generic.svg',
    desc: 'Tràng An là Di sản thiên nhiên – văn hóa thế giới kép đầu tiên của Việt Nam. Quần thể bao gồm các đền, chùa cổ kính trong lòng núi đá vôi và hang động tuyệt đẹp.',
    mapUrl: 'https://maps.google.com/?q=Trang+An+Ninh+Binh'
  },
  {
    id: 34, name: 'Đền Đinh Tiên Hoàng – Hoa Lư', type: 'den', province: 'ninhbinh', provinceName: 'Ninh Bình',
    lat: 20.2773, lng: 105.8891,
    address: 'Xã Trường Yên, Hoa Lư, Ninh Bình',
    hours: '7:00 – 17:30', img: 'assets/places/den-generic.svg',
    desc: 'Đền thờ Đinh Tiên Hoàng – vị vua đầu tiên thống nhất đất nước Đại Cồ Việt. Khu di tích Cố đô Hoa Lư là nơi gắn với lịch sử triều Đinh – Lê, một trong những kinh đô cổ nhất Việt Nam.',
    mapUrl: 'https://maps.google.com/?q=Den+Dinh+Tien+Hoang+Hoa+Lu+Ninh+Binh'
  },
  // THÁI BÌNH
  {
    id: 35, name: 'Chùa Keo – Vũ Thư', type: 'chua', province: 'thaibinh', provinceName: 'Thái Bình',
    lat: 20.4721, lng: 106.3401,
    address: 'Xã Duy Nhất, Vũ Thư, Thái Bình',
    hours: '6:00 – 18:00', img: 'assets/places/chua-generic.svg',
    desc: 'Chùa Keo (Thần Quang Tự) là công trình kiến trúc gỗ cổ bậc nhất Việt Nam, xây dựng từ thế kỷ XVII. Gác chuông 3 tầng 11 mái là tuyệt tác nghệ thuật kiến trúc đã trải qua hơn 400 năm.',
    mapUrl: 'https://maps.google.com/?q=Chua+Keo+Vu+Thu+Thai+Binh'
  },
  {
    id: 36, name: 'Đền Trần – Tiến Đức', type: 'den', province: 'thaibinh', provinceName: 'Thái Bình',
    lat: 20.5236, lng: 106.3852,
    address: 'Xã Tiến Đức, Hưng Hà, Thái Bình',
    hours: '7:00 – 17:00', img: 'assets/places/den-generic.svg',
    desc: 'Khu di tích đền Trần Thái Bình là quê hương gốc của vương triều Trần, thờ các vua và tướng lĩnh nhà Trần. Lễ hội khai ấn diễn ra long trọng vào tháng Giêng âm lịch.',
    mapUrl: 'https://maps.google.com/?q=Den+Tran+Tien+Duc+Thai+Binh'
  },
  // THANH HÓA
  {
    id: 37, name: 'Đền Bà Triệu', type: 'den', province: 'thanhhoa', provinceName: 'Thanh Hóa',
    lat: 19.9254, lng: 105.6731,
    address: 'Xã Triệu Lộc, Hậu Lộc, Thanh Hóa',
    hours: '7:00 – 17:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền thờ Triệu Thị Trinh (Bà Triệu) – nữ anh hùng dân tộc cưỡi voi đánh giặc Đông Ngô năm 248. Lễ hội đền Bà Triệu vào 22/2 âm lịch là một trong những lễ hội lớn của Thanh Hóa.',
    mapUrl: 'https://maps.google.com/?q=Den+Ba+Trieu+Thanh+Hoa'
  },
  {
    id: 38, name: 'Điện Lam Kinh', type: 'den', province: 'thanhhoa', provinceName: 'Thanh Hóa',
    lat: 20.0781, lng: 105.3652,
    address: 'Xã Xuân Lam, Thọ Xuân, Thanh Hóa',
    hours: '7:00 – 17:00', img: 'assets/places/den-generic.svg',
    desc: 'Khu di tích Lam Kinh là kinh đô thứ hai của nhà Lê, nơi an táng các vua Lê từ Lê Thái Tổ. Lễ hội Lam Kinh (22/8 âm lịch) tưởng niệm ngày mất vua Lê Lợi với nhiều nghi lễ truyền thống đặc sắc.',
    mapUrl: 'https://maps.google.com/?q=Dien+Lam+Kinh+Tho+Xuan+Thanh+Hoa'
  },
  // HÀ NAM
  {
    id: 39, name: 'Đền Trần Thương', type: 'den', province: 'hanam', provinceName: 'Hà Nam',
    lat: 20.5571, lng: 106.0981,
    address: 'Xã Nhân Thịnh, Lý Nhân, Hà Nam',
    hours: '6:30 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền Trần Thương thờ Hưng Đạo Đại Vương Trần Quốc Tuấn – vị tướng ba lần đánh thắng quân Nguyên Mông. Là nơi lưu giữ kho lương thực của quân đội nhà Trần trong các trận chiến lịch sử.',
    mapUrl: 'https://maps.google.com/?q=Den+Tran+Thuong+Ly+Nhan+Ha+Nam'
  },
  {
    id: 40, name: 'Chùa Long Đọi Sơn', type: 'chua', province: 'hanam', provinceName: 'Hà Nam',
    lat: 20.5013, lng: 105.9741,
    address: 'Xã Đọi Sơn, Duy Tiên, Hà Nam',
    hours: '7:00 – 17:30', img: 'assets/places/chua-generic.svg',
    desc: 'Chùa Long Đọi Sơn trên đỉnh núi Đọi là di tích quốc gia đặc biệt, xây dựng từ thời Lý Thánh Tông (1054). Nơi đây có bia đá "Sùng Thiện Diên Linh" – bảo vật quốc gia từ thế kỷ XII.',
    mapUrl: 'https://maps.google.com/?q=Chua+Long+Doi+Son+Ha+Nam'
  },

  // ================================================================
  // MIỀN TRUNG
  // ================================================================
  {
    id: 43, name: 'Đền Cuông', type: 'den', province: 'nghean', provinceName: 'Nghệ An',
    lat: 18.9431, lng: 105.6712,
    address: 'Xã Diễn An, H. Diễn Châu, Nghệ An',
    hours: '7:00 – 17:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền Cuông thờ Thục An Dương Vương, gắn với truyền thuyết về cái chết bi thương của nhà vua bên bờ biển Diễn Châu. Di tích lịch sử quốc gia.',
    mapUrl: 'https://maps.google.com/?q=Den+Cuong+Dien+Chau+Nghe+An'
  },
  {
    id: 44, name: 'Đền Cả – Dinh Đô Quan Hoàng Mười', type: 'den', province: 'hatinh', provinceName: 'Hà Tĩnh',
    lat: 18.6782, lng: 105.7614,
    address: 'Xã Xuân Hồng, H. Nghi Xuân, Hà Tĩnh',
    hours: '6:00 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Đền Cả – Dinh Đô Quan Hoàng Mười là đền thờ Tứ Phủ lớn nhất xứ Nghệ. Quan Hoàng Mười – vị quan văn võ song toàn, phù hộ cầu tài cầu lộc.',
    mapUrl: 'https://maps.google.com/?q=Den+Ca+Nghi+Xuan+Ha+Tinh'
  },
  {
    id: 45, name: 'Điện Hòn Chén – Huệ Nam Điện', type: 'den', province: 'hue', provinceName: 'Thừa Thiên Huế',
    lat: 16.4241, lng: 107.5452,
    address: 'Xã Hương Thọ, TX. Hương Trà, Thừa Thiên Huế',
    hours: '7:00 – 17:00', img: 'assets/places/den-generic.svg',
    desc: 'Điện Hòn Chén (Huệ Nam Điện) thờ Thánh Mẫu Thiên Y A Na bên bờ sông Hương. Lễ hội nổi tiếng với rước thuyền trên sông Hương, thu hút hàng ngàn tín đồ.',
    mapUrl: 'https://maps.google.com/?q=Dien+Hon+Chen+Hue'
  },
  {
    id: 46, name: 'Lăng Thờ Cá Ông – Thanh Khê', type: 'den', province: 'danang', provinceName: 'Đà Nẵng',
    lat: 16.0671, lng: 108.2022,
    address: 'P. Thanh Khê Đông, Q. Thanh Khê, Đà Nẵng',
    hours: '7:00 – 17:00', img: 'assets/places/den-generic.svg',
    desc: 'Lăng thờ Cá Ông (Cá Voi) là trung tâm tín ngưỡng của ngư dân Đà Nẵng. Lễ hội Cầu Ngư diễn ra hàng năm với nghi lễ cúng cá Ông, hát bội, đua thuyền trên sông Hàn.',
    mapUrl: 'https://maps.google.com/?q=Lang+Ca+Ong+Thanh+Khe+Da+Nang'
  },
  {
    id: 47, name: 'Tháp Bà Ponagar', type: 'den', province: 'khanhhoa', provinceName: 'Khánh Hòa',
    lat: 12.2655, lng: 109.1948,
    address: 'P. Vĩnh Phước, TP. Nha Trang, Khánh Hòa',
    hours: '6:00 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Tháp Bà Ponagar là quần thể tháp Chăm cổ thờ Thiên Y A Na Thánh Mẫu, giao thoa văn hóa Chăm – Việt. Lễ hội Tháp Bà (tháng 2 AL) có nghi lễ mục dục, múa Chăm đặc sắc.',
    mapUrl: 'https://maps.google.com/?q=Thap+Ba+Ponagar+Nha+Trang'
  },
  {
    id: 48, name: 'Tháp Pô Klong Garai', type: 'den', province: 'ninhthuan', provinceName: 'Ninh Thuận',
    lat: 11.5951, lng: 108.9912,
    address: 'P. Đô Vinh, TP. Phan Rang – Tháp Chàm, Ninh Thuận',
    hours: '7:00 – 17:00', img: 'assets/places/den-generic.svg',
    desc: 'Tháp Pô Klong Garai là tháp Chăm đẹp nhất còn nguyên vẹn, thờ vua Pô Klong Garai. Lễ hội Katê – lễ hội lớn nhất người Chăm Bà La Môn – diễn ra tại đây hàng năm.',
    mapUrl: 'https://maps.google.com/?q=Thap+Po+Klong+Garai+Ninh+Thuan'
  },
  {
    id: 49, name: 'Bảo Tàng Quang Trung – Tây Sơn', type: 'den', province: 'binhdinh', provinceName: 'Bình Định',
    lat: 13.8421, lng: 109.0021,
    address: 'TT. Phú Phong, H. Tây Sơn, Bình Định',
    hours: '7:00 – 17:00', img: 'assets/places/den-generic.svg',
    desc: 'Bảo tàng Quang Trung – nơi thờ Hoàng đế Quang Trung Nguyễn Huệ tại quê hương Tây Sơn. Lễ hội Đống Đa – Tây Sơn (mùng 5 tháng Giêng) có biểu diễn võ thuật Bình Định và trống trận.',
    mapUrl: 'https://maps.google.com/?q=Bao+Tang+Quang+Trung+Tay+Son+Binh+Dinh'
  },

  // ================================================================
  // TÂY NGUYÊN
  // ================================================================
  {
    id: 50, name: 'Nhà Rông Kon Klor', type: 'dinh', province: 'gialai', provinceName: 'Gia Lai',
    lat: 13.9782, lng: 108.0012,
    address: 'TP. Kon Tum & TP. Pleiku, Gia Lai',
    hours: 'Cả ngày', img: 'assets/places/dinh-generic.svg',
    desc: 'Nhà Rông là biểu tượng văn hóa Tây Nguyên, nơi diễn ra các nghi lễ cồng chiêng, lễ Pơ Thi (Bỏ Mả) của đồng bào Ba Na, Gia Rai. Không gian cồng chiêng Tây Nguyên là Di sản UNESCO.',
    mapUrl: 'https://maps.google.com/?q=Nha+Rong+Kon+Klor+Kon+Tum'
  },

  // ================================================================
  // MIỀN NAM
  // ================================================================
  {
    id: 51, name: 'Chùa Ông Bổn – Nhị Phủ Miếu', type: 'chua', province: 'hcm', provinceName: 'TP. Hồ Chí Minh',
    lat: 10.7521, lng: 106.6583,
    address: 'P. 11, Q. 5, TP. Hồ Chí Minh',
    hours: '6:00 – 18:00', img: 'assets/places/chua-generic.svg',
    desc: 'Chùa Ông Bổn (Nhị Phủ Miếu) là ngôi miếu cổ lớn nhất của cộng đồng người Hoa tại TP.HCM. Lễ hội Chùa Ông Bổn (12-13 tháng Giêng) có diễu hành múa lân rồng hoành tráng qua Chợ Lớn.',
    mapUrl: 'https://maps.google.com/?q=Nhi+Phu+Mieu+Quan+5+Ho+Chi+Minh'
  },
  {
    id: 52, name: 'Chùa Bà Thiên Hậu – Bình Dương', type: 'chua', province: 'binhduong', provinceName: 'Bình Dương',
    lat: 11.0012, lng: 106.6521,
    address: 'P. Phú Cường, TP. Thủ Dầu Một, Bình Dương',
    hours: '6:00 – 18:00', img: 'assets/places/chua-generic.svg',
    desc: 'Chùa Bà Thiên Hậu Bình Dương là trung tâm tín ngưỡng lớn nhất của người Hoa miền Nam. Lễ hội rằm tháng Giêng có diễu hành múa lân sư rồng hoành tráng thu hút hàng chục vạn người.',
    mapUrl: 'https://maps.google.com/?q=Chua+Ba+Thien+Hau+Binh+Duong'
  },
  {
    id: 53, name: 'Núi Bà Đen – Linh Sơn Thánh Mẫu', type: 'den', province: 'tayninh', provinceName: 'Tây Ninh',
    lat: 11.3571, lng: 106.1121,
    address: 'Xã Thạnh Tân, TP. Tây Ninh, Tây Ninh',
    hours: '5:00 – 18:00', img: 'assets/places/den-generic.svg',
    desc: 'Núi Bà Đen (986m) – ngọn núi cao nhất miền Nam, thờ Linh Sơn Thánh Mẫu. Hàng trăm ngàn người hành hương mỗi dịp đầu năm. Điểm du lịch tâm linh hàng đầu Nam Bộ.',
    mapUrl: 'https://maps.google.com/?q=Nui+Ba+Den+Tay+Ninh'
  },
  {
    id: 54, name: 'Miếu Bà Chúa Xứ Núi Sam', type: 'den', province: 'angiang', provinceName: 'An Giang',
    lat: 10.7091, lng: 105.1132,
    address: 'P. Núi Sam, TP. Châu Đốc, An Giang',
    hours: '5:00 – 20:00', img: 'assets/places/den-generic.svg',
    desc: 'Miếu Bà Chúa Xứ Núi Sam là miếu thờ lớn nhất miền Tây Nam Bộ, thu hút hàng triệu lượt khách mỗi năm. Lễ hội Vía Bà (23-27 tháng 4 AL) có nghi lễ tắm bà, thay áo mão trang nghiêm.',
    mapUrl: 'https://maps.google.com/?q=Mieu+Ba+Chua+Xu+Nui+Sam+Chau+Doc'
  },
  {
    id: 55, name: 'Chùa Dơi – Mahatúp', type: 'chua', province: 'soctrang', provinceName: 'Sóc Trăng',
    lat: 9.6012, lng: 105.9812,
    address: 'P. 3, TP. Sóc Trăng, Sóc Trăng',
    hours: '7:00 – 17:00', img: 'assets/places/chua-generic.svg',
    desc: 'Chùa Dơi (Mahatúp) là chùa Khmer cổ nổi tiếng với đàn dơi hàng ngàn con. Lễ hội Ok Om Bok của đồng bào Khmer (rằm tháng 9 AL) có đua ghe ngo trên sông Maspéro.',
    mapUrl: 'https://maps.google.com/?q=Chua+Doi+Soc+Trang'
  },
  {
    id: 56, name: 'Chùa Ông Biên Hòa – Thất Phủ Cổ Miếu', type: 'chua', province: 'dongnai', provinceName: 'Đồng Nai',
    lat: 10.9482, lng: 106.8241,
    address: 'P. Thanh Bình, TP. Biên Hòa, Đồng Nai',
    hours: '6:00 – 18:00', img: 'assets/places/chua-generic.svg',
    desc: 'Chùa Ông (Thất Phủ Cổ Miếu) Biên Hòa là ngôi miếu cổ nhất của cộng đồng người Hoa miền Đông Nam Bộ. Lễ hội rằm tháng 8 có diễu hành, múa lân sư rồng truyền thống.',
    mapUrl: 'https://maps.google.com/?q=Chua+Ong+Bien+Hoa+Dong+Nai'
  },

  // ================================================================
  // HOÀNG SA & TRƯỜNG SA – LÃNH THỔ VIỆT NAM
  // ================================================================
  {
    id: 57, name: 'Quần Đảo Hoàng Sa', type: 'den', province: 'hoangsa', provinceName: 'Huyện Hoàng Sa, TP. Đà Nẵng',
    lat: 16.5000, lng: 112.0000,
    address: 'Huyện Hoàng Sa, TP. Đà Nẵng, Việt Nam',
    hours: 'Lãnh thổ Việt Nam',
    img: 'assets/places/den-generic.svg',
    desc: 'Quần đảo Hoàng Sa là lãnh thổ thiêng liêng của Việt Nam, thuộc huyện Hoàng Sa, TP. Đà Nẵng. Từ thế kỷ XVII, các chúa Nguyễn đã cử đội Hoàng Sa ra khai thác, cắm mốc và bảo vệ chủ quyền. Việt Nam có đầy đủ bằng chứng lịch sử và pháp lý về chủ quyền đối với quần đảo Hoàng Sa.',
    mapUrl: 'https://maps.google.com/?q=Hoang+Sa+Islands+Vietnam'
  },
  {
    id: 58, name: 'Quần Đảo Trường Sa', type: 'den', province: 'truongsa', provinceName: 'Huyện Trường Sa, Khánh Hòa',
    lat: 8.6500, lng: 111.9200,
    address: 'Huyện Trường Sa, Tỉnh Khánh Hòa, Việt Nam',
    hours: 'Lãnh thổ Việt Nam',
    img: 'assets/places/den-generic.svg',
    desc: 'Quần đảo Trường Sa là lãnh thổ thiêng liêng của Việt Nam, thuộc huyện Trường Sa, tỉnh Khánh Hòa. Trên các đảo có chùa, nhà tưởng niệm và đài liệt sĩ. Hải quân Việt Nam bảo vệ chủ quyền biển đảo. Việt Nam có đầy đủ bằng chứng lịch sử và pháp lý khẳng định chủ quyền.',
    mapUrl: 'https://maps.google.com/?q=Truong+Sa+Islands+Vietnam'
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
    buildProvinceSelect();
    initMap();
    renderList(LOCATIONS);
    addMarkers(LOCATIONS);
    handleUrlParam();
  });
}

// ---- Auto-generate province dropdown from data ----
function buildProvinceSelect() {
  const select = document.getElementById('provinceSelect');
  if (!select) return;

  // Get unique provinces with count
  const seen = new Map();
  LOCATIONS.forEach(loc => {
    if (!seen.has(loc.province)) {
      seen.set(loc.province, { name: loc.provinceName, count: 1 });
    } else {
      seen.get(loc.province).count++;
    }
  });

  // Sort alphabetically
  const sorted = [...seen.entries()].sort((a, b) => a[1].name.localeCompare(b[1].name, 'vi'));
  sorted.forEach(([code, info]) => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = `${info.name} (${info.count})`;
    select.appendChild(opt);
  });
}

window.onProvinceSelect = function(province) {
  currentProvince = province;
  applyFilter();
};

function initMap() {
  map = L.map('map', {
    center: [21.0, 105.8],
    zoom: 8,
    zoomControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);

  // Auto-fit to show all locations
  if (LOCATIONS.length) {
    const bounds = L.latLngBounds(LOCATIONS.map(l => [l.lat, l.lng]));
    map.fitBounds(bounds.pad(0.15));
  }
}

function makeIcon(type, isSovereignty) {
  if (isSovereignty) {
    return L.divIcon({
      className: '',
      html: `<div style="width:36px;height:36px;border-radius:50%;background:#D4AF37;border:3px solid #C0392B;box-shadow:0 2px 12px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;font-size:16px;color:#C0392B;font-weight:900;">🇻🇳</div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });
  }
  const colors = { den: '#C0392B', chua: '#2E7D32', dinh: '#5D4037', phu: '#8E24AA' };
  const icons  = { den: '⛩', chua: '🪷', dinh: '🏛', phu: '⛩' };
  const color = colors[type] || '#C0392B';
  const icon  = icons[type] || '⛩';
  return L.divIcon({
    className: '',
    html: `<div style="width:28px;height:28px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;font-size:12px;color:white;font-weight:700;">${icon}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
}

function addMarkers(locations) {
  // Clear old
  Object.values(markers).forEach(m => map.removeLayer(m));
  markers = {};

  locations.forEach(loc => {
    const isSov = loc.province === 'hoangsa' || loc.province === 'truongsa';
    const marker = L.marker([loc.lat, loc.lng], { icon: makeIcon(loc.type, isSov) })
      .addTo(map)
      .bindPopup(`
        <div style="font-family:'Noto Serif',serif;min-width:200px;">
          <strong style="color:${isSov ? '#D4AF37' : '#922B21'};font-size:0.9rem;">${isSov ? '🇻🇳 ' : ''}${loc.name}</strong><br>
          <span style="font-size:0.75rem;color:#888;">${loc.address}</span><br>
          ${isSov ? `<span style="font-size:0.78rem;color:#C0392B;font-weight:700;">Lãnh thổ thiêng liêng của Việt Nam</span>` :
            `<a onclick="openModal(${loc.id})" style="color:#C0392B;font-size:0.8rem;cursor:pointer;margin-top:4px;display:inline-block;">Xem chi tiết →</a>`}
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
          <span class="loc-tag ${loc.type}">${getTypeLabel(loc.type)}</span>
          <span class="loc-tag" style="background:rgba(212,175,55,0.1);color:#A07820;">${loc.provinceName}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function applyFilter() {
  const searchBox = document.getElementById('searchBox');
  if (searchBox) currentSearch = searchBox.value;

  const filtered = LOCATIONS.filter(loc => {
    const matchType     = currentType === 'all' || loc.type === currentType;
    const matchProvince = currentProvince === 'all' || loc.province === currentProvince;
    const typeNames = { den: 'đền miếu', chua: 'chùa tịnh xá', dinh: 'đình', phu: 'phủ' };
    const q = currentSearch.toLowerCase();
    const matchSearch   = !q ||
      loc.name.toLowerCase().includes(q) ||
      loc.address.toLowerCase().includes(q) ||
      loc.provinceName.toLowerCase().includes(q) ||
      loc.desc.toLowerCase().includes(q) ||
      (typeNames[loc.type] || '').includes(q);
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
  applyFilter();
}

function setProvinceFilter(el, province) {
  currentProvince = province;
  // Support both dropdown and legacy chip mode
  const select = document.getElementById('provinceSelect');
  if (select) select.value = province;
  applyFilter();
}

window.filterLocations = function() {
  applyFilter();
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
function getTypeLabel(type) {
  const labels = { den: '🏮 Đền', chua: '🪷 Chùa', dinh: '🏛️ Đình', phu: '⛩️ Phủ' };
  return labels[type] || '🏮 Đền';
}

function getGuideLink(type, name) {
  // Link to specific guide based on location name or type
  const n = (name || '').toLowerCase();
  if (n.includes('tản viên') || n.includes('đền trung')) return 'huong-dan.html#den-trung-tan-vien';
  if (n.includes('trần') && n.includes('nam định')) return 'huong-dan.html#den-tran';
  if (n.includes('phủ') || n.includes('mẫu') || n.includes('tứ phủ')) return 'huong-dan.html#cung-dong';
  if (type === 'chua') return 'huong-dan.html#vao-chua';
  return 'huong-dan.html#vao-den';
}

function openModal(id) {
  const loc = LOCATIONS.find(l => l.id === id);
  if (!loc) return;
  document.getElementById('modalImg').src = loc.img;
  document.getElementById('modalImg').alt = loc.name;
  document.getElementById('modalTitle').textContent = loc.name;
  document.getElementById('modalTags').innerHTML = `
    <span class="loc-tag ${loc.type}" style="font-size:0.75rem;padding:0.2rem 0.6rem;">${getTypeLabel(loc.type)}</span>
    <span class="loc-tag" style="background:rgba(212,175,55,0.1);color:#A07820;font-size:0.75rem;padding:0.2rem 0.6rem;">${loc.provinceName}</span>
  `;
  document.getElementById('modalMeta').innerHTML = `
    <span class="modal-meta-item">📍 ${loc.address}</span>
    <span class="modal-meta-item">🕐 ${loc.hours}</span>
  `;
  document.getElementById('modalDesc').textContent = loc.desc;
  document.getElementById('modalMapBtn').href = loc.mapUrl;
  const guideBtn = document.getElementById('modalGuideBtn');
  if (guideBtn) guideBtn.href = getGuideLink(loc.type, loc.name);

  // Hiển thị lễ hội liên quan từ FESTIVALS (calendar.js)
  const festEl = document.getElementById('modalFestivals');
  if (festEl && typeof FESTIVALS !== 'undefined') {
    const related = FESTIVALS.filter(f => f.province === loc.province).slice(0, 5);
    if (related.length) {
      const lunarMNames = ['','Giêng','2','3','4','5','6','7','8','9','10','11','Chạp'];
      festEl.innerHTML = `
        <div style="margin-bottom:1rem;padding:0.8rem;background:rgba(212,175,55,0.06);border:1px solid rgba(212,175,55,0.2);border-radius:10px;">
          <div style="font-weight:700;color:var(--gold-dark);font-size:0.82rem;margin-bottom:0.5rem;text-transform:uppercase;">🎊 Lễ Hội Tại ${loc.provinceName} (${related.length})</div>
          ${related.map(f => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:0.3rem 0;border-bottom:1px solid rgba(0,0,0,0.04);font-size:0.82rem;">
              <span style="color:var(--text-dark);font-weight:600;">${f.name}</span>
              <span style="color:var(--text-light);white-space:nowrap;margin-left:0.5rem;">${f.lunarDay}/${lunarMNames[f.lunarMonth]} AL</span>
            </div>
          `).join('')}
          <a href="lich-le-hoi.html" style="display:inline-block;margin-top:0.5rem;font-size:0.78rem;color:var(--red);font-weight:700;text-decoration:none;">Xem đầy đủ lịch lễ hội ›</a>
        </div>`;
    } else {
      festEl.innerHTML = '';
    }
  }

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
    const select = document.getElementById('provinceSelect');
    if (select) {
      select.value = tinh;
      currentProvince = tinh;
      applyFilter();
    }
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
