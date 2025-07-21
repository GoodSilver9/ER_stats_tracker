"use client";
import React, { useState } from "react";
import CustomRadarChart from "@/components/RadarChart";
import UserStats from "@/components/UserStats";
import MostCharacters from "@/components/MostCharacters";
import ProfileCard from "@/components/ProfileCard";
import Image, { type StaticImageData } from "next/image";

// 캐릭터 이미지 import (선택창용)
import aidenMini from "../../assets/icon/Character/Aiden/Default_Mini.png";
import rioMini from "../../assets/icon/Character/Rio/Mini.png";
import theodoreMini from "../../assets/icon/Character/Theodore/Mini_Theodore_00.png";
import hyunwooMini from "../../assets/icon/Character/Hyunwoo/Mini.png";
import zahirMini from "../../assets/icon/Character/Zahir/mini.png";
import nataponMini from "../../assets/icon/Character/Natapon/Default_Mini.png";
import fioraMini from "../../assets/icon/Character/Fiora/Mini.png";
import jackieMini from "../../assets/icon/Character/Jackie/Mini.png";

// 캐릭터 배경 이미지 import
import aidenHalf from "../../assets/icon/Character/Aiden/Default_Half.png";
import rioHalf from "../../assets/icon/Character/Rio/Half.png";
import theodoreHalf from "../../assets/icon/Character/Theodore/Half_Theodore_00.png";
import hyunwooHalf from "../../assets/icon/Character/Hyunwoo/Mini.png";
import zahirHalf from "../../assets/icon/Character/Zahir/mini.png";
import nataponHalf from "../../assets/icon/Character/Natapon/Default_Mini.png";
import fioraHalf from "../../assets/icon/Character/Fiora/Mini.png";
import jackieHalf from "../../assets/icon/Character/Jackie/Mini.png";

// 티어 이미지 import
import ironTier from "../../assets/icon/Rank Tier/01. Iron.png";
import bronzeTier from "../../assets/icon/Rank Tier/02. Bronze.png";
import silverTier from "../../assets/icon/Rank Tier/03. Silver.png";
import goldTier from "../../assets/icon/Rank Tier/04. Gold.png";
import platinumTier from "../../assets/icon/Rank Tier/05. Platinum.png";
import diamondTier from "../../assets/icon/Rank Tier/06. Diamond.png";
import meteoriteTier from "../../assets/icon/Rank Tier/07. Meteorite.png";
import mithrilTier from "../../assets/icon/Rank Tier/08. Mithril.png";
import titanTier from "../../assets/icon/Rank Tier/09. Titan.png";
import immortalTier from "../../assets/icon/Rank Tier/10. Immortal.png";

// 아시모프 테마 색상
const ASIMOV_COLORS = {
  background: "#181c20",
  card: "#23272e",
  accent: "#ff8800",
  accent2: "#00eaff",
  text: "#fff",
  subtext: "#bfc9d1",
};

// 티어별 평균 데이터
const tierAverages = {
  아이언: {
    avgDamage: 1000,
    avgKDA: 1.8,
    avgRank: 5.8,
    avgKill: 3.2,
    avgClutchRate: 0.08,
    image: ironTier,
  },
  브론즈: {
    avgDamage: 1200,
    avgKDA: 2.1,
    avgRank: 5.2,
    avgKill: 3.8,
    avgClutchRate: 0.12,
    image: bronzeTier,
  },
  실버: {
    avgDamage: 1500,
    avgKDA: 2.8,
    avgRank: 4.5,
    avgKill: 4.5,
    avgClutchRate: 0.15,
    image: silverTier,
  },
  골드: {
    avgDamage: 1800,
    avgKDA: 3.2,
    avgRank: 3.8,
    avgKill: 5.2,
    avgClutchRate: 0.18,
    image: goldTier,
  },
  플래티넘: {
    avgDamage: 2100,
    avgKDA: 3.8,
    avgRank: 3.2,
    avgKill: 6.0,
    avgClutchRate: 0.22,
    image: platinumTier,
  },
  다이아: {
    avgDamage: 2400,
    avgKDA: 4.5,
    avgRank: 2.8,
    avgKill: 7.2,
    avgClutchRate: 0.28,
    image: diamondTier,
  },
  메테오라이트: {
    avgDamage: 2700,
    avgKDA: 5.2,
    avgRank: 2.3,
    avgKill: 8.5,
    avgClutchRate: 0.35,
    image: meteoriteTier,
  },
  미스릴: {
    avgDamage: 3000,
    avgKDA: 5.8,
    avgRank: 2.0,
    avgKill: 9.2,
    avgClutchRate: 0.42,
    image: mithrilTier,
  },
  데미갓: {
    avgDamage: 3300,
    avgKDA: 6.5,
    avgRank: 1.8,
    avgKill: 10.0,
    avgClutchRate: 0.48,
    image: titanTier,
  },
  이터니티: {
    avgDamage: 3600,
    avgKDA: 7.2,
    avgRank: 1.5,
    avgKill: 11.0,
    avgClutchRate: 0.55,
    image: immortalTier,
  },
};

