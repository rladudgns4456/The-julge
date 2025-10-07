import { NotificationItem, NotificationListResponse } from "@/types/notification";

// Mock 알림 데이터
export const mockNotifications: NotificationItem[] = [
  {
    item: {
      id: "notif-001",
      createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      result: "accepted",
      read: false,
      application: {
        item: {
          id: "app-001",
          status: "accepted",
        },
        href: "/applications/app-001",
      },
      shop: {
        item: {
          id: "shop-001",
          name: "스타벅스 강남점",
          category: "카페",
          address1: "서울특별시 강남구",
          address2: "테헤란로 123",
          description: "강남역 근처 스타벅스",
          imageUrl:
            "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbadX3j%2Fbtq1dzBajoB%2FAAAAAAAAAAAAAAAAAAAAAAHjXPBBUId8mXTGGGhITSZ31cJxDxVfAiHQs5k0wWG5%2Fimg.webp%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1761922799%26allow_ip%3D%26allow_referer%3D%26signature%3DeEd5fq4XpX3nDc1Jj96okAIOsBY%253D",
          originalHourlyPay: 12000,
        },
        href: "/shops/shop-001",
      },
      notice: {
        item: {
          id: "notice-001",
          hourlyPay: 13000,
          description: "주말 아침 근무 가능하신 분",
          startsAt: "2024-03-15T09:00:00Z",
          workhour: 8,
          closed: false,
        },
        href: "/notices/notice-001",
      },
    },
    links: [],
  },
  {
    item: {
      id: "notif-002",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      result: "rejected",
      read: false,
      application: {
        item: {
          id: "app-002",
          status: "rejected",
        },
        href: "/applications/app-002",
      },
      shop: {
        item: {
          id: "shop-002",
          name: "투썸플레이스 신촌점",
          category: "카페",
          address1: "서울특별시 서대문구",
          address2: "신촌로 456",
          description: "신촌역 근처 카페",
          imageUrl: "https://commons.wikimedia.org/wiki/File:Bi_img_logo.svg",
          originalHourlyPay: 11000,
        },
        href: "/shops/shop-002",
      },
      notice: {
        item: {
          id: "notice-002",
          hourlyPay: 12000,
          description: "평일 오후 근무",
          startsAt: "2024-03-16T14:00:00Z",
          workhour: 4,
          closed: false,
        },
        href: "/notices/notice-002",
      },
    },
    links: [],
  },
  {
    item: {
      id: "notif-003",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      result: "accepted",
      read: true,
      application: {
        item: {
          id: "app-003",
          status: "accepted",
        },
        href: "/applications/app-003",
      },
      shop: {
        item: {
          id: "shop-003",
          name: "CU 홍대점",
          category: "편의점",
          address1: "서울특별시 마포구",
          address2: "홍대입구역 789",
          description: "홍대 편의점",
          imageUrl: "https://commons.wikimedia.org/wiki/File:CU_BI_(2017).svg",
          originalHourlyPay: 10000,
        },
        href: "/shops/shop-003",
      },
      notice: {
        item: {
          id: "notice-003",
          hourlyPay: 11000,
          description: "야간 근무",
          startsAt: "2024-03-17T22:00:00Z",
          workhour: 8,
          closed: true,
        },
        href: "/notices/notice-003",
      },
    },
    links: [],
  },
  {
    item: {
      id: "notif-004",
      createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      result: "accepted",
      read: false,
      application: {
        item: {
          id: "app-004",
          status: "accepted",
        },
        href: "/applications/app-004",
      },
      shop: {
        item: {
          id: "shop-004",
          name: "스타벅스 강남점",
          category: "카페",
          address1: "서울특별시 강남구",
          address2: "테헤란로 123",
          description: "강남역 근처 스타벅스",
          imageUrl:
            "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbadX3j%2Fbtq1dzBajoB%2FAAAAAAAAAAAAAAAAAAAAAAHjXPBBUId8mXTGGGhITSZ31cJxDxVfAiHQs5k0wWG5%2Fimg.webp%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1761922799%26allow_ip%3D%26allow_referer%3D%26signature%3DeEd5fq4XpX3nDc1Jj96okAIOsBY%253D",
          originalHourlyPay: 12000,
        },
        href: "/shops/shop-004",
      },
      notice: {
        item: {
          id: "notice-004",
          hourlyPay: 13000,
          description: "주말 아침 근무 가능하신 분",
          startsAt: "2024-03-15T09:00:00Z",
          workhour: 8,
          closed: false,
        },
        href: "/notices/notice-004",
      },
    },
    links: [],
  },
  {
    item: {
      id: "notif-005",
      createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      result: "accepted",
      read: false,
      application: {
        item: {
          id: "app-005",
          status: "accepted",
        },
        href: "/applications/app-005",
      },
      shop: {
        item: {
          id: "shop-005",
          name: "스타벅스 강남점",
          category: "카페",
          address1: "서울특별시 강남구",
          address2: "테헤란로 123",
          description: "강남역 근처 스타벅스",
          imageUrl:
            "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbadX3j%2Fbtq1dzBajoB%2FAAAAAAAAAAAAAAAAAAAAAAHjXPBBUId8mXTGGGhITSZ31cJxDxVfAiHQs5k0wWG5%2Fimg.webp%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1761922799%26allow_ip%3D%26allow_referer%3D%26signature%3DeEd5fq4XpX3nDc1Jj96okAIOsBY%253D",
          originalHourlyPay: 12000,
        },
        href: "/shops/shop-005",
      },
      notice: {
        item: {
          id: "notice-004",
          hourlyPay: 13000,
          description: "주말 아침 근무 가능하신 분",
          startsAt: "2024-03-15T09:00:00Z",
          workhour: 8,
          closed: false,
        },
        href: "/notices/notice-005",
      },
    },
    links: [],
  },
  {
    item: {
      id: "notif-006",
      createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      result: "accepted",
      read: false,
      application: {
        item: {
          id: "app-006",
          status: "accepted",
        },
        href: "/applications/app-006",
      },
      shop: {
        item: {
          id: "shop-006",
          name: "스타벅스 강남점",
          category: "카페",
          address1: "서울특별시 강남구",
          address2: "테헤란로 123",
          description: "강남역 근처 스타벅스",
          imageUrl:
            "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbadX3j%2Fbtq1dzBajoB%2FAAAAAAAAAAAAAAAAAAAAAAHjXPBBUId8mXTGGGhITSZ31cJxDxVfAiHQs5k0wWG5%2Fimg.webp%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1761922799%26allow_ip%3D%26allow_referer%3D%26signature%3DeEd5fq4XpX3nDc1Jj96okAIOsBY%253D",
          originalHourlyPay: 12000,
        },
        href: "/shops/shop-006",
      },
      notice: {
        item: {
          id: "notice-006",
          hourlyPay: 13000,
          description: "주말 아침 근무 가능하신 분",
          startsAt: "2024-03-15T09:00:00Z",
          workhour: 8,
          closed: false,
        },
        href: "/notices/notice-006",
      },
    },
    links: [],
  },
  {
    item: {
      id: "notif-007",
      createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      result: "accepted",
      read: false,
      application: {
        item: {
          id: "app-007",
          status: "accepted",
        },
        href: "/applications/app-007",
      },
      shop: {
        item: {
          id: "shop-007",
          name: "스타벅스 강남점",
          category: "카페",
          address1: "서울특별시 강남구",
          address2: "테헤란로 123",
          description: "강남역 근처 스타벅스",
          imageUrl:
            "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbadX3j%2Fbtq1dzBajoB%2FAAAAAAAAAAAAAAAAAAAAAAHjXPBBUId8mXTGGGhITSZ31cJxDxVfAiHQs5k0wWG5%2Fimg.webp%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1761922799%26allow_ip%3D%26allow_referer%3D%26signature%3DeEd5fq4XpX3nDc1Jj96okAIOsBY%253D",
          originalHourlyPay: 12000,
        },
        href: "/shops/shop-007",
      },
      notice: {
        item: {
          id: "notice-007",
          hourlyPay: 13000,
          description: "주말 아침 근무 가능하신 분",
          startsAt: "2024-03-15T09:00:00Z",
          workhour: 8,
          closed: false,
        },
        href: "/notices/notice-004",
      },
    },
    links: [],
  },
];

export const getMockNotificationResponse = (): NotificationListResponse => {
  const unreadCount = mockNotifications.filter(n => !n.item.read).length;

  return {
    offset: 0,
    limit: 10,
    count: mockNotifications.length,
    hasNext: false,
    items: mockNotifications,
    links: [],
  };
};
