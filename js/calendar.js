/* ============================================================
   calendar.js – Festival data + list & calendar views
   Dữ liệu lễ hội trên cả nước, sắp xếp theo 12 tháng âm lịch
   Cập nhật theo hành chính hai cấp: Tỉnh/TP → Quận/Huyện
   ============================================================ */

// ---- Data: Lễ hội toàn quốc 2026 ----
const FESTIVALS = [

  // ========================================
  // THÁNG GIÊNG (Tháng 1 Âm Lịch)
  // ========================================

  // --- Hà Nội ---
  {
    id: 1, name: 'Lễ Hội Chùa Hương', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 1, lunarDay: 6,
    solarMonth: 2, solarDay: 22, solarYear: 2026,
    duration: 'Mùng 6 tháng Giêng đến hết tháng 3 âm lịch',
    location: 'Xã Hương Sơn, H. Mỹ Đức, Hà Nội',
    type: 'Phật giáo – Hành hương',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Chùa Hương là lễ hội kéo dài nhất Việt Nam, diễn ra từ mùng 6 tháng Giêng đến hết tháng Ba âm lịch. Hàng triệu phật tử và du khách đến hành hương, chiêm bái Phật tại động Hương Tích.',
    highlight: true
  },
  {
    id: 2, name: 'Lễ Hội Gò Đống Đa', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 1, lunarDay: 5,
    solarMonth: 2, solarDay: 21, solarYear: 2026,
    duration: 'Mùng 5 tháng Giêng âm lịch',
    location: 'P. Quang Trung, Q. Đống Đa, Hà Nội',
    type: 'Lễ hội lịch sử',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Gò Đống Đa tưởng nhớ chiến thắng của Hoàng đế Quang Trung – Nguyễn Huệ đánh tan 29 vạn quân Thanh năm 1789. Lễ hội có rước kiệu, tế lễ và các trò chơi dân gian.',
    highlight: true
  },
  {
    id: 3, name: 'Lễ Hội Đền Gióng – Sóc Sơn', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 1, lunarDay: 6,
    solarMonth: 2, solarDay: 22, solarYear: 2026,
    duration: 'Mùng 6 – 8 tháng Giêng âm lịch',
    location: 'Xã Phù Linh, H. Sóc Sơn, Hà Nội',
    type: 'Di sản UNESCO',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Gióng Sóc Sơn tái hiện hình tượng Thánh Gióng sau khi đánh thắng giặc Ân bay về trời. Được UNESCO công nhận là Di sản văn hóa phi vật thể đại diện của nhân loại.',
    highlight: true
  },
  {
    id: 4, name: 'Lễ Hội Cổ Loa', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 1, lunarDay: 6,
    solarMonth: 2, solarDay: 22, solarYear: 2026,
    duration: 'Mùng 6 – 16 tháng Giêng âm lịch',
    location: 'Xã Cổ Loa, H. Đông Anh, Hà Nội',
    type: 'Lễ hội lịch sử',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Cổ Loa tưởng nhớ vua An Dương Vương và gắn với truyền thuyết nỏ thần, Mị Châu – Trọng Thủy. Lễ hội có nghi lễ tế thần, rước kiệu và các hoạt động văn hóa dân gian.',
    highlight: false
  },
  {
    id: 5, name: 'Lễ Hội Hai Bà Trưng – Mê Linh', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 1, lunarDay: 6,
    solarMonth: 2, solarDay: 22, solarYear: 2026,
    duration: 'Mùng 6 – 10 tháng Giêng âm lịch',
    location: 'Xã Mê Linh, H. Mê Linh, Hà Nội',
    type: 'Lễ hội lịch sử',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội tưởng nhớ Hai Bà Trưng tại quê hương Mê Linh – nơi phát tích cuộc khởi nghĩa chống quân Hán năm 40 SCN. Lễ hội có rước kiệu, tế lễ trang trọng và văn nghệ dân gian.',
    highlight: false
  },
  {
    id: 6, name: 'Lễ Hội Tản Viên Sơn Thánh', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 1, lunarDay: 13,
    solarMonth: 3, solarDay: 1, solarYear: 2026,
    duration: '13 – 15 tháng Giêng âm lịch',
    location: 'Xã Minh Quang & Ba Vì, H. Ba Vì, Hà Nội',
    type: 'Tín ngưỡng Tứ Bất Tử',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Tản Viên Sơn Thánh thờ phụng Sơn Tinh – Tản Viên Sơn Thánh, một trong Tứ Bất Tử của người Việt. Lễ hội diễn ra trên núi Ba Vì linh thiêng với nghi lễ trang trọng.',
    highlight: false
  },
  {
    id: 7, name: 'Lễ Hội Đền Và', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 1, lunarDay: 14,
    solarMonth: 3, solarDay: 2, solarYear: 2026,
    duration: '14 – 17 tháng Giêng âm lịch',
    location: 'P. Trung Hưng, TX. Sơn Tây, Hà Nội',
    type: 'Tín ngưỡng dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội đền Và thờ Tản Viên Sơn Thánh tại Sơn Tây. Lễ hội nổi bật với nghi lễ rước kiệu qua sông Hồng kết hợp giữa hai đền Và và đền Dội – nét văn hóa đặc sắc vùng xứ Đoài.',
    highlight: false
  },

  // --- Tổng Cẩm Đái – Ba Vì (Cụm thờ Tản Viên Sơn Thánh) ---
  {
    id: 92, name: 'Tiệc Đại Trà – Hội Làng Cẩm Đái', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 1, lunarDay: 15,
    solarMonth: 3, solarDay: 3, solarYear: 2026,
    duration: '15 tháng Giêng âm lịch',
    location: 'Xã Cẩm Lĩnh (làng Cẩm Đái), H. Ba Vì, Hà Nội',
    type: 'Lễ hội làng – Quốc tế Trưởng Tạo Lệ',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Hội làng Cẩm Đái – xã đứng đầu hàng tổng Cẩm Đái, thuộc cụm Trưởng Tạo Lệ Tây Thần Cung Đền Trung thờ Thánh Tản Viên. Tổng Cẩm Đái gồm 4 làng cổ (Cẩm Đái, Vô Khuy, Bằng Tạ, Ngọc Nhĩ) thay nhau mở hội gọi là Tiệc Đại Trà. Xưa 4 làng luân phiên cử thủ từ lo hương lửa đền miếu trên núi Tản Viên và giữ lệ rước thánh từ làng lên đền Trung khoảng 20km qua rừng núi. Hội thuộc hàng Quốc tế được triều đình phong kiến đặc cách.',
    highlight: true
  },
  {
    id: 93, name: 'Hội Làng Vô Khuy – Tổng Cẩm Đái', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 1, lunarDay: 15,
    solarMonth: 3, solarDay: 3, solarYear: 2026,
    duration: '15 tháng Giêng âm lịch',
    location: 'Xã Cẩm Lĩnh (làng Vô Khuy), H. Ba Vì, Hà Nội',
    type: 'Lễ hội làng – Trưởng Tạo Lệ',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Hội làng Vô Khuy (Vu Khuy) – một trong 4 làng cổ của tổng Cẩm Đái, dân Kinh ở chân núi Tản cùng phụng thờ Đức Thánh Tản Viên tại Đền Trung (Đền Ba Dân). Làng Vô Khuy là một trong "ba dân" được ghi danh cùng Đền Trung từ thời An Dương Vương.',
    highlight: false
  },

  // --- Phú Thọ ---
  {
    id: 8, name: 'Lễ Hội Đền Mẫu Âu Cơ', province: 'phutho', provinceName: 'Phú Thọ',
    lunarMonth: 1, lunarDay: 7,
    solarMonth: 2, solarDay: 23, solarYear: 2026,
    duration: '7 – 10 tháng Giêng âm lịch',
    location: 'Xã Hiền Lương, H. Hạ Hòa, Phú Thọ',
    type: 'Tín ngưỡng thờ Mẫu',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội đền Mẫu Âu Cơ thờ phụng người mẹ thiêng liêng của dân tộc Việt Nam. Lễ hội có rước kiệu, dâng hương và các hoạt động văn hóa truyền thống.',
    highlight: false
  },

  // --- Bắc Ninh ---
  {
    id: 9, name: 'Hội Lim – Hát Quan Họ', province: 'bacninh', provinceName: 'Bắc Ninh',
    lunarMonth: 1, lunarDay: 13,
    solarMonth: 3, solarDay: 1, solarYear: 2026,
    duration: '13 – 15 tháng Giêng âm lịch',
    location: 'TT. Lim, H. Tiên Du, Bắc Ninh',
    type: 'Di sản UNESCO – Dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Hội Lim là lễ hội dân gian lớn nhất vùng Kinh Bắc, nổi tiếng với hát Quan họ trên thuyền, trên đồi. Di sản văn hóa phi vật thể của UNESCO.',
    highlight: true
  },

  // --- Quảng Ninh ---
  {
    id: 10, name: 'Lễ Hội Yên Tử', province: 'quangninh', provinceName: 'Quảng Ninh',
    lunarMonth: 1, lunarDay: 10,
    solarMonth: 2, solarDay: 26, solarYear: 2026,
    duration: 'Mùng 10 tháng Giêng đến hết tháng 3 âm lịch',
    location: 'P. Thượng Yên Công, TP. Uông Bí, Quảng Ninh',
    type: 'Phật giáo – Hành hương',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Yên Tử khai mạc vào mùng 10 tháng Giêng, đây là chuyến hành hương leo núi thiêng Yên Tử, nơi Phật Hoàng Trần Nhân Tông tu hành và nhập niết bàn.',
    highlight: true
  },
  {
    id: 11, name: 'Lễ Hội Đền Cửa Ông', province: 'quangninh', provinceName: 'Quảng Ninh',
    lunarMonth: 1, lunarDay: 2,
    solarMonth: 2, solarDay: 18, solarYear: 2026,
    duration: 'Mùng 2 tháng Giêng đến hết tháng 3 âm lịch',
    location: 'P. Cửa Ông, TP. Cẩm Phả, Quảng Ninh',
    type: 'Tín ngưỡng dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Đền Cửa Ông thờ Hưng Nhượng Vương Trần Quốc Tảng, con trai Hưng Đạo Đại Vương. Đền nổi tiếng linh thiêng, thu hút đông đảo người dân đến cầu tài lộc đầu năm.',
    highlight: false
  },

  // --- Lạng Sơn ---
  {
    id: 12, name: 'Lễ Hội Đền Kỳ Cùng – Tả Phủ', province: 'langson', provinceName: 'Lạng Sơn',
    lunarMonth: 1, lunarDay: 22,
    solarMonth: 3, solarDay: 10, solarYear: 2026,
    duration: '22 – 27 tháng Giêng âm lịch',
    location: 'P. Vĩnh Trại, TP. Lạng Sơn, Lạng Sơn',
    type: 'Tín ngưỡng Tứ Phủ',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội đền Kỳ Cùng – Tả Phủ là một trong những lễ hội lớn nhất vùng Đông Bắc, với các nghi lễ hầu đồng đặc sắc và rước kiệu truyền thống.',
    highlight: false
  },

  // --- Yên Bái ---
  {
    id: 13, name: 'Lễ Hội Đền Đông Cuông', province: 'yenbai', provinceName: 'Yên Bái',
    lunarMonth: 1, lunarDay: 10,
    solarMonth: 2, solarDay: 26, solarYear: 2026,
    duration: 'Mùng 10 tháng Giêng âm lịch',
    location: 'Xã Đông Cuông, H. Văn Yên, Yên Bái',
    type: 'Tín ngưỡng thờ Mẫu',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Đền Đông Cuông thờ Mẫu Đệ Nhị Thượng Ngàn, nổi tiếng với các nghi lễ hầu đồng đặc sắc của đồng bào dân tộc thiểu số vùng Tây Bắc.',
    highlight: false
  },

  // --- Thái Bình ---
  {
    id: 14, name: 'Lễ Hội Chùa Keo (Xuân)', province: 'thaibinh', provinceName: 'Thái Bình',
    lunarMonth: 1, lunarDay: 4,
    solarMonth: 2, solarDay: 20, solarYear: 2026,
    duration: 'Mùng 4 tháng Giêng âm lịch',
    location: 'Xã Duy Nhất, H. Vũ Thư, Thái Bình',
    type: 'Phật giáo – Dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Chùa Keo mùa xuân khai mạc mùng 4 tháng Giêng, thờ Thiền sư Không Lộ. Lễ hội nổi tiếng với các trò chơi dân gian như bơi chải, đu tiên, pháo đất.',
    highlight: false
  },

  // --- Ninh Bình ---
  {
    id: 15, name: 'Lễ Khai Hội Chùa Bái Đính', province: 'ninhbinh', provinceName: 'Ninh Bình',
    lunarMonth: 1, lunarDay: 6,
    solarMonth: 2, solarDay: 22, solarYear: 2026,
    duration: 'Mùng 6 tháng Giêng đến cuối tháng 3 AL',
    location: 'Xã Gia Sinh, H. Gia Viễn, Ninh Bình',
    type: 'Phật giáo',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội chùa Bái Đính khai hội vào mùng 6 tháng Giêng, thu hút hàng triệu du khách. Chùa Bái Đính là quần thể Phật giáo lớn nhất Đông Nam Á.',
    highlight: true
  },

  // --- Nam Định ---
  {
    id: 16, name: 'Lễ Hội Chợ Viềng', province: 'namdinh', provinceName: 'Nam Định',
    lunarMonth: 1, lunarDay: 8,
    solarMonth: 2, solarDay: 24, solarYear: 2026,
    duration: 'Đêm mùng 7 rạng sáng mùng 8 tháng Giêng',
    location: 'TT. Nam Giang, H. Nam Trực & H. Vụ Bản, Nam Định',
    type: 'Lễ hội dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Chợ Viềng họp duy nhất một phiên mỗi năm vào đêm mùng 7 rạng sáng mùng 8 tháng Giêng. Người dân mua bán "cầu may", đặc biệt là cây cảnh, nông cụ, đồ cổ.',
    highlight: true
  },
  {
    id: 17, name: 'Lễ Phát Ấn Đền Trần', province: 'namdinh', provinceName: 'Nam Định',
    lunarMonth: 1, lunarDay: 14,
    solarMonth: 3, solarDay: 2, solarYear: 2026,
    duration: 'Đêm 14 – rạng sáng 15 tháng Giêng',
    location: 'P. Lộc Vượng, TP. Nam Định, Nam Định',
    type: 'Tín ngưỡng dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ phát ấn Đền Trần diễn ra vào đêm 14 rạng sáng 15 tháng Giêng. Theo tín ngưỡng, ấn đền Trần mang lại may mắn, thăng tiến. Hàng vạn người từ khắp nơi đổ về xin ấn.',
    highlight: true
  },

  // --- Hà Nam ---
  {
    id: 18, name: 'Lễ Hội Chùa Bà Đanh', province: 'hanam', provinceName: 'Hà Nam',
    lunarMonth: 1, lunarDay: 15,
    solarMonth: 3, solarDay: 3, solarYear: 2026,
    duration: 'Rằm tháng Giêng âm lịch',
    location: 'Xã Ngọc Sơn, H. Kim Bảng, Hà Nam',
    type: 'Phật giáo – Dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Chùa Bà Đanh diễn ra vào rằm tháng Giêng. Chùa nằm bên sông Đáy, nổi tiếng với câu thành ngữ "Vắng như chùa Bà Đanh" nhưng ngày hội thu hút rất đông du khách.',
    highlight: false
  },

  // --- Bình Định ---
  {
    id: 19, name: 'Lễ Hội Đống Đa – Tây Sơn', province: 'binhdinh', provinceName: 'Bình Định',
    lunarMonth: 1, lunarDay: 5,
    solarMonth: 2, solarDay: 21, solarYear: 2026,
    duration: 'Mùng 4 – 5 tháng Giêng âm lịch',
    location: 'TT. Phú Phong, H. Tây Sơn, Bình Định',
    type: 'Lễ hội lịch sử',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Đống Đa – Tây Sơn kỷ niệm chiến thắng Ngọc Hồi – Đống Đa tại quê hương Hoàng đế Quang Trung. Lễ hội có biểu diễn võ thuật Bình Định, trống trận Tây Sơn và tái hiện trận đánh lịch sử.',
    highlight: true
  },

  // --- Tây Ninh ---
  {
    id: 20, name: 'Lễ Hội Núi Bà Đen', province: 'tayninh', provinceName: 'Tây Ninh',
    lunarMonth: 1, lunarDay: 15,
    solarMonth: 3, solarDay: 3, solarYear: 2026,
    duration: 'Mùng 10 tháng Giêng đến hết tháng Giêng',
    location: 'Xã Thạnh Tân, TP. Tây Ninh, Tây Ninh',
    type: 'Phật giáo – Tín ngưỡng',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Núi Bà Đen – ngọn núi cao nhất miền Nam, thờ Linh Sơn Thánh Mẫu. Hàng trăm ngàn người hành hương lên đỉnh núi cầu an, cầu tài lộc dịp đầu năm.',
    highlight: true
  },

  // --- Bình Dương ---
  {
    id: 21, name: 'Lễ Hội Chùa Bà Thiên Hậu', province: 'binhduong', provinceName: 'Bình Dương',
    lunarMonth: 1, lunarDay: 15,
    solarMonth: 3, solarDay: 3, solarYear: 2026,
    duration: '14 – 15 tháng Giêng âm lịch',
    location: 'P. Phú Cường, TP. Thủ Dầu Một, Bình Dương',
    type: 'Tín ngưỡng dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Chùa Bà Thiên Hậu Bình Dương là lễ hội lớn nhất của người Hoa tại miền Nam. Lễ hội có diễu hành, múa lân sư rồng hoành tráng, thu hút hàng chục vạn người tham dự.',
    highlight: true
  },

  // --- Lào Cai ---
  {
    id: 22, name: 'Lễ Hội Gầu Tào (Hội Xuân)', province: 'laocai', provinceName: 'Lào Cai',
    lunarMonth: 1, lunarDay: 3,
    solarMonth: 2, solarDay: 19, solarYear: 2026,
    duration: 'Mùng 1 – 5 tháng Giêng âm lịch',
    location: 'TT. Sa Pa, H. Sa Pa, Lào Cai',
    type: 'Lễ hội dân tộc',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Gầu Tào là lễ hội lớn nhất của đồng bào Hmông, diễn ra trên các sườn đồi vùng cao. Lễ hội có nghi lễ cầu phúc, cầu lộc, múa khèn, ném pao và các trò chơi dân gian.',
    highlight: false
  },

  // --- Hải Dương ---
  {
    id: 23, name: 'Lễ Hội Đền Cao – An Phụ', province: 'haiduong', provinceName: 'Hải Dương',
    lunarMonth: 1, lunarDay: 1,
    solarMonth: 2, solarDay: 17, solarYear: 2026,
    duration: 'Mùng 1 – 6 tháng Giêng âm lịch',
    location: 'Xã An Sinh, TX. Kinh Môn, Hải Dương',
    type: 'Tín ngưỡng dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Đền Cao – An Phụ thờ An Sinh Vương Trần Liễu, phụ thân Hưng Đạo Đại Vương. Lễ hội có lễ rước kiệu từ chân núi lên đỉnh và các nghi lễ truyền thống.',
    highlight: false
  },

  // --- Vĩnh Phúc ---
  {
    id: 24, name: 'Lễ Hội Tây Thiên', province: 'vinhphuc', provinceName: 'Vĩnh Phúc',
    lunarMonth: 1, lunarDay: 15,
    solarMonth: 3, solarDay: 3, solarYear: 2026,
    duration: '15 tháng Giêng đến hết tháng 3 âm lịch',
    location: 'Xã Đại Đình, H. Tam Đảo, Vĩnh Phúc',
    type: 'Phật giáo – Tín ngưỡng thờ Mẫu',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Tây Thiên là lễ hội lớn nhất tỉnh Vĩnh Phúc, gắn liền với tín ngưỡng thờ Quốc Mẫu Tây Thiên – Mẫu Thượng Ngàn. Khu vực có quần thể chùa, đền linh thiêng trên dãy Tam Đảo.',
    highlight: false
  },

  // --- Thừa Thiên Huế ---
  {
    id: 25, name: 'Lễ Hội Điện Hòn Chén', province: 'hue', provinceName: 'Thừa Thiên Huế',
    lunarMonth: 1, lunarDay: 15,
    solarMonth: 3, solarDay: 3, solarYear: 2026,
    duration: 'Rằm tháng Giêng âm lịch',
    location: 'Xã Hương Thọ, H. Hương Trà, Thừa Thiên Huế',
    type: 'Tín ngưỡng thờ Mẫu',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Điện Hòn Chén (Huệ Nam Điện) thờ Thánh Mẫu Thiên Y A Na. Điểm nhấn là lễ rước thuyền trên sông Hương với hàng chục thuyền trang hoàng lộng lẫy.',
    highlight: false
  },

  // --- TP. Hồ Chí Minh ---
  {
    id: 26, name: 'Lễ Hội Chùa Ông Bổn (Nhị Phủ Miếu)', province: 'hcm', provinceName: 'TP. Hồ Chí Minh',
    lunarMonth: 1, lunarDay: 13,
    solarMonth: 3, solarDay: 1, solarYear: 2026,
    duration: '12 – 13 tháng Giêng âm lịch',
    location: 'P. 11, Q. 5, TP. Hồ Chí Minh',
    type: 'Tín ngưỡng dân gian – Văn hóa Hoa',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Chùa Ông Bổn (Nhị Phủ Miếu) là lễ hội người Hoa lớn nhất TP.HCM, với lễ diễu hành múa lân, múa rồng hoành tráng qua các tuyến phố Chợ Lớn.',
    highlight: false
  },

  // --- Bắc Giang ---
  {
    id: 27, name: 'Hội Xuân Tây Yên Tử', province: 'bacgiang', provinceName: 'Bắc Giang',
    lunarMonth: 1, lunarDay: 6,
    solarMonth: 2, solarDay: 22, solarYear: 2026,
    duration: 'Mùng 6 tháng Giêng đến hết tháng 3 AL',
    location: 'Xã Tuấn Mậu, H. Sơn Động, Bắc Giang',
    type: 'Phật giáo – Hành hương',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Hội Xuân Tây Yên Tử thuộc sườn phía Tây núi Yên Tử, hành trình tâm linh qua các chùa Am Vãi, Hồ Bấc, Bình Long. Đây là nhánh ít người biết của con đường Phật giáo Trúc Lâm.',
    highlight: false
  },

  // ========================================
  // THÁNG HAI (Tháng 2 Âm Lịch)
  // ========================================

  // --- Tổng Cẩm Đái – Ba Vì (tiếp) ---
  {
    id: 94, name: 'Hội Làng Bằng Tạ – Tổng Cẩm Đái', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 2, lunarDay: 1,
    solarMonth: 3, solarDay: 19, solarYear: 2026,
    duration: '1 – 2 tháng 2 âm lịch',
    location: 'Xã Cẩm Lĩnh (làng Bằng Tạ), H. Ba Vì, Hà Nội',
    type: 'Lễ hội làng – Trưởng Tạo Lệ',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Hội làng Bằng Tạ – một trong 4 làng cổ tổng Cẩm Đái, thờ Thánh Tản Viên Sơn Thánh. Làng Bằng Tạ mở hội Tiệc Đại Trà vào đầu tháng 2 âm lịch trong lệ luân phiên của 4 làng. Cùng với Cẩm Đái, Vô Khuy, Ngọc Nhĩ, đây là cụm thờ tự cổ xưa nhất vùng Ba Vì, giữ lệ Trưởng Tạo Lệ được triều đình phong kiến đặc cách hàng Quốc tế.',
    highlight: false
  },

  // --- Hà Nội ---
  {
    id: 91, name: 'Lễ Hội Thượng Lâm Trang – Đồng Tâm', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 2, lunarDay: 10,
    solarMonth: 3, solarDay: 28, solarYear: 2026,
    duration: '10 – 13 tháng 2 âm lịch (3 năm/lần, hai xã luân phiên đăng cai)',
    location: 'Đình Làng Hoành, Xã Thượng Lâm & Xã Đồng Tâm, H. Mỹ Đức, Hà Nội',
    type: 'Lễ hội làng truyền thống',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ Hội Thượng Lâm Trang – Đồng Tâm ("tuy hai mà một"), thờ hai tướng Cao Sơn, Quý Minh (thời Văn Lang) và ba nữ tướng Vĩnh Hoa, Chu Tước, Vân Mộng (thời Hai Bà Trưng). Năm 2026 Hoành Thôn đăng cai chính hội. Lịch trình: 10/2 AL – Lễ Xuất Cung, đón kiệu Chùa Hoành; 11/2 – Đón kiệu Quán Thá, tế lễ; 12/2 – CHÍNH HỘI đón kiệu Thượng Lâm, tế lễ; 13/2 – Bế mạc, rước Thánh Hồi Cung. Lễ hội nổi bật với 13 kiệu thần (8 kiệu có tượng) – nhiều nhất trong các lễ hội, hiện tượng "kiệu xoay", "kiệu bay" độc đáo.',
    highlight: true
  },

  // --- Hải Phòng ---
  {
    id: 28, name: 'Lễ Hội Đền Nghè', province: 'haiphong', provinceName: 'Hải Phòng',
    lunarMonth: 2, lunarDay: 8,
    solarMonth: 3, solarDay: 26, solarYear: 2026,
    duration: '8 tháng 2 âm lịch',
    location: 'P. An Biên, Q. Lê Chân, Hải Phòng',
    type: 'Lễ hội truyền thống',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội đền Nghè tưởng nhớ nữ tướng Lê Chân với các nghi lễ trang trọng và lễ rước truyền thống, thu hút đông đảo người dân Hải Phòng tham gia.',
    highlight: false
  },

  // --- Hưng Yên ---
  {
    id: 29, name: 'Lễ Hội Đền Chử Đồng Tử', province: 'hungyen', provinceName: 'Hưng Yên',
    lunarMonth: 2, lunarDay: 10,
    solarMonth: 3, solarDay: 28, solarYear: 2026,
    duration: '10 – 12 tháng 2 âm lịch',
    location: 'Xã Bình Minh, H. Khoái Châu, Hưng Yên',
    type: 'Tín ngưỡng Tứ Bất Tử',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội tưởng nhớ Chử Đồng Tử – một trong Tứ Bất Tử. Lễ hội có nghi lễ rước nước, rước kiệu và các trò chơi dân gian truyền thống.',
    highlight: false
  },

  // --- Thanh Hóa ---
  {
    id: 30, name: 'Lễ Hội Đền Bà Triệu', province: 'thanhhoa', provinceName: 'Thanh Hóa',
    lunarMonth: 2, lunarDay: 22,
    solarMonth: 4, solarDay: 9, solarYear: 2026,
    duration: '22 – 24 tháng 2 âm lịch',
    location: 'Xã Triệu Lộc, H. Hậu Lộc, Thanh Hóa',
    type: 'Lễ hội lịch sử',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội đền Bà Triệu tưởng nhớ nữ anh hùng Triệu Thị Trinh. Lễ hội có lễ rước kiệu long trọng từ làng Phú Điền lên núi Tùng, tái hiện cuộc khởi nghĩa chống quân Đông Ngô năm 248.',
    highlight: false
  },

  // --- Nghệ An ---
  {
    id: 31, name: 'Lễ Hội Đền Cuông', province: 'nghean', provinceName: 'Nghệ An',
    lunarMonth: 2, lunarDay: 14,
    solarMonth: 4, solarDay: 1, solarYear: 2026,
    duration: '14 – 16 tháng 2 âm lịch',
    location: 'Xã Diễn An, H. Diễn Châu, Nghệ An',
    type: 'Lễ hội lịch sử',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Đền Cuông tưởng nhớ Thục An Dương Vương, gắn với truyền thuyết về cái chết bi thương của nhà vua bên bờ biển Diễn Châu. Lễ hội có lễ tế long trọng và các hoạt động văn hóa.',
    highlight: false
  },

  // --- Hà Tĩnh ---
  {
    id: 32, name: 'Lễ Hội Đền Cả – Dinh Đô Quan Hoàng Mười', province: 'hatinh', provinceName: 'Hà Tĩnh',
    lunarMonth: 2, lunarDay: 10,
    solarMonth: 3, solarDay: 28, solarYear: 2026,
    duration: '9 – 10 tháng 2 âm lịch',
    location: 'Xã Xuân Hồng, H. Nghi Xuân, Hà Tĩnh',
    type: 'Tín ngưỡng Tứ Phủ',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Đền Cả – Dinh Đô Quan Hoàng Mười là lễ hội tín ngưỡng thờ Mẫu lớn nhất xứ Nghệ. Quan Hoàng Mười được coi là vị quan văn võ song toàn, phù hộ cầu tài, cầu lộc.',
    highlight: false
  },

  // --- Quảng Nam ---
  {
    id: 33, name: 'Lễ Hội Bà Thu Bồn', province: 'quangnam', provinceName: 'Quảng Nam',
    lunarMonth: 2, lunarDay: 12,
    solarMonth: 3, solarDay: 30, solarYear: 2026,
    duration: '11 – 12 tháng 2 âm lịch',
    location: 'Xã Duy Tân, H. Duy Xuyên, Quảng Nam',
    type: 'Tín ngưỡng dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Bà Thu Bồn (Bô Bô Phu Nhân) có nguồn gốc từ tín ngưỡng Chăm, giao thoa văn hóa Việt – Chăm. Lễ hội có nghi lễ cúng tế, hát bội và các trò chơi dân gian.',
    highlight: false
  },

  // --- Phú Yên ---
  {
    id: 34, name: 'Lễ Hội Đầm Ô Loan', province: 'phuyen', provinceName: 'Phú Yên',
    lunarMonth: 2, lunarDay: 15,
    solarMonth: 4, solarDay: 2, solarYear: 2026,
    duration: 'Rằm tháng 2 âm lịch',
    location: 'Xã An Cư, H. Tuy An, Phú Yên',
    type: 'Lễ hội dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Đầm Ô Loan diễn ra bên đầm Ô Loan nổi tiếng, với nghi lễ cầu ngư, đua thuyền và các hoạt động văn hóa ven đầm. Đầm Ô Loan là thắng cảnh nổi tiếng xứ Nẫu.',
    highlight: false
  },

  // --- Khánh Hòa ---
  {
    id: 35, name: 'Lễ Hội Tháp Bà Ponagar', province: 'khanhhoa', provinceName: 'Khánh Hòa',
    lunarMonth: 2, lunarDay: 21,
    solarMonth: 4, solarDay: 8, solarYear: 2026,
    duration: '20 – 23 tháng 2 âm lịch',
    location: 'P. Vĩnh Phước, TP. Nha Trang, Khánh Hòa',
    type: 'Di sản văn hóa Chăm – Việt',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Tháp Bà Ponagar thờ Thiên Y A Na Thánh Mẫu, giao thoa giữa văn hóa Chăm và Việt. Lễ hội có nghi lễ mục dục (tắm tượng), múa Chăm, hát bóng và diễn xướng dân gian.',
    highlight: true
  },

  // --- Bắc Ninh ---
  {
    id: 36, name: 'Lễ Hội Đền Đô', province: 'bacninh', provinceName: 'Bắc Ninh',
    lunarMonth: 2, lunarDay: 15,
    solarMonth: 4, solarDay: 2, solarYear: 2026,
    duration: '14 – 16 tháng 2 âm lịch',
    location: 'P. Đình Bảng, TP. Từ Sơn, Bắc Ninh',
    type: 'Lễ hội lịch sử',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Đền Đô kỷ niệm ngày vua Lý Thái Tổ đăng quang (15/2 Canh Tuất). Đền Đô thờ 8 vị vua nhà Lý, lễ hội có nghi lễ trang nghiêm và rước kiệu hoành tráng.',
    highlight: true
  },

  // ========================================
  // THÁNG BA (Tháng 3 Âm Lịch)
  // ========================================

  // --- Tổng Cẩm Đái – Ba Vì (tiếp) ---
  {
    id: 95, name: 'Hội Làng Ngọc Nhĩ – Tổng Cẩm Đái', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 3, lunarDay: 15,
    solarMonth: 5, solarDay: 1, solarYear: 2026,
    duration: '15 tháng 3 âm lịch',
    location: 'Xã Cẩm Lĩnh (làng Ngọc Nhĩ), H. Ba Vì, Hà Nội',
    type: 'Lễ hội làng – Trưởng Tạo Lệ',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Hội làng Ngọc Nhĩ (Ngọc Nhị) – làng cuối cùng trong lệ Tiệc Đại Trà của 4 làng cổ tổng Cẩm Đái. Làng Ngọc Nhĩ là một trong "ba dân" (cùng Vô Khuy và dân Mường Thủ Pháp) được ghi danh phụng thờ Đền Trung – Đền Ba Dân từ thời An Dương Vương (208-179 TCN). Hội mở vào rằm tháng 3, khép lại chu kỳ hội Tiệc Đại Trà đầu xuân của tổng.',
    highlight: false
  },

  // --- Phú Thọ ---
  {
    id: 37, name: 'Giỗ Tổ Hùng Vương', province: 'phutho', provinceName: 'Phú Thọ',
    lunarMonth: 3, lunarDay: 10,
    solarMonth: 4, solarDay: 26, solarYear: 2026,
    duration: '10/3 âm lịch – Quốc lễ',
    location: 'Xã Hy Cương, TP. Việt Trì, Phú Thọ',
    type: 'Quốc lễ',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Giỗ Tổ Hùng Vương vào ngày 10 tháng 3 âm lịch là Quốc lễ của Việt Nam. Hàng triệu người từ khắp nơi về Đền Hùng dâng hương tưởng nhớ các vua Hùng – Quốc Tổ của dân tộc.',
    highlight: true
  },

  // --- Hà Nội ---
  {
    id: 38, name: 'Lễ Hội Phủ Tây Hồ (Tiệc Mẫu 3/3)', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 3, lunarDay: 3,
    solarMonth: 4, solarDay: 19, solarYear: 2026,
    duration: 'Mùng 3 tháng 3 âm lịch',
    location: 'P. Quảng An, Q. Tây Hồ, Hà Nội',
    type: 'Tín ngưỡng thờ Mẫu',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Phủ Tây Hồ tiệc Mẫu 3/3 (Tết Hàn Thực) thờ Thánh Mẫu Liễu Hạnh. Đây là một trong những lần lễ lớn nhất trong năm tại phủ, thu hút hàng vạn người dâng hương.',
    highlight: true
  },
  {
    id: 39, name: 'Lễ Hội Chùa Thầy', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 3, lunarDay: 5,
    solarMonth: 4, solarDay: 21, solarYear: 2026,
    duration: 'Mùng 5 – 7 tháng 3 âm lịch',
    location: 'Xã Sài Sơn, H. Quốc Oai, Hà Nội',
    type: 'Phật giáo – Dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Chùa Thầy gắn với Thiền sư Từ Đạo Hạnh, nổi tiếng với múa rối nước truyền thống trên hồ Long Chiểu. Cảnh quan núi non hùng vĩ tạo nên không gian tâm linh độc đáo.',
    highlight: false
  },
  {
    id: 40, name: 'Lễ Hội Chùa Láng', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 3, lunarDay: 7,
    solarMonth: 4, solarDay: 23, solarYear: 2026,
    duration: 'Ngày 7 tháng 3 âm lịch',
    location: 'P. Láng Thượng, Q. Đống Đa, Hà Nội',
    type: 'Phật giáo – Dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Chùa Láng (Chiêu Thiền Tự) tưởng nhớ Thiền sư Từ Đạo Hạnh. Lễ hội có nghi lễ rước kiệu từ chùa Láng đến chùa Thầy, là nét sinh hoạt văn hóa độc đáo của Hà Nội.',
    highlight: false
  },
  {
    id: 41, name: 'Lễ Hội Làng Lệ Mật', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 3, lunarDay: 20,
    solarMonth: 5, solarDay: 6, solarYear: 2026,
    duration: '20 – 23 tháng 3 âm lịch',
    location: 'P. Việt Hưng, Q. Long Biên, Hà Nội',
    type: 'Lễ hội dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Làng Lệ Mật tưởng nhớ Thành Hoàng làng, gắn với nghề bắt rắn truyền thống độc đáo. Lễ hội có nghi lễ rước kiệu, tế lễ và trình diễn nghề truyền thống nuôi và bắt rắn.',
    highlight: false
  },

  // --- Nam Định ---
  {
    id: 42, name: 'Lễ Hội Phủ Giầy', province: 'namdinh', provinceName: 'Nam Định',
    lunarMonth: 3, lunarDay: 3,
    solarMonth: 4, solarDay: 19, solarYear: 2026,
    duration: '1 – 10 tháng 3 âm lịch',
    location: 'TT. Gôi, H. Vụ Bản, Nam Định',
    type: 'Tín ngưỡng thờ Mẫu',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Phủ Giầy là lễ hội thờ Mẫu Liễu Hạnh lớn nhất miền Bắc, nổi tiếng với nghi lễ hầu đồng và rước kiệu Mẫu long trọng từ Phủ Vân Cát đến Phủ Tiên Hương.',
    highlight: true
  },

  // --- Ninh Bình ---
  {
    id: 43, name: 'Lễ Hội Hoa Lư – Cố Đô', province: 'ninhbinh', provinceName: 'Ninh Bình',
    lunarMonth: 3, lunarDay: 10,
    solarMonth: 4, solarDay: 26, solarYear: 2026,
    duration: '8 – 10 tháng 3 âm lịch',
    location: 'Xã Trường Yên, H. Hoa Lư, Ninh Bình',
    type: 'Lễ hội lịch sử',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Hoa Lư tưởng niệm vua Đinh Tiên Hoàng và vua Lê Đại Hành tại cố đô Hoa Lư. Lễ hội có nghi lễ rước kiệu hoành tráng, tái hiện cảnh triều đình xưa và các trò chơi dân gian.',
    highlight: false
  },

  // --- Hải Dương ---
  {
    id: 44, name: 'Lễ Hội Đền Tranh', province: 'haiduong', provinceName: 'Hải Dương',
    lunarMonth: 3, lunarDay: 10,
    solarMonth: 4, solarDay: 26, solarYear: 2026,
    duration: '10 tháng 3 âm lịch',
    location: 'Xã Đồng Tâm, H. Ninh Giang, Hải Dương',
    type: 'Tín ngưỡng dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Đền Tranh thờ Quan Lớn Đệ Tam (Đệ Tam Thoải Phủ) – vị thần cai quản sông nước. Đền Tranh nổi tiếng linh thiêng, lễ hội có nghi lễ hầu đồng và rước kiệu trên sông.',
    highlight: false
  },

  // --- Quảng Ngãi ---
  {
    id: 45, name: 'Lễ Hội Cầu Ngư – Sa Huỳnh', province: 'quangngai', provinceName: 'Quảng Ngãi',
    lunarMonth: 3, lunarDay: 5,
    solarMonth: 4, solarDay: 21, solarYear: 2026,
    duration: '3 – 5 tháng 3 âm lịch',
    location: 'Xã Phổ Thạnh, TX. Đức Phổ, Quảng Ngãi',
    type: 'Lễ hội dân gian – Ngư dân',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Cầu Ngư Sa Huỳnh là lễ hội lớn nhất của ngư dân miền Trung, cầu mong biển lặng sóng êm, mùa cá bội thu. Lễ hội có nghi lễ cúng Cá Ông (cá Voi), hát bội và đua thuyền.',
    highlight: false
  },

  // --- Đà Nẵng ---
  {
    id: 46, name: 'Lễ Hội Cầu Ngư Đà Nẵng', province: 'danang', provinceName: 'Đà Nẵng',
    lunarMonth: 3, lunarDay: 3,
    solarMonth: 4, solarDay: 19, solarYear: 2026,
    duration: '1 – 3 tháng 3 âm lịch',
    location: 'P. Thanh Khê Đông, Q. Thanh Khê, Đà Nẵng',
    type: 'Lễ hội dân gian – Ngư dân',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Cầu Ngư Đà Nẵng là lễ hội truyền thống của ngư dân ven biển, tổ chức tại các lăng thờ cá Ông. Lễ hội có nghi lễ cúng cá Ông, hát bội, đua thuyền trên sông Hàn.',
    highlight: false
  },

  // --- Bình Thuận ---
  {
    id: 47, name: 'Lễ Hội Dinh Thầy Thím', province: 'binhthuan', provinceName: 'Bình Thuận',
    lunarMonth: 3, lunarDay: 15,
    solarMonth: 5, solarDay: 1, solarYear: 2026,
    duration: '14 – 16 tháng 3 âm lịch',
    location: 'Xã Tân Tiến, TX. La Gi, Bình Thuận',
    type: 'Tín ngưỡng dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Dinh Thầy Thím tưởng nhớ đôi vợ chồng tu hành có phép thuật, cứu giúp dân lành. Lễ hội có nghi lễ nghinh Ông, rước sắc phong và nhiều trò chơi dân gian đặc sắc.',
    highlight: false
  },

  // --- Lâm Đồng ---
  {
    id: 48, name: 'Lễ Hội Hoa Đà Lạt', province: 'lamdong', provinceName: 'Lâm Đồng',
    lunarMonth: 3, lunarDay: 1,
    solarMonth: 4, solarDay: 17, solarYear: 2026,
    duration: 'Cuối tháng 3 – đầu tháng 4 dương lịch (2 năm/lần)',
    location: 'TP. Đà Lạt, Lâm Đồng',
    type: 'Lễ hội văn hóa – Du lịch',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Festival Hoa Đà Lạt tổ chức 2 năm một lần, trưng bày hàng triệu bông hoa, xe hoa diễu hành và các hoạt động văn hóa nghệ thuật. Đà Lạt được mệnh danh "Thành phố ngàn hoa".',
    highlight: false
  },

  // ========================================
  // THÁNG TƯ (Tháng 4 Âm Lịch)
  // ========================================

  // --- Hà Nội ---
  {
    id: 49, name: 'Lễ Hội Đền Gióng – Phù Đổng', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 4, lunarDay: 7,
    solarMonth: 5, solarDay: 23, solarYear: 2026,
    duration: 'Mùng 7 – 9 tháng 4 âm lịch',
    location: 'Xã Phù Đổng, H. Gia Lâm, Hà Nội',
    type: 'Di sản UNESCO',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Gióng Phù Đổng tái hiện trận đánh của Thánh Gióng chống giặc Ân với quy mô hoành tráng. Được UNESCO công nhận Di sản văn hóa phi vật thể.',
    highlight: true
  },

  // --- Toàn quốc ---
  {
    id: 50, name: 'Đại Lễ Phật Đản – Vesak', province: 'all', provinceName: 'Toàn quốc',
    lunarMonth: 4, lunarDay: 15,
    solarMonth: 5, solarDay: 31, solarYear: 2026,
    duration: 'Rằm tháng 4 âm lịch',
    location: 'Các chùa trên toàn quốc',
    type: 'Phật giáo',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Đại lễ Phật Đản (Vesak) kỷ niệm ngày Đức Phật Thích Ca Mâu Ni đản sinh. Các chùa trên toàn quốc tổ chức lễ tắm Phật, thả hoa đăng, diễu hành xe hoa và nhiều hoạt động Phật sự.',
    highlight: true
  },

  // --- An Giang ---
  {
    id: 51, name: 'Lễ Hội Bà Chúa Xứ Núi Sam', province: 'angiang', provinceName: 'An Giang',
    lunarMonth: 4, lunarDay: 24,
    solarMonth: 6, solarDay: 8, solarYear: 2026,
    duration: '23 – 27 tháng 4 âm lịch',
    location: 'P. Núi Sam, TP. Châu Đốc, An Giang',
    type: 'Tín ngưỡng dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Bà Chúa Xứ Núi Sam là lễ hội lớn nhất miền Tây Nam Bộ, thu hút hàng triệu lượt khách mỗi năm. Lễ hội có nghi lễ tắm bà, thay bộ áo mão và lễ túc yết trang nghiêm.',
    highlight: true
  },

  // --- Sóc Trăng ---
  {
    id: 52, name: 'Lễ Hội Chùa Dơi – Sóc Trăng', province: 'soctrang', provinceName: 'Sóc Trăng',
    lunarMonth: 4, lunarDay: 15,
    solarMonth: 5, solarDay: 31, solarYear: 2026,
    duration: 'Rằm tháng 4 âm lịch',
    location: 'P. 3, TP. Sóc Trăng, Sóc Trăng',
    type: 'Phật giáo Khmer',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ Phật Đản tại Chùa Dơi (Chùa Mahatúp) – ngôi chùa Khmer nổi tiếng với đàn dơi hàng ngàn con. Lễ hội mang đậm bản sắc Phật giáo Nam tông Khmer với nghi lễ tắm Phật và thả đèn trời.',
    highlight: false
  },

  // --- Quảng Bình ---
  {
    id: 53, name: 'Lễ Hội Đền Thánh Mẫu Liễu Hạnh', province: 'quangbinh', provinceName: 'Quảng Bình',
    lunarMonth: 4, lunarDay: 3,
    solarMonth: 5, solarDay: 19, solarYear: 2026,
    duration: '1 – 3 tháng 4 âm lịch',
    location: 'Xã Quảng Đông, H. Quảng Trạch, Quảng Bình',
    type: 'Tín ngưỡng thờ Mẫu',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Đền Thánh Mẫu Liễu Hạnh tại Quảng Bình – nơi theo truyền thuyết Mẫu Liễu đã giáng trần. Lễ hội có hầu đồng, nghi lễ dâng hương và các hoạt động văn hóa truyền thống.',
    highlight: false
  },

  // --- Thừa Thiên Huế ---
  {
    id: 54, name: 'Lễ Hội Điện Huệ Nam (Lần 2)', province: 'hue', provinceName: 'Thừa Thiên Huế',
    lunarMonth: 4, lunarDay: 15,
    solarMonth: 5, solarDay: 31, solarYear: 2026,
    duration: 'Rằm tháng 4 âm lịch',
    location: 'Xã Hương Thọ, TX. Hương Trà, Thừa Thiên Huế',
    type: 'Phật giáo – Dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ Phật Đản tại Huế là một trong những lễ hội Phật giáo lớn nhất Việt Nam, với diễu hành xe hoa trên các đường phố cố đô, lễ tắm Phật và thả hoa đăng trên sông Hương.',
    highlight: false
  },

  // ========================================
  // THÁNG NĂM (Tháng 5 Âm Lịch)
  // ========================================

  // --- Toàn quốc ---
  {
    id: 55, name: 'Tết Đoan Ngọ (Diệt Sâu Bọ)', province: 'all', provinceName: 'Toàn quốc',
    lunarMonth: 5, lunarDay: 5,
    solarMonth: 6, solarDay: 19, solarYear: 2026,
    duration: 'Mùng 5 tháng 5 âm lịch',
    location: 'Toàn quốc',
    type: 'Lễ tết truyền thống',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Tết Đoan Ngọ (mùng 5 tháng 5) là ngày "diệt sâu bọ", ăn cơm rượu nếp, trái cây vào giờ Ngọ (giữa trưa). Theo dân gian, đây là ngày tẩy trừ sâu bệnh, uế khí trong cơ thể.',
    highlight: true
  },

  // --- Đồng Tháp ---
  {
    id: 56, name: 'Lễ Hội Sen Đồng Tháp', province: 'dongthap', provinceName: 'Đồng Tháp',
    lunarMonth: 5, lunarDay: 10,
    solarMonth: 6, solarDay: 24, solarYear: 2026,
    duration: 'Tháng 5 – 6 dương lịch (mùa sen nở)',
    location: 'TP. Cao Lãnh & TP. Sa Đéc, Đồng Tháp',
    type: 'Lễ hội văn hóa – Du lịch',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Sen Đồng Tháp tôn vinh hoa sen – biểu tượng của tỉnh Đồng Tháp và đất sen hồng. Lễ hội có triển lãm sen, ẩm thực từ sen, đua ghe ngo và các hoạt động văn hóa đặc sắc.',
    highlight: false
  },

  // --- Bắc Giang ---
  {
    id: 57, name: 'Lễ Hội Vải Thiều Lục Ngạn', province: 'bacgiang', provinceName: 'Bắc Giang',
    lunarMonth: 5, lunarDay: 15,
    solarMonth: 6, solarDay: 29, solarYear: 2026,
    duration: 'Tháng 6 dương lịch (mùa vải)',
    location: 'TT. Chũ, H. Lục Ngạn, Bắc Giang',
    type: 'Lễ hội văn hóa – Nông sản',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Vải Thiều Lục Ngạn tôn vinh thương hiệu vải thiều nổi tiếng, kết hợp hội chợ nông sản, văn nghệ dân gian và các hoạt động giao thương, quảng bá du lịch.',
    highlight: false
  },

  // --- Quảng Nam ---
  {
    id: 58, name: 'Đêm Phố Cổ Hội An – Rằm tháng 5', province: 'quangnam', provinceName: 'Quảng Nam',
    lunarMonth: 5, lunarDay: 15,
    solarMonth: 6, solarDay: 29, solarYear: 2026,
    duration: 'Rằm tháng 5 âm lịch',
    location: 'Phố cổ Hội An, TP. Hội An, Quảng Nam',
    type: 'Di sản UNESCO – Văn hóa',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Đêm phố cổ Hội An vào đêm rằm với đèn lồng lung linh, thả hoa đăng trên sông Hoài. Phố cổ Hội An được UNESCO công nhận là Di sản văn hóa thế giới.',
    highlight: false
  },

  // ========================================
  // THÁNG SÁU (Tháng 6 Âm Lịch)
  // ========================================

  // --- Thái Nguyên ---
  {
    id: 59, name: 'Lễ Hội Đền Đuổm', province: 'thainguyen', provinceName: 'Thái Nguyên',
    lunarMonth: 6, lunarDay: 6,
    solarMonth: 7, solarDay: 20, solarYear: 2026,
    duration: '3 – 6 tháng 6 âm lịch',
    location: 'Xã Động Đạt, H. Phú Lương, Thái Nguyên',
    type: 'Lễ hội lịch sử',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Đền Đuổm tưởng nhớ Dương Tự Minh – thủ lĩnh dân tộc Tày, hai lần đánh bại quân Tống. Lễ hội có lễ rước kiệu, tế lễ và các hoạt động văn hóa dân tộc Tày, Nùng.',
    highlight: false
  },

  // --- Cần Thơ ---
  {
    id: 60, name: 'Lễ Hội Vía Bà Ngũ Hành', province: 'cantho', provinceName: 'Cần Thơ',
    lunarMonth: 6, lunarDay: 15,
    solarMonth: 7, solarDay: 29, solarYear: 2026,
    duration: 'Rằm tháng 6 âm lịch',
    location: 'Q. Ninh Kiều, TP. Cần Thơ',
    type: 'Tín ngưỡng dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ Vía Bà Ngũ Hành (Ngũ Hành Nương Nương) là tín ngưỡng phổ biến tại miền Tây, cầu mong mưa thuận gió hòa, mùa màng tốt tươi. Lễ hội có diễn xướng hát bội truyền thống.',
    highlight: false
  },

  // --- Hà Giang ---
  {
    id: 61, name: 'Lễ Hội Chợ Tình Khau Vai', province: 'hagiang', provinceName: 'Hà Giang',
    lunarMonth: 6, lunarDay: 27,
    solarMonth: 8, solarDay: 10, solarYear: 2026,
    duration: '27 tháng 6 âm lịch (họp 1 phiên/năm)',
    location: 'Xã Khau Vai, H. Mèo Vạc, Hà Giang',
    type: 'Lễ hội dân tộc – Dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Chợ Tình Khau Vai là phiên chợ tình duy nhất ở Việt Nam, họp một phiên duy nhất trong năm vào ngày 27/6 âm lịch. Đồng bào Hmông, Giáy, Tày, Nùng đến chợ gặp gỡ người yêu cũ.',
    highlight: true
  },

  // --- Gia Lai ---
  {
    id: 62, name: 'Lễ Hội Pơ Thi (Bỏ Mả)', province: 'gialai', provinceName: 'Gia Lai',
    lunarMonth: 6, lunarDay: 10,
    solarMonth: 7, solarDay: 24, solarYear: 2026,
    duration: 'Tháng 6 – 7 dương lịch (sau mùa rẫy)',
    location: 'Các buôn làng, H. Ia Grai & TP. Pleiku, Gia Lai',
    type: 'Lễ hội dân tộc – Tâm linh',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ Pơ Thi (Bỏ Mả) là nghi lễ lớn nhất của đồng bào Gia Rai, Ba Na ở Tây Nguyên, đánh dấu sự chia tay vĩnh viễn giữa người sống và người chết. Lễ hội kéo dài nhiều ngày với cồng chiêng.',
    highlight: false
  },

  // ========================================
  // THÁNG BẢY (Tháng 7 Âm Lịch)
  // ========================================

  // --- Toàn quốc ---
  {
    id: 63, name: 'Đại Lễ Vu Lan Báo Hiếu', province: 'all', provinceName: 'Toàn quốc',
    lunarMonth: 7, lunarDay: 15,
    solarMonth: 8, solarDay: 27, solarYear: 2026,
    duration: 'Rằm tháng 7 âm lịch',
    location: 'Các chùa trên toàn quốc',
    type: 'Phật giáo',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ Vu Lan (Rằm tháng 7) là mùa Báo hiếu, tưởng nhớ cha mẹ và tổ tiên. Các chùa tổ chức lễ cầu siêu, phóng sinh, thả hoa đăng. Người dân cài hoa hồng tưởng nhớ mẹ.',
    highlight: true
  },
  {
    id: 64, name: 'Lễ Xá Tội Vong Nhân (Cúng Cô Hồn)', province: 'all', provinceName: 'Toàn quốc',
    lunarMonth: 7, lunarDay: 15,
    solarMonth: 8, solarDay: 27, solarYear: 2026,
    duration: 'Rằm tháng 7 âm lịch',
    location: 'Toàn quốc',
    type: 'Tín ngưỡng dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Rằm tháng 7 còn gọi là ngày Xá tội vong nhân, dân gian cúng cô hồn, đốt vàng mã. Theo tín ngưỡng, tháng 7 cửa ngục mở, các vong hồn được thả về dương gian.',
    highlight: false
  },

  // --- Bến Tre ---
  {
    id: 65, name: 'Lễ Hội Dừa Bến Tre', province: 'bentre', provinceName: 'Bến Tre',
    lunarMonth: 7, lunarDay: 1,
    solarMonth: 8, solarDay: 13, solarYear: 2026,
    duration: 'Tháng 7 – 8 dương lịch',
    location: 'TP. Bến Tre, Bến Tre',
    type: 'Lễ hội văn hóa – Du lịch',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Dừa Bến Tre tôn vinh xứ dừa – thủ phủ dừa Việt Nam. Lễ hội trưng bày các sản phẩm từ dừa, ẩm thực dừa, biểu diễn nghệ thuật và các hoạt động du lịch sinh thái.',
    highlight: false
  },

  // --- Đắk Lắk ---
  {
    id: 66, name: 'Lễ Hội Cồng Chiêng Tây Nguyên', province: 'daklak', provinceName: 'Đắk Lắk',
    lunarMonth: 7, lunarDay: 10,
    solarMonth: 8, solarDay: 22, solarYear: 2026,
    duration: 'Tháng 3 hoặc tháng 8 dương lịch (theo năm)',
    location: 'TP. Buôn Ma Thuột, Đắk Lắk',
    type: 'Di sản UNESCO – Dân tộc',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Không gian Văn hóa Cồng Chiêng Tây Nguyên được UNESCO công nhận là Kiệt tác truyền khẩu và di sản phi vật thể. Lễ hội quy tụ các đội cồng chiêng của nhiều dân tộc Tây Nguyên.',
    highlight: true
  },

  // ========================================
  // THÁNG TÁM (Tháng 8 Âm Lịch)
  // ========================================

  // --- Hà Nội ---
  {
    id: 67, name: 'Lễ Hội Phủ Tây Hồ (Tiệc Mẫu 13/8)', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 8, lunarDay: 13,
    solarMonth: 9, solarDay: 24, solarYear: 2026,
    duration: 'Ngày 13 tháng 8 âm lịch',
    location: 'P. Quảng An, Q. Tây Hồ, Hà Nội',
    type: 'Tín ngưỡng thờ Mẫu',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Tiệc Mẫu Phủ Tây Hồ 13/8 – ngày Mẫu Liễu Hạnh hiển thánh. Đây là một trong những buổi lễ được tổ chức trang trọng nhất trong năm tại phủ.',
    highlight: false
  },

  // --- Toàn quốc ---
  {
    id: 68, name: 'Tết Trung Thu', province: 'all', provinceName: 'Toàn quốc',
    lunarMonth: 8, lunarDay: 15,
    solarMonth: 9, solarDay: 26, solarYear: 2026,
    duration: 'Rằm tháng 8 âm lịch',
    location: 'Toàn quốc',
    type: 'Lễ tết truyền thống',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Tết Trung Thu (Rằm tháng 8) là Tết Thiếu nhi, Tết Đoàn viên. Trẻ em rước đèn, phá cỗ, ngắm trăng. Các loại bánh Trung thu, lân sư rồng tạo không khí lễ hội khắp nơi.',
    highlight: true
  },

  // --- Hải Dương ---
  {
    id: 69, name: 'Lễ Hội Côn Sơn – Kiếp Bạc', province: 'haiduong', provinceName: 'Hải Dương',
    lunarMonth: 8, lunarDay: 20,
    solarMonth: 10, solarDay: 1, solarYear: 2026,
    duration: '15 – 20 tháng 8 âm lịch',
    location: 'Xã Cộng Hòa & TT. Sao Đỏ, H. Chí Linh, Hải Dương',
    type: 'Lễ hội lịch sử – Di tích quốc gia đặc biệt',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Côn Sơn – Kiếp Bạc tưởng nhớ Hưng Đạo Đại Vương Trần Quốc Tuấn và danh nhân Nguyễn Trãi. Lễ hội có lễ tế trang nghiêm, hội quân trên sông Lục Đầu và nghi lễ hầu đồng.',
    highlight: true
  },

  // --- Thanh Hóa ---
  {
    id: 70, name: 'Lễ Hội Lam Kinh', province: 'thanhhoa', provinceName: 'Thanh Hóa',
    lunarMonth: 8, lunarDay: 22,
    solarMonth: 10, solarDay: 3, solarYear: 2026,
    duration: '21 – 22 tháng 8 âm lịch',
    location: 'Xã Xuân Lam, H. Thọ Xuân, Thanh Hóa',
    type: 'Lễ hội lịch sử',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Lam Kinh tưởng niệm ngày vua Lê Lợi băng hà (22/8 âm lịch), tái hiện lịch sử anh hùng vương triều Lê. Lễ hội có diễn xướng "Quân trò Xuân Phả" – di sản văn hóa phi vật thể.',
    highlight: false
  },

  // --- Hà Nam ---
  {
    id: 71, name: 'Lễ Hội Đền Trần Thương', province: 'hanam', provinceName: 'Hà Nam',
    lunarMonth: 8, lunarDay: 20,
    solarMonth: 10, solarDay: 1, solarYear: 2026,
    duration: '18 – 20 tháng 8 âm lịch',
    location: 'Xã Nhân Đạo, H. Lý Nhân, Hà Nam',
    type: 'Tín ngưỡng dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Đền Trần Thương tưởng nhớ Hưng Đạo Đại Vương Trần Quốc Tuấn. Nổi bật với nghi lễ rước kiệu, hầu đồng và lễ dâng lửa thiêng đặc sắc vào ban đêm.',
    highlight: false
  },

  // --- Đồng Nai ---
  {
    id: 72, name: 'Lễ Hội Chùa Ông Biên Hòa', province: 'dongnai', provinceName: 'Đồng Nai',
    lunarMonth: 8, lunarDay: 15,
    solarMonth: 9, solarDay: 26, solarYear: 2026,
    duration: '14 – 16 tháng 8 âm lịch',
    location: 'P. Thanh Bình, TP. Biên Hòa, Đồng Nai',
    type: 'Tín ngưỡng dân gian – Văn hóa Hoa',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Chùa Ông (Thất Phủ Cổ Miếu) Biên Hòa là lễ hội cổ nhất của cộng đồng người Hoa tại miền Đông Nam Bộ, với lễ diễu hành, múa lân sư rồng và nghi lễ cúng tế truyền thống.',
    highlight: false
  },

  // ========================================
  // THÁNG CHÍN (Tháng 9 Âm Lịch)
  // ========================================

  // --- Thái Bình ---
  {
    id: 73, name: 'Lễ Hội Chùa Keo (Thu)', province: 'thaibinh', provinceName: 'Thái Bình',
    lunarMonth: 9, lunarDay: 14,
    solarMonth: 10, solarDay: 24, solarYear: 2026,
    duration: '13 – 15 tháng 9 âm lịch',
    location: 'Xã Duy Nhất, H. Vũ Thư, Thái Bình',
    type: 'Phật giáo – Dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Chùa Keo mùa thu (13-15/9 âm lịch) là lễ hội chính trong năm, lớn hơn lễ hội mùa xuân. Nổi bật với cuộc thi bơi chải, đu tiên, pháo đất và nghi lễ rước kiệu trang trọng.',
    highlight: true
  },

  // --- Toàn quốc ---
  {
    id: 74, name: 'Tết Trùng Cửu (Tết Trùng Dương)', province: 'all', provinceName: 'Toàn quốc',
    lunarMonth: 9, lunarDay: 9,
    solarMonth: 10, solarDay: 19, solarYear: 2026,
    duration: 'Mùng 9 tháng 9 âm lịch',
    location: 'Toàn quốc',
    type: 'Lễ tết truyền thống',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Tết Trùng Cửu (9/9 âm lịch) là ngày lên cao ngắm cảnh, uống rượu hoa cúc, cầu trường thọ. Tại nhiều đền chùa có lễ cúng vào dịp này theo truyền thống phương Đông.',
    highlight: false
  },

  // --- Ninh Thuận ---
  {
    id: 75, name: 'Lễ Hội Katê – Người Chăm', province: 'ninhthuan', provinceName: 'Ninh Thuận',
    lunarMonth: 9, lunarDay: 1,
    solarMonth: 10, solarDay: 11, solarYear: 2026,
    duration: 'Tháng 7 lịch Chăm (≈ tháng 10 DL)',
    location: 'TT. Phước Dân, H. Ninh Phước, Ninh Thuận',
    type: 'Di sản văn hóa dân tộc Chăm',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Katê là lễ hội lớn nhất của người Chăm theo đạo Bà La Môn, tổ chức tại các tháp Chăm cổ (Tháp Pô Klong Garai, Pô Rômê). Lễ hội có nghi lễ mở cửa tháp, rước y trang và múa hát Chăm.',
    highlight: true
  },

  // --- Sóc Trăng ---
  {
    id: 76, name: 'Lễ Hội Ok Om Bok – Đua Ghe Ngo', province: 'soctrang', provinceName: 'Sóc Trăng',
    lunarMonth: 9, lunarDay: 15,
    solarMonth: 10, solarDay: 25, solarYear: 2026,
    duration: '14 – 15 tháng 9 âm lịch',
    location: 'TP. Sóc Trăng, Sóc Trăng',
    type: 'Lễ hội dân tộc Khmer',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Ok Om Bok (Cúng Trăng) của đồng bào Khmer Nam Bộ kết hợp đua ghe ngo (ghe dài Khmer) trên sông Maspéro. Đây là một trong những lễ hội dân tộc lớn nhất ĐBSCL.',
    highlight: true
  },

  // --- Hà Nội ---
  {
    id: 77, name: 'Lễ Hội Đền Ngọc Sơn', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 9, lunarDay: 20,
    solarMonth: 10, solarDay: 30, solarYear: 2026,
    duration: '20 tháng 9 âm lịch',
    location: 'P. Hàng Trống, Q. Hoàn Kiếm, Hà Nội',
    type: 'Tín ngưỡng dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Đền Ngọc Sơn giữa Hồ Gươm tưởng nhớ Đức Thánh Trần (Hưng Đạo Đại Vương) và Văn Xương Đế Quân. Lễ hội có nghi lễ tế trang nghiêm giữa lòng Thủ đô.',
    highlight: false
  },

  // ========================================
  // THÁNG MƯỜI (Tháng 10 Âm Lịch)
  // ========================================

  // --- Toàn quốc ---
  {
    id: 78, name: 'Tết Cơm Mới (Hạ Nguyên)', province: 'all', provinceName: 'Toàn quốc',
    lunarMonth: 10, lunarDay: 15,
    solarMonth: 11, solarDay: 24, solarYear: 2026,
    duration: 'Rằm tháng 10 âm lịch',
    location: 'Toàn quốc',
    type: 'Lễ tết truyền thống',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Tết Hạ Nguyên (Rằm tháng 10) hay Tết Cơm Mới, dân gian cúng cơm mới dâng tổ tiên, tạ ơn trời đất sau vụ mùa. Tại các chùa có lễ cúng Tam Nguyên (Thượng – Trung – Hạ).',
    highlight: false
  },

  // --- Tuyên Quang ---
  {
    id: 79, name: 'Lễ Hội Thành Tuyên (Trung Thu)', province: 'tuyenquang', provinceName: 'Tuyên Quang',
    lunarMonth: 10, lunarDay: 1,
    solarMonth: 11, solarDay: 10, solarYear: 2026,
    duration: 'Rằm tháng 8 âm lịch (tháng 9 DL)',
    location: 'TP. Tuyên Quang, Tuyên Quang',
    type: 'Lễ hội văn hóa – Du lịch',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Thành Tuyên nổi tiếng với những mô hình đèn Trung thu khổng lồ, diễu hành qua các tuyến phố. Đây được coi là Lễ hội Trung thu lớn nhất Việt Nam.',
    highlight: false
  },

  // --- Lai Châu ---
  {
    id: 80, name: 'Lễ Hội Mừng Cơm Mới – Dân Tộc Thái', province: 'laichau', provinceName: 'Lai Châu',
    lunarMonth: 10, lunarDay: 10,
    solarMonth: 11, solarDay: 19, solarYear: 2026,
    duration: 'Tháng 10 âm lịch (sau thu hoạch)',
    location: 'Các bản Thái, TP. Lai Châu, Lai Châu',
    type: 'Lễ hội dân tộc',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ mừng cơm mới của người Thái là nghi lễ tạ ơn thần linh sau mùa gặt. Lễ hội có cúng Then, ném còn, múa xòe Thái và uống rượu cần bên bếp lửa.',
    highlight: false
  },

  // --- Trà Vinh ---
  {
    id: 81, name: 'Lễ Hội Óc Om Bóc – Trà Vinh', province: 'travinh', provinceName: 'Trà Vinh',
    lunarMonth: 10, lunarDay: 15,
    solarMonth: 11, solarDay: 24, solarYear: 2026,
    duration: '14 – 15 tháng 10 âm lịch',
    location: 'TP. Trà Vinh, Trà Vinh',
    type: 'Lễ hội dân tộc Khmer',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Óc Om Bóc tại Trà Vinh cùng truyền thống Ok Om Bok của đồng bào Khmer, có đua ghe ngo, thả đèn gió và cúng trăng. Trà Vinh có cộng đồng Khmer lớn nhất ĐBSCL.',
    highlight: false
  },

  // ========================================
  // THÁNG MƯỜI MỘT (Tháng 11 Âm Lịch)
  // ========================================

  // --- Hà Nội ---
  {
    id: 82, name: 'Lễ Hội Đền Quán Thánh', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 11, lunarDay: 1,
    solarMonth: 12, solarDay: 10, solarYear: 2026,
    duration: 'Mùng 1 tháng 11 âm lịch',
    location: 'P. Quán Thánh, Q. Ba Đình, Hà Nội',
    type: 'Tín ngưỡng dân gian',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Đền Quán Thánh (Trấn Vũ Quán) thờ Huyền Thiên Trấn Vũ – một trong Thăng Long Tứ Trấn. Lễ hội có tế lễ trang nghiêm, dâng hương và lễ giỗ Thánh đầu tháng 11 âm lịch.',
    highlight: false
  },

  // --- Quảng Ninh ---
  {
    id: 83, name: 'Lễ Hội Bạch Đằng', province: 'quangninh', provinceName: 'Quảng Ninh',
    lunarMonth: 11, lunarDay: 18,
    solarMonth: 12, solarDay: 27, solarYear: 2026,
    duration: '18 tháng 11 âm lịch',
    location: 'Xã Yên Giang, TX. Quảng Yên, Quảng Ninh',
    type: 'Lễ hội lịch sử',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Bạch Đằng tưởng niệm chiến thắng Bạch Đằng lịch sử năm 1288 của Hưng Đạo Đại Vương. Lễ hội có nghi lễ tại Đền Trần Hưng Đạo, tái hiện trận cọc trên sông Bạch Đằng.',
    highlight: false
  },

  // --- Điện Biên ---
  {
    id: 84, name: 'Lễ Hội Hoa Ban', province: 'dienbien', provinceName: 'Điện Biên',
    lunarMonth: 11, lunarDay: 15,
    solarMonth: 12, solarDay: 24, solarYear: 2026,
    duration: 'Tháng 3 dương lịch (mùa hoa ban nở)',
    location: 'TP. Điện Biên Phủ, Điện Biên',
    type: 'Lễ hội văn hóa dân tộc',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Hoa Ban tôn vinh loài hoa biểu tượng của vùng Tây Bắc, gắn với truyền thuyết tình yêu của đồng bào Thái. Lễ hội có múa xòe, ném còn, kéo co và các trò chơi dân gian.',
    highlight: false
  },

  // --- Đồng Nai ---
  {
    id: 85, name: 'Lễ Hội Sayangva – Dân Tộc Chơ Ro', province: 'dongnai', provinceName: 'Đồng Nai',
    lunarMonth: 11, lunarDay: 10,
    solarMonth: 12, solarDay: 19, solarYear: 2026,
    duration: 'Tháng 11 – 12 âm lịch (sau thu hoạch)',
    location: 'Xã Phú Lý, H. Vĩnh Cửu, Đồng Nai',
    type: 'Lễ hội dân tộc',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ hội Sayangva (cúng thần Lúa) của dân tộc Chơ Ro là lễ hội truyền thống lớn nhất của cộng đồng người bản địa Đồng Nai, cảm tạ thần linh ban mùa màng bội thu.',
    highlight: false
  },

  // ========================================
  // THÁNG CHẠP (Tháng 12 Âm Lịch)
  // ========================================

  // --- Toàn quốc ---
  {
    id: 86, name: 'Lễ Cúng Ông Táo (Tiễn Ông Công Ông Táo)', province: 'all', provinceName: 'Toàn quốc',
    lunarMonth: 12, lunarDay: 23,
    solarMonth: 1, solarDay: 31, solarYear: 2027,
    duration: '23 tháng Chạp âm lịch',
    location: 'Toàn quốc',
    type: 'Lễ tết truyền thống',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Lễ cúng Ông Táo (23 tháng Chạp) tiễn Ông Công Ông Táo về trời báo cáo Ngọc Hoàng. Người dân thả cá chép, dọn dẹp bàn thờ, chuẩn bị đón Tết Nguyên Đán.',
    highlight: true
  },
  {
    id: 87, name: 'Tất Niên – Tết Nguyên Đán', province: 'all', provinceName: 'Toàn quốc',
    lunarMonth: 12, lunarDay: 30,
    solarMonth: 2, solarDay: 6, solarYear: 2027,
    duration: '30 tháng Chạp (Giao Thừa)',
    location: 'Toàn quốc',
    type: 'Quốc lễ – Tết Nguyên Đán',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Đêm Giao Thừa (30 Tết) là thời khắc thiêng liêng nhất trong năm, đón năm mới. Các gia đình cúng Giao Thừa ngoài trời (lễ Trừ Tịch), đi hái lộc, xông đất đầu năm.',
    highlight: true
  },

  // --- Hà Nội ---
  {
    id: 88, name: 'Chợ Hoa Tết Quảng Bá – Nhật Tân', province: 'hanoi', provinceName: 'Hà Nội',
    lunarMonth: 12, lunarDay: 25,
    solarMonth: 2, solarDay: 2, solarYear: 2027,
    duration: '25 – 30 tháng Chạp âm lịch',
    location: 'P. Quảng An & P. Nhật Tân, Q. Tây Hồ, Hà Nội',
    type: 'Chợ Tết truyền thống',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Chợ hoa Tết Quảng Bá – Nhật Tân là chợ hoa Tết nổi tiếng nhất Hà Nội, họp suốt đêm những ngày cuối năm. Hoa đào Nhật Tân, quất Tứ Liên tạo nên không khí Tết cổ truyền.',
    highlight: false
  },

  // --- TP. Hồ Chí Minh ---
  {
    id: 89, name: 'Đường Hoa Nguyễn Huệ – Tết Nguyên Đán', province: 'hcm', provinceName: 'TP. Hồ Chí Minh',
    lunarMonth: 12, lunarDay: 28,
    solarMonth: 2, solarDay: 5, solarYear: 2027,
    duration: '28 tháng Chạp đến mùng 5 Tết',
    location: 'Đường Nguyễn Huệ, Q. 1, TP. Hồ Chí Minh',
    type: 'Lễ hội văn hóa – Tết',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Đường hoa Nguyễn Huệ là biểu tượng Tết Sài Gòn, trưng bày tiểu cảnh hoa nghệ thuật dọc phố đi bộ. Hàng triệu người dân và du khách đến tham quan, chụp ảnh mỗi dịp Tết.',
    highlight: true
  },

  // --- Bình Dương ---
  {
    id: 90, name: 'Chợ Hoa Xuân Thủ Dầu Một', province: 'binhduong', provinceName: 'Bình Dương',
    lunarMonth: 12, lunarDay: 25,
    solarMonth: 2, solarDay: 2, solarYear: 2027,
    duration: '25 – 30 tháng Chạp',
    location: 'P. Phú Cường, TP. Thủ Dầu Một, Bình Dương',
    type: 'Chợ Tết truyền thống',
    img: 'assets/places/lehoi-generic.svg',
    desc: 'Chợ hoa Xuân Thủ Dầu Một là chợ hoa Tết lớn nhất Bình Dương, với các loại hoa mai, cúc, lan, quất... tạo không khí Tết rộn ràng cho người dân miền Đông Nam Bộ.',
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
function getFilteredFestivals() {
  return FESTIVALS.filter(f => {
    const matchP = filterProvince === 'all' || f.province === filterProvince;
    const matchM = filterMonth === 'all' || String(f.lunarMonth) === filterMonth;
    return matchP && matchM;
  });
}

window.filterFestivals = function() {
  filterProvince = document.getElementById('filterProvince').value;
  filterMonth    = document.getElementById('filterMonth').value;
  const filtered = getFilteredFestivals();
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

  // Sort by lunar month then lunar day
  const sorted = [...festivals].sort((a, b) => {
    return (a.lunarMonth * 100 + a.lunarDay) - (b.lunarMonth * 100 + b.lunarDay);
  });

  const monthNames = ['', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  const lunarMonthNames = ['', 'Tháng Giêng', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Chạp'];

  // Group by lunar month
  let currentMonth = 0;
  el.innerHTML = sorted.map(f => {
    let monthHeader = '';
    if (f.lunarMonth !== currentMonth) {
      currentMonth = f.lunarMonth;
      monthHeader = `<div class="festival-month-header" style="width:100%;padding:1rem 0 0.5rem;margin-top:1.5rem;border-bottom:2px solid var(--gold);margin-bottom:0.5rem;">
        <h2 style="font-family:var(--font-heading);font-size:1.2rem;color:var(--gold-dark);margin:0;">
          🏮 ${lunarMonthNames[currentMonth]} Âm Lịch
        </h2>
      </div>`;
    }

    return monthHeader + `
    <article class="festival-card fade-in" data-fid="${f.id}">
      <div class="festival-date-box">
        <div class="festival-day">${f.lunarDay}</div>
        <div class="festival-month">${lunarMonthNames[f.lunarMonth]}</div>
        <div class="festival-lunar">${f.solarDay}/${monthNames[f.solarMonth]} DL</div>
      </div>
      <div class="festival-img">
        <img src="${f.img}" alt="${f.name}" loading="lazy">
      </div>
      <div class="festival-info">
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.4rem;flex-wrap:wrap;">
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
  `;
  }).join('');

  // Re-trigger animations
  document.querySelectorAll('.festival-card.fade-in').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 60);
  });
}

// ---- Lunar date lookup for 2026-2027 ----
// Tết 2026 (Bính Ngọ) = 17/02/2026. Lunar month lengths (29 or 30 days).
// Format: [lunarMonth, startSolarMonth, startSolarDay, daysInMonth]
const LUNAR_MONTHS_2026 = [
  [1,  2, 17, 30], // Tháng Giêng: 17/02 – 18/03
  [2,  3, 19, 29], // Tháng Hai:   19/03 – 16/04
  [3,  4, 17, 30], // Tháng Ba:    17/04 – 16/05
  [4,  5, 17, 29], // Tháng Tư:    17/05 – 14/06
  [5,  6, 15, 30], // Tháng Năm:   15/06 – 14/07
  [6,  7, 15, 29], // Tháng Sáu:   15/07 – 12/08
  [7,  8, 13, 30], // Tháng Bảy:   13/08 – 11/09
  [8,  9, 12, 29], // Tháng Tám:   12/09 – 10/10
  [9, 10, 11, 30], // Tháng Chín:  11/10 – 09/11
  [10,11, 10, 29], // Tháng Mười:  10/11 – 08/12
  [11,12,  9, 30], // Tháng 11:    09/12 – 07/01/2027
  [12, 1,  8, 30], // Tháng Chạp:  08/01/2027 – 06/02/2027 (year 2027)
];

function solarToLunar(sYear, sMonth, sDay) {
  const sDate = new Date(sYear, sMonth - 1, sDay);
  const sTime = sDate.getTime();

  for (let i = LUNAR_MONTHS_2026.length - 1; i >= 0; i--) {
    const [lm, sm, sd, days] = LUNAR_MONTHS_2026[i];
    const startYear = lm === 12 ? 2027 : 2026;
    const startDate = new Date(startYear, sm - 1, sd);
    if (sTime >= startDate.getTime()) {
      const diff = Math.floor((sTime - startDate.getTime()) / 86400000);
      if (diff < days) {
        return { lunarDay: diff + 1, lunarMonth: lm };
      }
    }
  }
  return null;
}

// ---- Render Calendar ----
function renderCalendar() {
  const year  = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  const lunarMonthShort = ['', 'Giêng', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', 'Chạp'];
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

  // Get filtered festivals for this solar month + year
  const filtered = getFilteredFestivals();
  const monthFestivals = filtered.filter(f => {
    const cellYear = f.solarYear || 2026;
    return f.solarMonth === month + 1 && cellYear === year;
  });

  document.getElementById('calBody').innerHTML = cells.map(cell => {
    const d = cell.date.getDate();
    const cellMonth = cell.date.getMonth();
    const cellYear = cell.date.getFullYear();
    const isToday = cell.date.toDateString() === today.toDateString();

    // Only show festivals on cells that belong to the current month (NOT other-month cells)
    let dayFests = [];
    if (!cell.other) {
      dayFests = monthFestivals.filter(f => f.solarDay === d);
    }

    // Lunar date
    let lunarStr = '';
    const lunar = solarToLunar(cellYear, cellMonth + 1, d);
    if (lunar) {
      if (lunar.lunarDay === 1) {
        lunarStr = `<span style="color:var(--red);font-weight:700;">1/${lunarMonthShort[lunar.lunarMonth]}</span>`;
      } else if (lunar.lunarDay === 15) {
        lunarStr = `<span style="color:var(--gold-dark);font-weight:600;">${lunar.lunarDay}</span>`;
      } else {
        lunarStr = `<span>${lunar.lunarDay}</span>`;
      }
    }

    return `
      <div class="cal-day ${cell.other ? 'other-month' : ''} ${isToday ? 'today' : ''} ${dayFests.length ? 'has-event' : ''}">
        <div class="day-num">${d}</div>
        <div class="lunar-num">${lunarStr}</div>
        ${dayFests.map(f => `
          <div class="cal-event" title="${f.name} (${f.lunarDay}/${f.lunarMonth} AL)" onclick="scrollToFestival(${f.id})">${f.name}</div>
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
  // Reset filters to show all so the clicked festival is visible
  filterProvince = 'all';
  filterMonth = 'all';
  document.getElementById('filterProvince').value = 'all';
  document.getElementById('filterMonth').value = 'all';
  currentView = 'list';
  document.getElementById('listView').style.display = '';
  document.getElementById('calendarView').style.display = 'none';
  document.getElementById('monthNav').style.display = 'none';
  document.getElementById('btnList').classList.add('active');
  document.getElementById('btnCal').classList.remove('active');
  renderFestivalList(FESTIVALS);
  setTimeout(() => {
    const el = document.querySelector(`[data-fid="${id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.style.boxShadow = '0 0 0 3px var(--gold)';
      setTimeout(() => el.style.boxShadow = '', 2000);
    }
  }, 150);
};
