"use client";
import React, { useState } from "react";
import CustomRadarChart from "@/components/RadarChart";
import UserStats from "@/components/UserStats";
import MostCharacters from "@/components/MostCharacters";
import "../App.css";

// 캐릭터 이미지 import (선택창용)
import aidenMini from "../assets/icon/Aiden/Default_Mini.png";
import rioMini from "../assets/icon/Rio/Mini.png";
import theodoreMini from "../assets/icon/Theodore/Mini_Theodore_00.png";

// 캐릭터 배경 이미지 import
import aidenHalf from "../assets/icon/Aiden/Default_Half.png";
import rioHalf from "../assets/icon/Rio/Half.png";
import theodoreHalf from "../assets/icon/Theodore/Half_Theodore_00.png";

// 아시모프 테마 색상
const ASIMOV_COLORS = {
  background: "#181c20",
  card: "#23272e",
  accent: "#ff8800",
  accent2: "#00eaff",
  text: "#fff",
  subtext: "#bfc9d1",
};

// 캐릭터별 전적 데이터
const characterStats = {
  Aiden: {
    nickname: "ERMaster",
    mostCharacter: "Aiden",
    kda: 4.2,
    avgDamage: 2100,
    avgRank: 3.1,
    avgKill: 6.3,
    clutchRate: 0.25,
    stats: [
      { subject: "딜량", user: 80, avg: 60 },
      { subject: "KDA", user: 70, avg: 50 },
      { subject: "순위", user: 60, avg: 40 },
      { subject: "킬", user: 75, avg: 55 },
      { subject: "클러치", user: 65, avg: 45 },
    ],
  },
  Rio: {
    nickname: "ERMaster",
    mostCharacter: "Rio",
    kda: 3.8,
    avgDamage: 1800,
    avgRank: 3.8,
    avgKill: 5.2,
    clutchRate: 0.18,
    stats: [
      { subject: "딜량", user: 65, avg: 60 },
      { subject: "KDA", user: 65, avg: 50 },
      { subject: "순위", user: 55, avg: 40 },
      { subject: "킬", user: 60, avg: 55 },
      { subject: "클러치", user: 50, avg: 45 },
    ],
  },
  Theodore: {
    nickname: "ERMaster",
    mostCharacter: "Theodore",
    kda: 5.1,
    avgDamage: 2400,
    avgRank: 2.5,
    avgKill: 7.8,
    clutchRate: 0.32,
    stats: [
      { subject: "딜량", user: 90, avg: 60 },
      { subject: "KDA", user: 85, avg: 50 },
      { subject: "순위", user: 70, avg: 40 },
      { subject: "킬", user: 88, avg: 55 },
      { subject: "클러치", user: 80, avg: 45 },
    ],
  },
};

