/* ============================================================
   calendar.js – Festival data + list & calendar views
   ============================================================ */

// ---- Data: Lễ hội ----
const FESTIVALS = [
  {
    id: 1, name: 'Lễ Hội Chùa Hương', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 1, lunarDay: 6,
    solarMonth: 1, solarDay: 26, solarYear: 2026,
    duration: 'Kéo dài đến tháng 3 âm lịch',
    location: 'Hương Sơn, Mỹ Đức, Hà Nội',
    type: 'Phật giáo – Hành hương',
    img: 'https://images.unsplash.com/photo-1585376979769-1e3c1e3e5456?w=500&q=80',
    desc: 'Lễ hội Chùa Hương là lễ hội kéo dài nhất Việt Nam, diễn ra từ mùng 6 tháng Giêng đến hết tháng Ba âm lịch. Hàng triệu phật tử và du khách đến hành hương, chiêm bái Phật.',
    highlight: true
  },
  {
    id: 2, name: 'Hội Lim – Hát Quan Họ', province: 'bacninh', provinceName: 'Bắc Ninh',
    lunarMonth: 1, lunarDay: 13,
    solarMonth: 2, solarDay: 3, solarYear: 2026,
    duration: '13-15 tháng Giêng âm lịch',
    location: 'Tiên Du, Bắc Ninh',
    type: 'Lễ hội dân gian',
    img: 'https://images.unsplash.com/photo-1524350254031-ad3c35e0b981?w=500&q=80',
    desc: 'Hội Lim là lễ hội dân gian lớn nhất vùng Kinh Bắc, nổi tiếng với hát Quan họ trên thuyền, trên đồi. Di sản văn hóa phi vật thể của UNESCO.',
    highlight: true
  },
  {
    id: 3, name: 'Lễ Hội Đền Trần', province: 'hanoi', provinceName: 'Nam Định (Hà Nội)',
    lunarMonth: 1, lunarDay: 14,
    solarMonth: 2, solarDay: 4, solarYear: 2026,
    duration: '14 – 20 tháng Giêng âm lịch',
    location: 'Tức Mặc, Nam Định',
    type: 'Tín ngưỡng dân gian',
    img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&q=80',
    desc: 'Lễ hội Đền Trần nổi tiếng với lễ phát ấn đêm 14 tháng Giêng, thu hút hàng vạn người. Theo tín ngưỡng, ấn đền Trần mang lại may mắn, thăng tiến.',
    highlight: true
  },
  {
    id: 4, name: 'Lễ Hội Yên Tử', province: 'quangninh', provinceName: 'Quảng Ninh',
    lunarMonth: 1, lunarDay: 10,
    solarMonth: 1, solarDay: 30, solarYear: 2026,
    duration: 'Kéo dài đến tháng 3 âm lịch',
    location: 'Uông Bí, Quảng Ninh',
    type: 'Phật giáo – Hành hương',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
    desc: 'Lễ hội Yên Tử khai mạc vào mùng 10 tháng Giêng, đây là chuyến hành hương leo núi thiêng Yên Tử, nơi Phật Hoàng Trần Nhân Tông tu hành và nhập niết bàn.',
    highlight: false
  },
  {
    id: 5, name: 'Giỗ Tổ Hùng Vương', province: 'phutho', provinceName: 'Phú Thọ',
    lunarMonth: 3, lunarDay: 10,
    solarMonth: 3, solarDay: 29, solarYear: 2026,
    duration: '10/3 âm lịch – Quốc lễ',
    location: 'Việt Trì, Phú Thọ',
    type: 'Quốc lễ',
    img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&q=80',
    desc: 'Giỗ Tổ Hùng Vương vào ngày 10 tháng 3 âm lịch là Quốc lễ của Việt Nam. Hàng triệu người từ khắp nơi về Đền Hùng dâng hương tưởng nhớ các vua Hùng.',
    highlight: true
  },
  {
    id: 6, name: 'Lễ Hội Đền Kỳ Cùng', province: 'langson', provinceName: 'Lạng Sơn',
    lunarMonth: 1, lunarDay: 22,
    solarMonth: 2, solarDay: 12, solarYear: 2026,
    duration: '22-27 tháng Giêng âm lịch',
    location: 'Kỳ Lừa, Lạng Sơn',
    type: 'Tín ngưỡng Tứ Phủ',
    img: 'https://images.unsplash.com/photo-1504184858379-01b9e8b8a80e?w=500&q=80',
    desc: 'Lễ hội đền Kỳ Cùng – Tả Phủ là một trong những lễ hội lớn nhất vùng Đông Bắc, với các nghi lễ hầu đồng đặc sắc và rước kiệu truyền thống.',
    highlight: false
  },
  {
    id: 7, name: 'Lễ Hội Đền Chử Đồng Tử', province: 'hungyen', provinceName: 'Hưng Yên',
    lunarMonth: 2, lunarDay: 10,
    solarMonth: 3, solarDay: 1, solarYear: 2026,
    duration: '10-12 tháng 2 âm lịch',
    location: 'Khoái Châu, Hưng Yên',
    type: 'Tín ngưỡng dân gian',
    img: 'https://images.unsplash.com/photo-1470246973918-29a93221edb5?w=500&q=80',
    desc: 'Lễ hội tưởng nhớ Chử Đồng Tử – một trong Tứ Bất Tử. Lễ hội có nghi lễ rước nước, rước kiệu và các trò chơi dân gian truyền thống.',
    highlight: false
  },
  {
    id: 8, name: 'Lễ Hội Đền Mẫu Âu Cơ', province: 'phutho', provinceName: 'Phú Thọ',
    lunarMonth: 1, lunarDay: 7,
    solarMonth: 1, solarDay: 27, solarYear: 2026,
    duration: '7-10 tháng Giêng âm lịch',
    location: 'Hạ Hòa, Phú Thọ',
    type: 'Tín ngưỡng thờ Mẫu',
    img: 'https://images.unsplash.com/photo-1536599424071-0b215a388ba7?w=500&q=80',
    desc: 'Lễ hội đền Mẫu Âu Cơ thờ phụng người mẹ thiêng liêng của dân tộc Việt Nam. Lễ hội có rước kiệu, dâng hương và các hoạt động văn hóa truyền thống.',
    highlight: false
  },
  {
    id: 9, name: 'Lễ Hội Đền Nghè', province: 'haiphong', provinceName: 'Hải Phòng',
    lunarMonth: 2, lunarDay: 8,
    solarMonth: 2, solarDay: 27, solarYear: 2026,
    duration: '8 tháng 2 âm lịch',
    location: 'Lê Chân, Hải Phòng',
    type: 'Lễ hội truyền thống',
    img: 'https://images.unsplash.com/photo-1602640629153-21cbf29e5e2a?w=500&q=80',
    desc: 'Lễ hội đền Nghè tưởng nhớ nữ tướng Lê Chân với các nghi lễ trang trọng và lễ rước truyền thống, thu hút đông đảo người dân Hải Phòng tham gia.',
    highlight: false
  },
  {
    id: 10, name: 'Lễ Hội Đền Đông Cuông', province: 'yenbai', provinceName: 'Yên Bái',
    lunarMonth: 1, lunarDay: 10,
    solarMonth: 1, solarDay: 30, solarYear: 2026,
    duration: '10 tháng Giêng âm lịch',
    location: 'Văn Yên, Yên Bái',
    type: 'Tín ngưỡng thờ Mẫu',
    img: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&q=80',
    desc: 'Lễ hội Đền Đông Cuông thờ Mẫu Đệ Nhị Thượng Ngàn, nổi tiếng với các nghi lễ hầu đồng đặc sắc của đồng bào dân tộc thiểu số vùng Tây Bắc.',
    highlight: false
  },
  // HÀ NỘI – Bổ sung từ bảng lễ hội
  {
    id: 11, name: 'Lễ Hội Gò Đống Đa', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 1, lunarDay: 5,
    solarMonth: 2, solarDay: 21, solarYear: 2026,
    duration: 'Mùng 5 tháng Giêng âm lịch',
    location: 'Phường Quang Trung, Đống Đa, Hà Nội',
    type: 'Lễ hội lịch sử',
    img: 'https://images.unsplash.com/photo-1524350254031-ad3c35e0b981?w=500&q=80',
    desc: 'Lễ hội Gò Đống Đa tưởng nhớ chiến thắng của Hoàng đế Quang Trung – Nguyễn Huệ đánh tan 29 vạn quân Thanh năm 1789. Lễ hội có rước kiệu, tế lễ và các trò chơi dân gian.',
    highlight: true
  },
  {
    id: 12, name: 'Lễ Hội Đền Gióng – Sóc Sơn', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 1, lunarDay: 6,
    solarMonth: 2, solarDay: 22, solarYear: 2026,
    duration: 'Mùng 6 – 8 tháng Giêng âm lịch',
    location: 'Xã Phù Linh, Sóc Sơn, Hà Nội',
    type: 'Di sản UNESCO',
    img: 'https://images.unsplash.com/photo-1536599424071-0b215a388ba7?w=500&q=80',
    desc: 'Lễ hội Gióng Sóc Sơn tái hiện hình tượng Thánh Gióng sau khi đánh thắng giặc Ân bay về trời. Được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại.',
    highlight: true
  },
  {
    id: 13, name: 'Lễ Hội Cổ Loa', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 1, lunarDay: 6,
    solarMonth: 2, solarDay: 22, solarYear: 2026,
    duration: 'Mùng 6 – 16 tháng Giêng âm lịch',
    location: 'Xã Cổ Loa, Đông Anh, Hà Nội',
    type: 'Lễ hội lịch sử',
    img: 'https://images.unsplash.com/photo-1602640629153-21cbf29e5e2a?w=500&q=80',
    desc: 'Lễ hội Cổ Loa tưởng nhớ vua An Dương Vương và gắn với truyền thuyết nỏ thần, Mị Châu – Trọng Thủy. Lễ hội có nghi lễ tế thần, rước kiệu và các hoạt động văn hóa dân gian.',
    highlight: false
  },
  {
    id: 14, name: 'Lễ Hội Hai Bà Trưng – Mê Linh', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 1, lunarDay: 6,
    solarMonth: 2, solarDay: 22, solarYear: 2026,
    duration: 'Mùng 6 – 10 tháng Giêng âm lịch',
    location: 'Xã Mê Linh, Mê Linh, Hà Nội',
    type: 'Lễ hội lịch sử',
    img: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&q=80',
    desc: 'Lễ hội tưởng nhớ Hai Bà Trưng tại quê hương Mê Linh – nơi phát tích cuộc khởi nghĩa chống quân Hán năm 40 SCN. Lễ hội có rước kiệu, tế lễ trang trọng và văn nghệ dân gian.',
    highlight: false
  },
  {
    id: 15, name: 'Lễ Hội Tản Viên Sơn Thánh', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 1, lunarDay: 13,
    solarMonth: 3, solarDay: 1, solarYear: 2026,
    duration: '13 – 15 tháng Giêng âm lịch',
    location: 'Xã Minh Quang & Ba Vì, Ba Vì, Hà Nội',
    type: 'Tín ngưỡng Tứ Bất Tử',
    img: 'https://images.unsplash.com/photo-1585376979769-1e3c1e3e5456?w=500&q=80',
    desc: 'Lễ hội Tản Viên Sơn Thánh thờ phụng Sơn Tinh – Tản Viên Sơn Thánh, một trong Tứ Bất Tử của người Việt. Lễ hội diễn ra trên núi Ba Vì linh thiêng với nghi lễ trang trọng.',
    highlight: false
  },
  {
    id: 16, name: 'Lễ Hội Đền Và', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 1, lunarDay: 14,
    solarMonth: 3, solarDay: 2, solarYear: 2026,
    duration: '14 – 17 tháng Giêng âm lịch',
    location: 'Phường Trung Hưng, Sơn Tây, Hà Nội',
    type: 'Tín ngưỡng dân gian',
    img: 'https://images.unsplash.com/photo-1509020900381-ee7f8bdb8e5c?w=500&q=80',
    desc: 'Lễ hội đền Và thờ Tản Viên Sơn Thánh tại Sơn Tây. Lễ hội nổi bật với nghi lễ rước kiệu qua sông Hồng kết hợp giữa hai đền Và và đền Dội – nét văn hóa đặc sắc vùng xứ Đoài.',
    highlight: false
  },
  {
    id: 17, name: 'Lễ Hội Phủ Tây Hồ (Lần 1)', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 3, lunarDay: 3,
    solarMonth: 4, solarDay: 19, solarYear: 2026,
    duration: 'Mùng 3 tháng 3 âm lịch',
    location: 'Phường Quảng An, Tây Hồ, Hà Nội',
    type: 'Tín ngưỡng thờ Mẫu',
    img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&q=80',
    desc: 'Lễ hội Phủ Tây Hồ lần 1 (Tết Hàn Thực – 3/3 âm lịch) thờ Thánh Mẫu Liễu Hạnh. Đây là một trong những lần lễ lớn nhất trong năm tại phủ, thu hút hàng vạn người dâng hương.',
    highlight: true
  },
  {
    id: 18, name: 'Lễ Hội Chùa Thầy', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 3, lunarDay: 5,
    solarMonth: 4, solarDay: 21, solarYear: 2026,
    duration: 'Mùng 5 – 7 tháng 3 âm lịch',
    location: 'Xã Sài Sơn, Quốc Oai, Hà Nội',
    type: 'Phật giáo – Dân gian',
    img: 'https://images.unsplash.com/photo-1470246973918-29a93221edb5?w=500&q=80',
    desc: 'Lễ hội Chùa Thầy gắn với Thiền sư Từ Đạo Hạnh, nổi tiếng với múa rối nước truyền thống trên hồ Long Chiểu. Cảnh quan núi non hùng vĩ tạo nên không gian tâm linh độc đáo.',
    highlight: false
  },
  {
    id: 19, name: 'Lễ Hội Chùa Láng', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 3, lunarDay: 7,
    solarMonth: 4, solarDay: 23, solarYear: 2026,
    duration: 'Ngày 7 tháng 3 âm lịch',
    location: 'Phường Láng Thượng, Đống Đa, Hà Nội',
    type: 'Phật giáo – Dân gian',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
    desc: 'Lễ hội Chùa Láng (Chiêu Thiền Tự) tưởng nhớ Thiền sư Từ Đạo Hạnh. Lễ hội có nghi lễ rước kiệu từ chùa Láng đến chùa Thầy (Hà Tây cũ), là nét sinh hoạt văn hóa độc đáo của Hà Nội.',
    highlight: false
  },
  {
    id: 20, name: 'Lễ Hội Làng Lệ Mật', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 3, lunarDay: 20,
    solarMonth: 5, solarDay: 6, solarYear: 2026,
    duration: '20 – 23 tháng 3 âm lịch',
    location: 'Phường Việt Hưng, Long Biên, Hà Nội',
    type: 'Lễ hội dân gian',
    img: 'https://images.unsplash.com/photo-1504184858379-01b9e8b8a80e?w=500&q=80',
    desc: 'Lễ hội Làng Lệ Mật tưởng nhớ Thành Hoàng làng, gắn với nghề bắt rắn truyền thống độc đáo. Lễ hội có nghi lễ rước kiệu, tế lễ và trình diễn nghề truyền thống nuôi và bắt rắn.',
    highlight: false
  },
  {
    id: 21, name: 'Lễ Hội Đền Gióng – Phù Đổng', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 4, lunarDay: 7,
    solarMonth: 5, solarDay: 23, solarYear: 2026,
    duration: 'Mùng 7 – 9 tháng 4 âm lịch',
    location: 'Xã Phù Đổng, Gia Lâm, Hà Nội',
    type: 'Di sản UNESCO',
    img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=500&q=80',
    desc: 'Lễ hội Gióng Phù Đổng tái hiện trận đánh của Thánh Gióng chống giặc Ân với quy mô hoành tráng. Được UNESCO công nhận Di sản văn hóa phi vật thể, lễ hội thu hút hàng vạn người tham dự.',
    highlight: true
  },
  {
    id: 22, name: 'Lễ Hội Phủ Tây Hồ (Lần 2)', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 8, lunarDay: 13,
    solarMonth: 9, solarDay: 4, solarYear: 2026,
    duration: 'Ngày 13 tháng 8 âm lịch',
    location: 'Phường Quảng An, Tây Hồ, Hà Nội',
    type: 'Tín ngưỡng thờ Mẫu',
    img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&q=80',
    desc: 'Lễ Phủ Tây Hồ lần 2 trong năm diễn ra vào ngày 13 tháng 8 âm lịch – ngày Mẫu Liễu Hạnh hiển thánh. Đây là một trong những buổi lễ được tổ chức trang trọng nhất trong năm tại phủ.',
    highlight: false
  },
  // NAM ĐỊNH
  {
    id: 23, name: 'Lễ Phát Ấn Đền Trần', province: 'namdinh', provinceName: 'Nam Định',
    lunarMonth: 1, lunarDay: 14,
    solarMonth: 2, solarDay: 4, solarYear: 2026,
    duration: 'Đêm 14 – rạng sáng 15 tháng Giêng',
    location: 'Tức Mặc, TP. Nam Định',
    type: 'Tín ngưỡng dân gian',
    img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&q=80',
    desc: 'Lễ phát ấn Đền Trần diễn ra vào đêm 14 rạng sáng 15 tháng Giêng. Theo tín ngưỡng, ấn đền Trần mang lại may mắn, thăng tiến. Hàng vạn người từ khắp nơi đổ về xếp hàng xin ấn.',
    highlight: true
  },
  {
    id: 24, name: 'Lễ Hội Phủ Giầy', province: 'namdinh', provinceName: 'Nam Định',
    lunarMonth: 3, lunarDay: 3,
    solarMonth: 4, solarDay: 19, solarYear: 2026,
    duration: '1 – 10 tháng 3 âm lịch',
    location: 'Vụ Bản, Nam Định',
    type: 'Tín ngưỡng thờ Mẫu',
    img: 'https://images.unsplash.com/photo-1602640629153-21cbf29e5e2a?w=500&q=80',
    desc: 'Lễ hội Phủ Giầy là lễ hội thờ Mẫu Liễu Hạnh lớn nhất miền Bắc, nổi tiếng với nghi lễ hầu đồng (hầu bóng) và rước kiệu Mẫu long trọng từ Phủ Vân Cát đến Phủ Tiên Hương.',
    highlight: true
  },
  // NINH BÌNH
  {
    id: 25, name: 'Lễ Khai Hội Chùa Bái Đính', province: 'ninhbinh', provinceName: 'Ninh Bình',
    lunarMonth: 1, lunarDay: 6,
    solarMonth: 1, solarDay: 26, solarYear: 2026,
    duration: 'Mùng 6 tháng Giêng đến cuối tháng 3',
    location: 'Gia Viễn, Ninh Bình',
    type: 'Phật giáo',
    img: 'https://images.unsplash.com/photo-1509020900381-ee7f8bdb8e5c?w=500&q=80',
    desc: 'Lễ hội chùa Bái Đính khai hội vào mùng 6 tháng Giêng, thu hút hàng triệu du khách. Chùa Bái Đính là quần thể Phật giáo lớn nhất Đông Nam Á với nhiều kỷ lục về diện tích và kích thước.',
    highlight: true
  },
  {
    id: 26, name: 'Lễ Hội Hoa Lư – Cố Đô', province: 'ninhbinh', provinceName: 'Ninh Bình',
    lunarMonth: 3, lunarDay: 10,
    solarMonth: 4, solarDay: 26, solarYear: 2026,
    duration: '8 – 10 tháng 3 âm lịch',
    location: 'Hoa Lư, Ninh Bình',
    type: 'Lễ hội lịch sử',
    img: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&q=80',
    desc: 'Lễ hội Hoa Lư tưởng niệm vua Đinh Tiên Hoàng và vua Lê Đại Hành tại cố đô Hoa Lư. Lễ hội có nghi lễ rước kiệu hoành tráng, tái hiện cảnh triều đình xưa và các trò chơi dân gian.',
    highlight: false
  },
  // THÁI BÌNH
  {
    id: 27, name: 'Lễ Hội Chùa Keo', province: 'thaibinh', provinceName: 'Thái Bình',
    lunarMonth: 1, lunarDay: 4,
    solarMonth: 1, solarDay: 24, solarYear: 2026,
    duration: 'Mùng 4 tháng Giêng (xuân) & 13-15/9 âm lịch (thu)',
    location: 'Vũ Thư, Thái Bình',
    type: 'Phật giáo – Dân gian',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
    desc: 'Chùa Keo có hai lễ hội trong năm: lễ hội mùa xuân (mùng 4 tháng Giêng) và lễ hội mùa thu (13-15 tháng 9 âm lịch). Lễ hội nổi tiếng với các trò chơi dân gian như bơi chải, đu tiên, pháo đất.',
    highlight: false
  },
  // THANH HÓA
  {
    id: 28, name: 'Lễ Hội Đền Bà Triệu', province: 'thanhhoa', provinceName: 'Thanh Hóa',
    lunarMonth: 2, lunarDay: 22,
    solarMonth: 4, solarDay: 9, solarYear: 2026,
    duration: '22 – 24 tháng 2 âm lịch',
    location: 'Hậu Lộc, Thanh Hóa',
    type: 'Lễ hội lịch sử',
    img: 'https://images.unsplash.com/photo-1524350254031-ad3c35e0b981?w=500&q=80',
    desc: 'Lễ hội đền Bà Triệu tưởng nhớ nữ anh hùng Triệu Thị Trinh. Lễ hội có lễ rước kiệu long trọng từ làng Phú Điền lên núi Tùng, tái hiện cuộc khởi nghĩa chống quân Đông Ngô năm 248.',
    highlight: false
  },
  {
    id: 29, name: 'Lễ Hội Lam Kinh', province: 'thanhhoa', provinceName: 'Thanh Hóa',
    lunarMonth: 8, lunarDay: 22,
    solarMonth: 10, solarDay: 2, solarYear: 2026,
    duration: '21 – 22 tháng 8 âm lịch',
    location: 'Thọ Xuân, Thanh Hóa',
    type: 'Lễ hội lịch sử',
    img: 'https://images.unsplash.com/photo-1585376979769-1e3c1e3e5456?w=500&q=80',
    desc: 'Lễ hội Lam Kinh tưởng niệm ngày vua Lê Lợi băng hà (22/8 âm lịch), tái hiện lịch sử anh hùng của vương triều Lê. Lễ hội có hội diễn xướng "Quân trò Xuân Phả" – di sản văn hóa phi vật thể quốc gia.',
    highlight: false
  },
  // HÀ NAM
  {
    id: 30, name: 'Lễ Hội Đền Trần Thương', province: 'hanam', provinceName: 'Hà Nam',
    lunarMonth: 8, lunarDay: 20,
    solarMonth: 9, solarDay: 30, solarYear: 2026,
    duration: '18 – 20 tháng 8 âm lịch',
    location: 'Lý Nhân, Hà Nam',
    type: 'Tín ngưỡng dân gian',
    img: 'https://images.unsplash.com/photo-1536599424071-0b215a388ba7?w=500&q=80',
    desc: 'Lễ hội Đền Trần Thương tưởng nhớ Hưng Đạo Vương Trần Quốc Tuấn và các tướng lĩnh nhà Trần. Lễ hội có nghi lễ rước kiệu, hầu đồng và lễ dâng lửa thiêng đặc sắc vào ban đêm.',
    highlight: false
  }
];

