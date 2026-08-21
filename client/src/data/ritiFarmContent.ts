// Nội dung thật của sản phẩm "Trà Hoa Cúc Chi Hữu Cơ Riti Farm",
// trích từ file "SCRIPT QR SP CỦA RITIFARM.md" (hệ thống Sankit Traceability).

export const PRODUCT_INFO = {
  name: "Trà Hoa Cúc Chi Hữu Cơ Riti Farm",
  tagline: "Sản vật Cúc Tiến Vua từ Vùng di sản Ninh Bình",
  verifiedBy: "Sản phẩm đã qua kiểm định dữ liệu bởi Sankit",
};

export type ResultOptionId = "combined" | "traceability" | "heritage" | "tea_ritual";

export interface ResultOption {
  id: ResultOptionId;
  title: string;
  description: string;
}

export const RESULT_OPTIONS: ResultOption[] = [
  {
    id: "combined",
    title: "Tất cả thông tin (Gộp 3 trong 1)",
    description: "Hiển thị đầy đủ Truy xuất nguồn gốc, Câu chuyện di sản & Nghi thức pha trà",
  },
  {
    id: "traceability",
    title: "Truy xuất nguồn gốc",
    description: "Vùng trồng, chứng nhận hữu cơ, HACCP & công nghệ chế biến",
  },
  {
    id: "heritage",
    title: "Câu chuyện di sản",
    description: "Hành trình 3 giai đoạn của giống Cúc Tiến Vua",
  },
  {
    id: "tea_ritual",
    title: "Nghi thức pha trà",
    description: "Đồng hồ ủ trà + 4 công thức pha chuẩn vị",
  },
];

// ---------- BLOCK 1: SANKIT TRACEABILITY ----------

export interface TraceabilityItem {
  label: string;
  value: string;
  actionLabel: string;
  imageUrl?: string;
}

export const TRACEABILITY_ITEMS: TraceabilityItem[] = [
  {
    label: "Vùng trồng",
    value: "Thôn Bái, Sơn Lai, Nho Quan, Ninh Bình (Vùng đệm Di sản Tràng An).",
    actionLabel: "Vị trí Google Maps Nông trại",
    imageUrl: "/riti/image4.jpg",
  },
  {
    label: "Tiêu chuẩn Canh tác",
    value: "Chứng nhận Hữu cơ Việt Nam TCVN 11041:2017.",
    actionLabel: "Xem giấy chứng nhận Hữu cơ",
    imageUrl: "/riti/image1.jpg",
  },
  {
    label: "Tiêu chuẩn Xưởng",
    value: "HACCP Codex 2020 (Số hiệu kiểm soát an toàn).",
    actionLabel: "Xem chứng nhận HACCP",
    imageUrl: "/riti/image2.jpg",
  },
  {
    label: "Công nghệ Chế biến",
    value: "Sấy lạnh khóa màu & giữ hoạt chất (20°C – 35°C), thay vì phơi truyền thống.",
    actionLabel: "Xem hình ảnh quy trình chế biến",
    imageUrl: "/riti/image9.jpg",
  },
];

// Ảnh thực tế quy trình canh tác & chế biến (thu hái, sấy, đóng gói)
export const PROCESSING_GALLERY: string[] = [
  "/riti/image4.jpg",
  "/riti/image5.jpg",
  "/riti/image6.jpg",
  "/riti/image7.jpg",
  "/riti/image8.jpg",
  "/riti/image9.jpg",
  "/riti/image10.jpg",
  "/riti/image11.jpg",
  "/riti/image12.jpg",
];

// ---------- BLOCK 2: HERITAGE STORYLINE ----------

export interface HeritageCard {
  year: string;
  title: string;
  description: string;
  imageUrl: string;
}

export const HERITAGE_CARDS: HeritageCard[] = [
  {
    year: "1572",
    title: "Đạo y Làng Nghĩa Trai",
    description:
      '3 vị tướng quân thời Lý Thánh Tông hướng dẫn nhân dân trồng cây thuốc. Triết lý khắc trên cửa đền: "Thánh y truyền hậu thế lưu danh" – coi cây thuốc là phương tiện gieo mầm sống.',
    imageUrl: "/riti/image13.jpg",
  },
  {
    year: "Triều đại xưa",
    title: "Danh xưng Cúc Tiến Vua",
    description:
      "Giống cúc hoa nhỏ như nút áo, sắc vàng tươi óng, đậm tinh dầu được các triều đại lựa chọn dâng nộp triều đình.",
    imageUrl: "/riti/image14.jpg",
  },
  {
    year: "Hiện tại",
    title: "Tái sinh tại Vùng đất Di sản Ninh Bình",
    description:
      'Hành trình của nhà sáng lập Hoàng Minh Thành dịch chuyển vùng trồng về gần di sản Tràng An - Bái Đính, thiết lập hệ thống kênh bao cách ly tuyệt đối với hóa chất để "trả hữu cơ lại cho đất".',
    imageUrl: "/riti/image15.jpg",
  },
];