// 캐릭터별 전적 데이터
const characterStats = {
  에이든: {
    nickname: "ERMaster",
    mostCharacter: "에이든",
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
  리오: {
    nickname: "ERMaster",
    mostCharacter: "리오",
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
  테오도르: {
    nickname: "ERMaster",
    mostCharacter: "테오도르",
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
  현우: {
    nickname: "ERMaster",
    mostCharacter: "현우",
    kda: 3.5,
    avgDamage: 1950,
    avgRank: 4.1,
    avgKill: 5.8,
    clutchRate: 0.21,
    stats: [
      { subject: "딜량", user: 72, avg: 60 },
      { subject: "KDA", user: 58, avg: 50 },
      { subject: "순위", user: 48, avg: 40 },
      { subject: "킬", user: 68, avg: 55 },
      { subject: "클러치", user: 58, avg: 45 },
    ],
  },
  자히르: {
    nickname: "ERMaster",
    mostCharacter: "자히르",
    kda: 4.6,
    avgDamage: 2250,
    avgRank: 2.9,
    avgKill: 7.2,
    clutchRate: 0.28,
    stats: [
      { subject: "딜량", user: 85, avg: 60 },
      { subject: "KDA", user: 78, avg: 50 },
      { subject: "순위", user: 65, avg: 40 },
      { subject: "킬", user: 82, avg: 55 },
      { subject: "클러치", user: 72, avg: 45 },
    ],
  },
  나타폰: {
    nickname: "ERMaster",
    mostCharacter: "나타폰",
    kda: 5.3,
    avgDamage: 2450,
    avgRank: 2.3,
    avgKill: 8.1,
    clutchRate: 0.35,
    stats: [
      { subject: "딜량", user: 92, avg: 60 },
      { subject: "KDA", user: 88, avg: 50 },
      { subject: "순위", user: 75, avg: 40 },
      { subject: "킬", user: 91, avg: 55 },
      { subject: "클러치", user: 85, avg: 45 },
    ],
  },
  피오라: {
    nickname: "ERMaster",
    mostCharacter: "피오라",
    kda: 4.1,
    avgDamage: 2050,
    avgRank: 3.3,
    avgKill: 6.7,
    clutchRate: 0.24,
    stats: [
      { subject: "딜량", user: 78, avg: 60 },
      { subject: "KDA", user: 69, avg: 50 },
      { subject: "순위", user: 58, avg: 40 },
      { subject: "킬", user: 76, avg: 55 },
      { subject: "클러치", user: 64, avg: 45 },
    ],
  },
  재키: {
    nickname: "ERMaster",
    mostCharacter: "재키",
    kda: 3.9,
    avgDamage: 1920,
    avgRank: 3.6,
    avgKill: 5.9,
    clutchRate: 0.19,
    stats: [
      { subject: "딜량", user: 69, avg: 60 },
      { subject: "KDA", user: 66, avg: 50 },
      { subject: "순위", user: 52, avg: 40 },
      { subject: "킬", user: 71, avg: 55 },
      { subject: "클러치", user: 55, avg: 45 },
    ],
  },
};

// 모스트 캐릭터 데이터
const mostCharacters = [
  {
    name: "에이든",
    image: aidenMini,
    background: aidenHalf,
    winRate: 68,
    games: 45,
  },
  { name: "리오", image: rioMini, background: rioHalf, winRate: 62, games: 32 },
  {
    name: "테오도르",
    image: theodoreMini,
    background: theodoreHalf,
    winRate: 71,
    games: 28,
  },
  {
    name: "현우",
    image: hyunwooMini,
    background: hyunwooHalf,
    winRate: 58,
    games: 24,
  },
  {
    name: "자히르",
    image: zahirMini,
    background: zahirHalf,
    winRate: 65,
    games: 19,
  },
  {
    name: "나타폰",
    image: nataponMini,
    background: nataponHalf,
    winRate: 72,
    games: 15,
  },
  {
    name: "피오라",
    image: fioraMini,
    background: fioraHalf,
    winRate: 69,
    games: 22,
  },
  {
    name: "재키",
    image: jackieMini,
    background: jackieHalf,
    winRate: 63,
    games: 18,
  },
];

// 계정 프로필 데이터 (캐릭터와 관계없이 고정)
const accountProfile = {
  tier: "미스릴",
  tierImage: mithrilTier,
  totalRP: 8400,
  tierRP: 1300,
  ranking: 1222,
  percentage: 0.52,
  asiaRanking: 1175,
  asiaPercentage: 0.52,
  winRate: 67,
  totalGames: 479,
  avgTK: 0.7,
  avgRank: 2.8,
  avgKill: 6.5,
  avgAssist: 4.2,
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("에이든");
  const [selectedTier, setSelectedTier] = useState("다이아");
  const [showTierDropdown, setShowTierDropdown] = useState(false);

  const currentStats =
    characterStats[selectedCharacter as keyof typeof characterStats];
  // 계정 프로필은 캐릭터와 관계없이 고정
  const [userStats, setUserStats] = useState(currentStats);

  // 선택된 티어의 평균값 가져오기
  const currentTierAvg =
    tierAverages[selectedTier as keyof typeof tierAverages];

  // 티어별 평균값으로 그래프 데이터 업데이트
  const getStatsData = () => {
    const baseStats = currentStats.stats;
    return [
      {
        subject: "딜량",
        user: baseStats[0].user,
        avg: Math.round((currentTierAvg.avgDamage / 3000) * 100),
      },
      {
        subject: "KDA",
        user: baseStats[1].user,
        avg: Math.round((currentTierAvg.avgKDA / 6) * 100),
      },
      {
        subject: "순위",
        user: baseStats[2].user,
        avg: Math.round(((6 - currentTierAvg.avgRank) / 5) * 100),
      },
      {
        subject: "킬",
        user: baseStats[3].user,
        avg: Math.round((currentTierAvg.avgKill / 10) * 100),
      },
      {
        subject: "클러치",
        user: baseStats[4].user,
        avg: Math.round((currentTierAvg.avgClutchRate / 0.4) * 100),
      },
    ];
  };

  const [statsData, setStatsData] = useState(getStatsData());

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
    setStatsData(getStatsData());
  };

  // 티어 선택 시 평균값 변경
  const handleTierSelect = (tier: string) => {
    setSelectedTier(tier);
    setStatsData(getStatsData());
    setShowTierDropdown(false);
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
        fontFamily: "'Inter', 'Pretendard', sans-serif",
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
          SM 전적 비교
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
            display: "flex",
            gap: 32,
            alignItems: "flex-start",
            marginBottom: 40,
            flexWrap: "wrap",
          }}
        >
          {/* 프로필 카드 */}
          <div style={{ flex: "0 0 auto" }}>
            <ProfileCard
              nickname={userStats.nickname}
              tier={accountProfile.tier}
              tierImage={accountProfile.tierImage}
              totalRP={accountProfile.totalRP}
              tierRP={accountProfile.tierRP}
              ranking={accountProfile.ranking}
              percentage={accountProfile.percentage}
              asiaRanking={accountProfile.asiaRanking}
              asiaPercentage={accountProfile.asiaPercentage}
              winRate={accountProfile.winRate}
              totalGames={accountProfile.totalGames}
              avgTK={accountProfile.avgTK}
              avgRank={accountProfile.avgRank}
              avgKill={accountProfile.avgKill}
              avgAssist={accountProfile.avgAssist}
            />
          </div>

          {/* 중앙 통계 카드 */}
          <div
            style={{
              flex: 1,
              minWidth: 320,
              background: ASIMOV_COLORS.card,
              borderRadius: 20,
              padding: 32,
              boxShadow: `0 8px 32px 0 #0007`,
              height: 380,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* 통계 정보 */}
            <UserStats
              data={userStats}
              statsData={statsData}
              tierAvg={currentTierAvg}
            />
          </div>

          {/* 오른쪽 영역 */}
          <div
            style={{
              flex: 1.5,
              minWidth: 400,
              display: "grid",
              gridTemplateRows: "380px 1fr",
              gap: 20,
            }}
          >
            {/* 오각형 그래프 */}
            <div
              style={{
                position: "relative",
                background: ASIMOV_COLORS.card,
                borderRadius: 20,
                padding: 24,
                boxShadow: `0 8px 32px 0 #0007`,
                height: 380,
              }}
            >
              {/* 티어 선택 드롭다운 */}
              <div
                style={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}
              >
                <button
                  onClick={() => setShowTierDropdown(!showTierDropdown)}
                  style={{
                    background: ASIMOV_COLORS.card,
                    border: `2px solid ${ASIMOV_COLORS.accent}`,
                    borderRadius: 12,
                    padding: "0.5rem 0.8rem",
                    color: ASIMOV_COLORS.text,
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    minWidth: 120,
                  }}
                >
                  <Image
                    src={
                      tierAverages[selectedTier as keyof typeof tierAverages]
                        .image as StaticImageData
                    }
                    alt={selectedTier}
                    width={24}
                    height={24}
                    style={{
                      objectFit: "contain",
                    }}
                  />
                  {selectedTier}
                  <span style={{ fontSize: 12 }}>▼</span>
                </button>

                {showTierDropdown && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      right: 0,
                      background: ASIMOV_COLORS.card,
                      border: `2px solid ${ASIMOV_COLORS.accent}`,
                      borderRadius: 12,
                      padding: "0.5rem 0",
                      marginTop: 4,
                      zIndex: 1000,
                      minWidth: 140,
                      maxHeight: 300,
                      overflowY: "auto",
                      scrollbarWidth: "none", // Firefox
                      msOverflowStyle: "none", // IE/Edge
                    }}
                    className="custom-scrollbar"
                  >
                    {Object.keys(tierAverages).map((tier) => (
                      <div
                        key={tier}
                        onClick={() => handleTierSelect(tier)}
                        style={{
                          padding: "0.5rem 1rem",
                          cursor: "pointer",
                          color:
                            tier === selectedTier
                              ? ASIMOV_COLORS.accent
                              : ASIMOV_COLORS.text,
                          backgroundColor:
                            tier === selectedTier
                              ? `${ASIMOV_COLORS.accent}20`
                              : "transparent",
                          fontSize: 14,
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          if (tier !== selectedTier) {
                            e.currentTarget.style.backgroundColor = `${ASIMOV_COLORS.accent}10`;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (tier !== selectedTier) {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }
                        }}
                      >
                        <Image
                          src={
                            tierAverages[tier as keyof typeof tierAverages]
                              .image as StaticImageData
                          }
                          alt={tier}
                          width={20}
                          height={20}
                          style={{
                            objectFit: "contain",
                          }}
                        />
                        {tier}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 캐릭터 배경 이미지 */}
              {backgroundImage && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "360px",
                    height: "360px",
                    backgroundImage: `url(${
                      backgroundImage.src || backgroundImage
                    })`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    zIndex: 0,
                    opacity: 0.12,
                    borderRadius: "18px",
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

              <div style={{ position: "relative", zIndex: 1 }}>
                <CustomRadarChart data={statsData} height={320} />
              </div>
            </div>

            {/* 모스트 캐릭터 */}
            <div
              style={{
                background: ASIMOV_COLORS.card,
                borderRadius: 20,
                padding: 20,
                boxShadow: `0 8px 32px 0 #0007`,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <MostCharacters
                characters={mostCharacters}
                selectedCharacter={selectedCharacter}
                onCharacterSelect={handleCharacterSelect}
              />
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