// ---- State ----
let currentView = 'list';
let filterProvince = 'all';
let filterMonth = 'all';
let calendarDate = new Date(2026, 0, 1); // Jan 2026

// ---- Merge dữ liệu admin từ localStorage ----
(function mergeAdminData() {
  const saved = localStorage.getItem('tlv_festivals');
  if (saved) {
    try {
      const adminData = JSON.parse(saved);
      if (Array.isArray(adminData) && adminData.length) {
        FESTIVALS.length = 0;
        adminData.forEach(f => FESTIVALS.push(f));
      }
    } catch(e) { /* Giữ nguyên dữ liệu gốc nếu lỗi */ }
  }
})();

// ---- Init ----
if (document.getElementById('festival-list') || document.getElementById('listView')) {
  document.addEventListener('DOMContentLoaded', () => {
    renderFestivalList(FESTIVALS);
  });
}

// ---- Switch View ----
window.switchView = function(view) {
  currentView = view;
  document.getElementById('listView').style.display     = view === 'list' ? '' : 'none';
  document.getElementById('calendarView').style.display = view === 'calendar' ? '' : 'none';
  document.getElementById('monthNav').style.display     = view === 'calendar' ? 'flex' : 'none';
  document.getElementById('btnList').classList.toggle('active', view === 'list');
  document.getElementById('btnCal').classList.toggle('active', view === 'calendar');
  if (view === 'calendar') renderCalendar();
};

