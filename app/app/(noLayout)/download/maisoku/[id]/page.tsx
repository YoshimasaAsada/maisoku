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
    licenseNumber: "12345678", // 免許番号
    contact: {
      email: "info@realestate-a.jp",
      phone: "03-1234-5678",
      fax: "03-1234-5679", // FAX
      representative: "担当者名", // 担当者
      postalCode: "100-0001", // 問い合わせ先郵便番号
      address: "東京都千代田区千代田1-1", // 問い合わせ先住所
    },
  },
  createdAt: "2025-01-01T10:00:00Z",
  updatedAt: "2025-01-01T10:00:00Z",
  roomNumber: "701号室",
  building: {
    structure: "鉄筋コンクリート造",
    floors: 7,
    builtYear: 1990,
  },
  conditions: {
    deposit: "1ヶ月",
    keyMoney: "1ヶ月",
    renewalFee: "1ヶ月分",
  },
  nearby: [
    { name: "覚王山駅", distance: "徒歩6分" },
    { name: "スーパー", distance: "徒歩5分" },
  ],
  additionalInfo: ["礼金0円キャンペーン！", "ネット無料", "ファミリー向け"],
};

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

const styles = StyleSheet.create({
  page: {
    fontFamily: "NotoSansJP",
    padding: 5,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
    padding: 10,
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  price: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF0000",
    textAlign: "center",
    margin: 10,
  },
  mainSection: {
    flexDirection: "row",
    marginBottom: 10,
  },
  leftColumn: {
    width: "40%",
    padding: 5,
  },
  rightColumn: {
    width: "60%",
    padding: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  map: {
    backgroundColor: "#EEE",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  floorPlan: {
    backgroundColor: "#DDD",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  additionalInfo: {
    marginTop: 10,
    fontSize: 12,
    color: "#000000",
  },
  footer: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 20,
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  tableHeader: {
    backgroundColor: "#EEE",
    fontWeight: "bold",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 12,
    textAlign: "left",
  },
  sellerInfo: {
    flexDirection: "column", // 縦方向
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#F5F5F5",
  },
  sellerInfoRow: {
    flexDirection: "row", // 各行を横方向に並べる
    justifyContent: "space-between", // 左右に余白をつけて整列
    marginBottom: 5,
  },
  sellerInfoText: {
    flex: 1, // 各要素が均等に幅を取る
    fontSize: 12,
    marginHorizontal: 5, // 左右に少し余白
  },
});

// PDFドキュメント
const MyDocument = () => (
  <Document>
    <PDFPage size={[841.89, 595.28]} style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {sampleData.title} {sampleData.roomNumber}
        </Text>
        <Text style={styles.headerSubtitle}>{sampleData.description}</Text>
        <Text style={styles.price}>
          家賃: ¥{sampleData.price.toLocaleString()}
        </Text>
      </View>
      {/* Main Section */}
      <View style={styles.mainSection}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {/* テーブル */}
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>項目</Text>
              <Text style={styles.tableCell}>詳細</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>住所</Text>
              <Text style={styles.tableCell}>
                {sampleData.location.address}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>面積</Text>
              <Text style={styles.tableCell}>
                {sampleData.size.floorArea} {sampleData.size.unit}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>間取り</Text>
              <Text style={styles.tableCell}>
                {sampleData.rooms.bedrooms}LDK
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>構造</Text>
              <Text style={styles.tableCell}>
                {sampleData.building.structure} ({sampleData.building.builtYear}
                年築)
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>契約条件</Text>
              <Text style={styles.tableCell}>
                敷金 {sampleData.conditions.deposit}, 礼金{" "}
                {sampleData.conditions.keyMoney}, 更新料{" "}
                {sampleData.conditions.renewalFee}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>周辺環境</Text>
              <Text style={styles.tableCell}>
                {sampleData.nearby
                  .map((item) => `${item.name} (${item.distance})`)
                  .join(" / ")}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>その他</Text>
              <Text style={styles.tableCell}>
                {sampleData.features.join(" / ")}
              </Text>
            </View>
          </View>
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          <View style={styles.map}>
            <Text>地図</Text>
          </View>
          <View style={styles.floorPlan}>
            <Text>間取り図</Text>
          </View>
        </View>
      </View>
      {/* Additional Info */}
      <View>
        <Text style={styles.additionalInfo}>
          特記事項: {sampleData.additionalInfo.join(" / ")}
        </Text>
      </View>

      <View style={styles.sellerInfo}>
        <View style={styles.sellerInfoRow}>
          <Text style={styles.sellerInfoText}>
            会社名: {sampleData.seller.name}
          </Text>
          <Text style={styles.sellerInfoText}>
            FAX: {sampleData.seller.contact.fax}
          </Text>
          <Text style={styles.sellerInfoText}>
            免許番号: {sampleData.seller.licenseNumber}
          </Text>
          <Text style={styles.sellerInfoText}>
            住所: {sampleData.seller.contact.postalCode}
            {sampleData.seller.contact.address}
          </Text>
        </View>
        <View style={styles.sellerInfoRow}>
          <Text style={styles.sellerInfoText}>
            担当者: {sampleData.seller.contact.representative}
          </Text>
          <Text style={styles.sellerInfoText}>
            メール: {sampleData.seller.contact.email}
          </Text>
          <Text style={styles.sellerInfoText}>
            電話: {sampleData.seller.contact.phone}
          </Text>
          <Text style={styles.sellerInfoText}></Text>
        </View>
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
        overflow: "hidden",
      }}
    >
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <MyDocument />
      </PDFViewer>
    </div>
  );
}