// ---------- BLOCK 4: INTERACTIVE TEA RITUAL ----------

export const BREWING_TIMER = {
  flowerAmount: "15 - 20 Bông Cúc",
  water: "250ml Nước Nóng (85°C - 90°C)",
  durationSeconds: 300, // 05:00
};

export interface TeaRecipe {
  emoji: string;
  title: string;
  ingredients: string;
  steps: string;
  tip: string;
}

export const TEA_RECIPES: TeaRecipe[] = [
  {
    emoji: "1️⃣",
    title: "Trà hoa cúc nguyên bản",
    ingredients: "15-20 bông hoa cúc hữu cơ.",
    steps: "Dùng nước nóng khoảng 85-90°C, ngâm hoa cúc trong 5-7 phút, sau đó thưởng thức.",
    tip: "Sử dụng nước lọc sạch để hương vị trà thuần khiết nhất, uống khi trà còn nóng.",
  },
  {
    emoji: "2️⃣",
    title: "Trà hoa cúc mật ong",
    ingredients: "Hoa cúc khô, 1-2 thìa mật ong.",
    steps: "Sau khi pha trà hoa cúc như cách trên, thêm mật ong vào khuấy đều.",
    tip: "Thêm mật ong khi trà nguội bớt (khoảng 40°C) để giữ nguyên dưỡng chất từ mật ong.",
  },
  {
    emoji: "3️⃣",
    title: "Trà hoa cúc quế",
    ingredients: "Hoa cúc khô, 1 thanh quế nhỏ.",
    steps: "Thêm quế vào cùng hoa cúc khi pha, ngâm khoảng 5-7 phút để hương quế lan tỏa.",
    tip: "Nếu thích vị cay nhẹ, có thể thêm vài lát gừng tươi.",
  },
  {
    emoji: "4️⃣",
    title: "Trà hoa cúc táo đỏ",
    ingredients: "Hoa cúc khô, 2-3 lát táo đỏ khô.",
    steps: "Ngâm táo đỏ cùng hoa cúc trong nước nóng 90°C khoảng 7 phút.",
    tip: "Ngâm táo đỏ trước 1-2 phút để vị ngọt lan tỏa đều hơn.",
  },
];

// ---------- Payload types gửi qua SignalR tới /projector ----------

export interface CombinedResultPayload {
  type: "combined";
  scanImageUrl?: string;
  product: typeof PRODUCT_INFO;
  items: TraceabilityItem[];
  gallery: string[];
  cards: HeritageCard[];
  brewing: typeof BREWING_TIMER;
  recipes: TeaRecipe[];
}

export interface TraceabilityResultPayload {
  type: "traceability";
  scanImageUrl?: string;
  product: typeof PRODUCT_INFO;
  items: TraceabilityItem[];
  gallery: string[];
}

export interface HeritageResultPayload {
  type: "heritage";
  scanImageUrl?: string;
  product: typeof PRODUCT_INFO;
  cards: HeritageCard[];
}

export interface TeaRitualResultPayload {
  type: "tea_ritual";
  scanImageUrl?: string;
  product: typeof PRODUCT_INFO;
  brewing: typeof BREWING_TIMER;
  recipes: TeaRecipe[];
}

export type ProjectorResultPayload =
  | CombinedResultPayload
  | TraceabilityResultPayload
  | HeritageResultPayload
  | TeaRitualResultPayload;

export function buildResultPayload(
  optionId: ResultOptionId,
  scanImageUrl?: string
): ProjectorResultPayload {
  switch (optionId) {
    case "combined":
      return {
        type: "combined",
        scanImageUrl,
        product: PRODUCT_INFO,
        items: TRACEABILITY_ITEMS,
        gallery: PROCESSING_GALLERY,
        cards: HERITAGE_CARDS,
        brewing: BREWING_TIMER,
        recipes: TEA_RECIPES,
      };
    case "traceability":
      return {
        type: "traceability",
        scanImageUrl,
        product: PRODUCT_INFO,
        items: TRACEABILITY_ITEMS,
        gallery: PROCESSING_GALLERY,
      };
    case "heritage":
      return {
        type: "heritage",
        scanImageUrl,
        product: PRODUCT_INFO,
        cards: HERITAGE_CARDS,
      };
    case "tea_ritual":
      return {
        type: "tea_ritual",
        scanImageUrl,
        product: PRODUCT_INFO,
        brewing: BREWING_TIMER,
        recipes: TEA_RECIPES,
      };
  }
}