// ---- Filter ----
window.filterFestivals = function() {
  filterProvince = document.getElementById('filterProvince').value;
  filterMonth    = document.getElementById('filterMonth').value;
  const filtered = FESTIVALS.filter(f => {
    const matchP = filterProvince === 'all' || f.province === filterProvince;
    const matchM = filterMonth === 'all' || String(f.lunarMonth) === filterMonth;
    return matchP && matchM;
  });
  if (currentView === 'list') renderFestivalList(filtered);
  else renderCalendar();
};

// ---- Render List ----
function renderFestivalList(festivals) {
  const el = document.getElementById('festivalList');
  const noResult = document.getElementById('noResult');
  if (!festivals.length) {
    el.innerHTML = '';
    noResult.style.display = 'block';
    return;
  }
  noResult.style.display = 'none';

  // Sort by solar date
  const sorted = [...festivals].sort((a, b) => {
    return (a.solarMonth * 100 + a.solarDay) - (b.solarMonth * 100 + b.solarDay);
  });

  const monthNames = ['', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  const lunarMonthNames = ['', 'Tháng Giêng', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Chạp'];

  el.innerHTML = sorted.map(f => `
    <article class="festival-card fade-in">
      <div class="festival-date-box">
        <div class="festival-day">${f.solarDay}</div>
        <div class="festival-month">${monthNames[f.solarMonth]}</div>
        <div class="festival-lunar">${f.lunarDay}/${lunarMonthNames[f.lunarMonth]}</div>
      </div>
      <div class="festival-img">
        <img src="${f.img}" alt="${f.name}" loading="lazy">
      </div>
      <div class="festival-info">
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.4rem;">
          <h3 class="festival-title">${f.name}</h3>
          ${f.highlight ? '<span style="background:var(--gold);color:var(--text-dark);font-size:0.65rem;padding:0.15rem 0.5rem;border-radius:8px;font-weight:700;white-space:nowrap;">Nổi bật</span>' : ''}
        </div>
        <div class="festival-location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${f.location}
        </div>
        <div style="font-size:0.75rem;color:var(--gold-dark);margin-bottom:0.4rem;">📅 ${f.duration} · ${f.type}</div>
        <p class="festival-desc">${f.desc}</p>
      </div>
    </article>
  `).join('');

  // Re-trigger animations
  document.querySelectorAll('.festival-card.fade-in').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 80);
  });
}