// 모스트 캐릭터 데이터
const mostCharacters = [
  {
    name: "Aiden",
    image: aidenMini,
    background: aidenHalf,
    winRate: 68,
    games: 45,
  },
  { name: "Rio", image: rioMini, background: rioHalf, winRate: 62, games: 32 },
  {
    name: "Theodore",
    image: theodoreMini,
    background: theodoreHalf,
    winRate: 71,
    games: 28,
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("Aiden");

  const currentStats =
    characterStats[selectedCharacter as keyof typeof characterStats];
  const [userStats, setUserStats] = useState(currentStats);
  const [statsData, setStatsData] = useState(currentStats.stats);

  // 현재 선택된 캐릭터의 배경 이미지 찾기
  const currentCharacter = mostCharacters.find(
    (char) => char.name === selectedCharacter
  );
  const backgroundImage = currentCharacter?.background;

  // 캐릭터 선택 시 전적 변경
  const handleCharacterSelect = (characterName: string) => {
    setSelectedCharacter(characterName);
    const newStats =
      characterStats[characterName as keyof typeof characterStats];
    setUserStats(newStats);
    setStatsData(newStats.stats);
  };

  // 추후 API 연동 시 setUserStats, setStatsData로 데이터 갱신
  const handleSearch = () => {
    // API 호출 로직
    console.log("Searching for:", search);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${ASIMOV_COLORS.background} 80%, ${ASIMOV_COLORS.accent2} 100%)`,
        color: ASIMOV_COLORS.text,
        fontFamily: "'Orbitron', 'Pretendard', sans-serif",
        padding: 0,
        margin: 0,
      }}
    >
      <header style={{ padding: "2rem 0 1rem 0", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            color: ASIMOV_COLORS.accent,
            letterSpacing: 2,
          }}
        >
          ASIMOV 전적 비교
        </h1>
        <p style={{ color: ASIMOV_COLORS.subtext }}>
          내 전적을 전체 평균과 비교해보세요!
        </p>
      </header>
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}>
        {/* 서치바 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <input
            type="text"
            placeholder="닉네임을 입력하세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: 400,
              padding: "1rem 1.5rem",
              borderRadius: 12,
              border: `2px solid ${ASIMOV_COLORS.accent}`,
              background: ASIMOV_COLORS.card,
              color: ASIMOV_COLORS.text,
              fontSize: 20,
              outline: "none",
              marginRight: 12,
            }}
          />
          <button
            style={{
              background: ASIMOV_COLORS.accent,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "1rem 2rem",
              fontWeight: 700,
              fontSize: 20,
              cursor: "pointer",
              boxShadow: `0 4px 12px 0 #0005`,
            }}
            onClick={handleSearch}
          >
            검색
          </button>
        </div>
        {/* 전적 카드 */}
        <section
          style={{
            background: ASIMOV_COLORS.card,
            borderRadius: 20,
            padding: 40,
            boxShadow: `0 8px 32px 0 #0007`,
            display: "flex",
            gap: 40,
            alignItems: "flex-start",
            marginBottom: 40,
            flexWrap: "wrap",
          }}
        >
          {/* 유저 정보 */}
          <div style={{ flex: 1, minWidth: 400 }}>
            {/* 모스트 캐릭터 */}
            <MostCharacters
              characters={mostCharacters}
              selectedCharacter={selectedCharacter}
              onCharacterSelect={handleCharacterSelect}
            />

            {/* 통계 정보 */}
            <UserStats data={userStats} statsData={statsData} />
          </div>
          {/* 오각형 그래프 */}
          <div style={{ flex: 2, minWidth: 450, position: "relative" }}>
            {/* 캐릭터 배경 이미지 */}
            {backgroundImage && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "540px",
                  height: "540px",
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  zIndex: 0,
                  opacity: 0.12,
                  borderRadius: "20px",
                  mask: "radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
                  WebkitMask:
                    "radial-gradient(circle at center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)",
                }}
              />
            )}

            {/* 추가 그라데이션 오버레이 */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                height: "100%",
                background: `radial-gradient(circle at center, transparent 0%, ${ASIMOV_COLORS.card}20 70%, ${ASIMOV_COLORS.card}40 100%)`,
                zIndex: 0,
                pointerEvents: "none",
              }}
            />

            {/* 닉네임을 그래프 위로 이동 */}
            <h2
              style={{
                color: ASIMOV_COLORS.accent2,
                fontSize: 28,
                marginBottom: 20,
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              {userStats.nickname}
            </h2>
            <div style={{ position: "relative", zIndex: 1 }}>
              <CustomRadarChart data={statsData} height={400} />
            </div>
          </div>
        </section>
        {/* 전적 리스트 (추후 확장) */}
        <section>
          <h3 style={{ color: ASIMOV_COLORS.accent, marginBottom: 16 }}>
            최근 전적
          </h3>
          <div style={{ color: ASIMOV_COLORS.subtext }}>
            아직 데이터가 없습니다.
          </div>
        </section>
      </main>
    </div>
  );
}
