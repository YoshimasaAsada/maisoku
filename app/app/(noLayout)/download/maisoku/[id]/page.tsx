"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Document,
  Page as PDFPage,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "NotoSansJP",
  fonts: [
    {
      src: "/fonts/NotoSansJP-Regular.ttf",
    },
    {
      src: "/fonts/NotoSansJP-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

// スタイル設定
const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansJP",
    padding: 20,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  section: {
    flexDirection: "row",
    marginBottom: 10,
  },
  leftColumn: {
    width: "60%",
    marginRight: 10,
  },
  rightColumn: {
    width: "40%",
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: "#555",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF0000",
  },
  map: {
    width: "100%",
    height: 100,
    backgroundColor: "#CCC",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  floorPlan: {
    width: "100%",
    height: 100,
    backgroundColor: "#EEE",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

const sampleData = {
  id: "prop-001",
  title: "モダンな3LDKマンション",
  description: "都心に位置するモダンなデザインの3LDKマンション。駅徒歩5分。",
  price: 50000000,
  location: {
    address: "東京都渋谷区渋谷1-1-1",
    latitude: 35.661991,
    longitude: 139.704441,
  },
  size: {
    floorArea: 80.0,
    unit: "m2",
  },
  rooms: {
    bedrooms: 3,
    bathrooms: 1,
    livingRooms: 1,
  },
  features: ["ペット可", "駐車場付き", "エアコン完備"],
  images: [
    "https://example.com/images/property1-1.jpg",
    "https://example.com/images/property1-2.jpg",
  ],
  status: "available",
  seller: {
    id: "seller-001",
    name: "不動産会社A",
    contact: {
      email: "info@realestate-a.jp",
      phone: "03-1234-5678",
    },
  },
  createdAt: "2025-01-01T10:00:00Z",
  updatedAt: "2025-01-01T10:00:00Z",
};

// PDFドキュメント
const MyDocument = (
  {
    //   address,
    //   postalCode,
    // }: {
    //   address: string;
    //   postalCode: string;
  }
) => (
  // <Document>
  //   <PDFPage size={[841.89, 595.28]} style={styles.page}>
  //     {/* A4 横向きサイズ */}
  //     <View style={styles.section}>
  //       <Text>住所: {address}</Text>
  //     </View>
  //     <View style={styles.section}>
  //       <Text>郵便番号: {postalCode}</Text>
  //     </View>
  //   </PDFPage>
  // </Document>
  <Document>
    <PDFPage size={[841.89, 595.28]} style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{sampleData.title}</Text>
          <Text style={styles.subtitle}>{sampleData.description}</Text>
        </View>
        <View>
          <Text style={styles.price}>¥{sampleData.price.toLocaleString()}</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.section}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          <Text style={styles.text}>住所: {sampleData.location.address}</Text>
          <Text style={styles.text}>
            面積: {sampleData.size.floorArea} {sampleData.size.unit}
          </Text>
          <Text style={styles.text}>
            間取り: {sampleData.rooms.bedrooms}LDK
          </Text>
          <Text style={styles.text}>
            特徴: {sampleData.features.join(" / ")}
          </Text>
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          <View style={styles.map}>
            <Text>地図 (仮)</Text>
          </View>
          <View style={styles.floorPlan}>
            <Text>間取り図 (仮)</Text>
          </View>
        </View>
      </View>

      {/* Seller Info */}
      <View style={styles.section}>
        <Text style={styles.text}>販売者: {sampleData.seller.name}</Text>
        <Text style={styles.text}>
          連絡先: {sampleData.seller.contact.email} /{" "}
          {sampleData.seller.contact.phone}
        </Text>
      </View>
    </PDFPage>
  </Document>
);

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("maisoku")
        .select("*")
        .eq("id", id);

      if (!error) {
        setData(data[0]); // 必要なレコードを取得
      } else {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>データが見つかりません。</p>;
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        {/* <MyDocument address={data.address} postalCode={data.postal_code} /> */}
        <MyDocument />
      </PDFViewer>
    </div>
  );
}