// ---- Render Calendar ----
function renderCalendar() {
  const year  = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  document.getElementById('monthTitle').textContent = `${monthNames[month]}, ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  // Build cells
  let cells = [];
  for (let i = 0; i < firstDay; i++) {
    const d = new Date(year, month, -firstDay + i + 1);
    cells.push({ date: d, other: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), other: false });
  }
  while (cells.length % 7 !== 0) {
    const last = cells[cells.length - 1].date;
    cells.push({ date: new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1), other: true });
  }

  // Get festivals for this month (by solar date)
  const monthFestivals = FESTIVALS.filter(f => f.solarMonth === month + 1 && f.solarYear === year);

  document.getElementById('calBody').innerHTML = cells.map(cell => {
    const d = cell.date.getDate();
    const isToday = cell.date.toDateString() === today.toDateString();
    const dayFests = monthFestivals.filter(f => f.solarDay === d);

    return `
      <div class="cal-day ${cell.other ? 'other-month' : ''} ${isToday ? 'today' : ''}">
        <div class="day-num">${d}</div>
        ${dayFests.map(f => `
          <div class="cal-event" title="${f.name}" onclick="scrollToFestival(${f.id})">${f.name}</div>
        `).join('')}
      </div>
    `;
  }).join('');
}

window.changeMonth = function(dir) {
  calendarDate.setMonth(calendarDate.getMonth() + dir);
  renderCalendar();
};

window.scrollToFestival = function(id) {
  switchView('list');
  setTimeout(() => {
    const el = document.querySelector(`[data-fid="${id}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
};
